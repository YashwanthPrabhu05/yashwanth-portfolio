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
import { generateCardTexture } from "../../utils/generateCardTexture";
import { generateStringTexture } from "../../utils/generateStringTexture";

extend({ MeshLineGeometry, MeshLineMaterial });

const segmentProps = {
  type: "dynamic",
  canSleep: true,
  colliders: false,
  angularDamping: 4,
  linearDamping: 4,
};

export default function Band({
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
  const { pointer, camera } = useThree();

  const { nodes, materials } = useGLTF(cardModel);

  const cardImageUrl = useMemo(
    () =>
      cardImage ||
      generateCardTexture({
        firstName: "Yashwanth",
        lastName: "Prabhu",
        title: "UIUX DESIGNER",
        date: "AUG 16 2025",
        bgColor: "#0d0d0d",
      }),
    [cardImage]
  );

  const cardTexture = useTexture(cardImageUrl);
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

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.85]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.85]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.85]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

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
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      if (j3.current && j2.current?.lerped && j1.current?.lerped) {
        curve.points[0].copy(j3.current.translation());
        curve.points[1].copy(j2.current.lerped);
        curve.points[2].copy(j1.current.lerped);
        curve.points[3].copy(fixed.current.translation());
        if (band.current) {
          band.current.geometry.setPoints(curve.getPoints(32));
        }
      }

      if (card.current && !dragged) {
        const angVal = card.current.angvel();
        const rotVal = card.current.rotation();
        card.current.setAngvel({
          x: angVal.x,
          y: angVal.y - rotVal.y * 0.25,
          z: angVal.z,
        });
      }
    }
  });

  return (
    <>
      <group position={[cardX, 3.8, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        <RigidBody ref={j1} {...segmentProps} position={[cardX * 0.25, cardY * 0.25, 0]}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j2} {...segmentProps} position={[cardX * 0.5, cardY * 0.5, 0]}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j3} {...segmentProps} position={[cardX * 0.75, cardY * 0.75, 0]}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
          position={[cardX * 1.0, cardY * 1.0, 0]}
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
          repeat={stringTexture ? [-17 / stringAspectRatio, 1] : undefined}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

useGLTF.preload("/models/card.glb");
