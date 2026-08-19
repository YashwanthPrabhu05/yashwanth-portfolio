import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import * as THREE from "three";
import Band from "./Band";
import "./lanyard.css";

export default function Lanyard({
  cardModel = "/models/card.glb",
  cardImage,
  stringImageSrc,
  cardColor = "#1a1a1a",
  stringColor = "#000000",
  clipColor = "#667073",
  gravity = 40,
  cameraDistance = 10.5,
  fov = 20,
  interactive = true,
  lightingIntensity = 50,
  cardStartPosition = [0, 0],
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const lightScale = 1 + (lightingIntensity - 50) / 50;

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="lanyard-container">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Canvas
          camera={{
            position: new THREE.Vector3(0, 0, cameraDistance),
            fov,
          }}
          gl={{ alpha: true }}
          onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0), 0)}
        >
          <ambientLight intensity={Math.PI * lightScale} />

          <Physics gravity={[0, -gravity, 0]} timeStep={1 / 60}>
            <Suspense fallback={null}>
              <Band
                cardModel={cardModel}
                cardImage={cardImage}
                stringImageSrc={stringImageSrc}
                cardColor={cardColor}
                stringColor={stringColor}
                clipColor={clipColor}
                interactive={interactive}
                width={dimensions.width}
                height={dimensions.height}
                cardStartPosition={cardStartPosition}
              />
            </Suspense>
          </Physics>

          <Environment blur={0.75}>
            <Lightformer
              intensity={2 * lightScale}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3 * lightScale}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3 * lightScale}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10 * lightScale}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      )}
    </div>
  );
}
