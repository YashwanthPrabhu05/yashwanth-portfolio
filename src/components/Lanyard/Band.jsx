import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, extend, useThree } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import {
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  BallCollider,
  CuboidCollider,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { generateCardTextureAsync } from "../../utils/generateCardTexture";

// Suspense cache for the card face. Band already suspends on its GLTF, so
// suspending here too means the card only ever appears fully textured — no
// blank-white frame while a swapped-in texture decodes.
let cardUrlValue = null;
let cardUrlPromise = null;
function readCardUrl() {
  if (cardUrlValue) return cardUrlValue;
  if (!cardUrlPromise) {
    cardUrlPromise = generateCardTextureAsync({
      firstName: "Yashwanth",
      lastName: "Prabhu",
      title: "UIUX DESIGNER",
      date: "AUG 16 2025",
      bgColor: "#0d0d0d",
    }).then((url) => {
      cardUrlValue = url;
      return url;
    });
  }
  throw cardUrlPromise;
}
import { generateStringTexture } from "../../utils/generateStringTexture";

extend({ MeshLineGeometry, MeshLineMaterial });

const ROPE_SEGMENT = 0.85;
const CARD_JOINT_OFFSET = 1.7;

// Entrance: the chain spawns taut and horizontal, straight out to the right of
// the anchor — the 3 o'clock position — so releasing the physics swings the card
// down like a clock hand and lets it oscillate into place.
const dropAt = (distance) => [distance, 0, 0];

const segmentProps = {
  type: "dynamic",
  canSleep: true,
  colliders: false,
  // Angular damping stays high so the card doesn't tumble and show its blank
  // back face; the lower linear damping keeps the swing lively.
  angularDamping: 5,
  linearDamping: 2,
};

export default function Band({
  onReady,
  maxSpeed = 50,
  minSpeed = 0,
  cardModel = "/models/card.glb",
  cardImage,
  stringImageSrc,
  cardColor = "#1a1a1a",
  clipColor = "#667073",
  stringColor = "#ffffff",
  width = 1000,
  height = 1000,
  cardStartPosition = [5, 0],
}) {
  const cardX = cardStartPosition[0];
  const cardY = cardStartPosition[1];

  const fixed = useRef(null);
  const j1 = useRef(null);
  const j2 = useRef(null);
  const j3 = useRef(null);
  const card = useRef(null);
  const band = useRef(null);

  const [dragged, setDragged] = useState(false);
  const [stringTexture, setStringTexture] = useState(null);
  const [isStringTextureLoaded, setIsStringTextureLoaded] = useState(false);
  const [stringAspectRatio, setStringAspectRatio] = useState(1);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const clipWorldPos = useMemo(() => new THREE.Vector3(), []);
  const cardQuat = useMemo(() => new THREE.Quaternion(), []);
  const { pointer, camera } = useThree();

  const { nodes, materials } = useGLTF(cardModel);

  const cardTexture = useTexture(cardImage || readCardUrl());
  cardTexture.flipY = false;
  cardTexture.needsUpdate = true;

  useEffect(() => {
    let mounted = true;
    const stringSrc = stringImageSrc || generateStringTexture();
    setIsStringTextureLoaded(false);

    const loader = new THREE.TextureLoader();
    loader.load(
      stringSrc,
      (texture) => {
        if (!mounted) return;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 16;
        if (texture.image && texture.image.width && texture.image.height) {
          setStringAspectRatio(texture.image.width / texture.image.height);
        }
        setStringTexture(texture);
        setIsStringTextureLoaded(true);
      },
      undefined,
      (error) => {
        console.warn("Failed to load string texture URL, falling back to local canvas:", error);
      }
    );

    return () => {
      mounted = false;
    };
  }, [stringImageSrc]);

  // Band only mounts once its model and textures have resolved, so this is the
  // point where the card can actually be seen — release the drop just after the
  // first painted frame.
  useEffect(() => {
    const id = setTimeout(() => onReady?.(), 120);
    return () => clearTimeout(id);
  }, [onReady]);

  const curve = useMemo(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = "chordal";
    return c;
  }, []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], ROPE_SEGMENT]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], ROPE_SEGMENT]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], ROPE_SEGMENT]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, CARD_JOINT_OFFSET, 0]]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(pointer.x, pointer.y, 0.5).unproject(camera);
      dir.copy(vec).sub(camera.position).normalize();
      vec.add(dir.multiplyScalar(camera.position.length()));

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current) return;
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        // Clamping matters: an unclamped alpha overshoots on slow frames and the
        // rope diverges into NaN, which makes the card vanish.
        const alpha = Math.min(
          1,
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
        ref.current.lerped.lerp(ref.current.translation(), alpha);
      });

      if (j3.current && j2.current?.lerped && j1.current?.lerped && card.current) {
        const cardTrans = card.current.translation();
        const cardRot = card.current.rotation();
        cardQuat.set(cardRot.x, cardRot.y, cardRot.z, cardRot.w);
        clipWorldPos.set(0, 1.70, 0).applyQuaternion(cardQuat).add(cardTrans);

        curve.points[0].copy(clipWorldPos);
        curve.points[1].copy(j2.current.lerped);
        curve.points[2].copy(j1.current.lerped);
        curve.points[3].copy(fixed.current.translation());
        if (band.current && curve.points.every((p) => Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.z))) {
          band.current.geometry.setPoints(curve.getPoints(32));
        }
      }

      if (card.current && !dragged) {
        const angVal = card.current.angvel();
        const rotVal = card.current.rotation();
        card.current.setAngvel({
          x: angVal.x,
          // Restoring term that turns the card back to face the viewer. Too weak
          // and it settles stuck at an angle, showing the card edge-on.
          y: angVal.y - rotVal.y * 1.8,
          z: angVal.z,
        });
      }
    }
  });

  return (
    <>
      <group position={[cardX, 3.8 + cardY, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        <RigidBody ref={j1} {...segmentProps} position={dropAt(ROPE_SEGMENT)}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j2} {...segmentProps} position={dropAt(ROPE_SEGMENT * 2)}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j3} {...segmentProps} position={dropAt(ROPE_SEGMENT * 3)}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
          position={dropAt(ROPE_SEGMENT * 3 + CARD_JOINT_OFFSET)}
          colliders={false}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.4}
            position={[0, -1.2, -0.05]}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
              if (card.current) {
                setDragged(
                  new THREE.Vector3()
                    .copy(e.point)
                    .sub(vec.copy(card.current.translation()))
                );
              }
              e.stopPropagation();
            }}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              setDragged(false);
              e.stopPropagation();
            }}
            onPointerOver={() => (document.body.style.cursor = "grab")}
            onPointerOut={() => (document.body.style.cursor = "auto")}
          >
            {nodes.card && (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  color={new THREE.Color("#ffffff")}
                  map={cardTexture}
                  clearcoat={1}
                  clearcoatRoughness={0.1}
                  roughness={0.2}
                  metalness={0.05}
                />
              </mesh>
            )}
            {nodes.clip && (
              <mesh geometry={nodes.clip.geometry} material={materials.metal}>
                <meshPhysicalMaterial
                  color={new THREE.Color("#3a3a3a")}
                  roughness={0.2}
                  metalness={0.9}
                />
              </mesh>
            )}
            {nodes.clamp && (
              <mesh geometry={nodes.clamp.geometry} material={materials.metal}>
                <meshPhysicalMaterial
                  color={new THREE.Color("#3a3a3a")}
                  roughness={0.2}
                  metalness={0.9}
                />
              </mesh>
            )}
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color={new THREE.Color(stringTexture ? "#FFFFFF" : stringColor)}
          depthTest={false}
          resolution={[width, height]}
          useMap={!!stringTexture && isStringTextureLoaded}
          map={stringTexture}
          repeat={stringTexture ? [2, 1] : undefined}
          lineWidth={0.85}
        />
      </mesh>
    </>
  );
}

useGLTF.preload("/models/card.glb");
