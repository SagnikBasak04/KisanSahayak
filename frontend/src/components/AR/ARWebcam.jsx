import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const ARObject = ({ position, rotation }) => {
  const meshRef = useRef();

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={[3, 3, 3]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color="yellow"
        transparent={true}
        opacity={0}
        roughness={0.1}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0}
      />
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(2, 2, 2)]} />
        <lineBasicMaterial attach="material" color="yellow" />
      </lineSegments>
    </mesh>
  );
};

export const FrontViewOverlay = () => {
  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <ARObject position={[0, 0, -5]} rotation={[0, 0, 0]} />
      <OrbitControls />

      <Html position={[0, -2.35, 0]} center>
        <div className="w-[250px] text-white text-center text-lg">
          <h1>Click image from the Front</h1>
        </div>
      </Html>
    </Canvas>
  );
};

export const DiagonalViewOverlay = () => {
  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <ARObject position={[0, 0, -5]} rotation={[0.5, 0.5, 0]} />
      <OrbitControls />

      <Html position={[0, -3.1, 0]} center>
        <div className="w-[250px] text-white text-center text-lg">
          <h1>Click image from the Side</h1>
        </div>
      </Html>
    </Canvas>
  );
};

export const TopViewOverlay = () => {
  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <ARObject position={[0, 0, -5]} rotation={[0, 0, 0]} />

      <OrbitControls
        enableZoom={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />

      <perspectiveCamera
        makeDefault
        position={[0, 5, 5]}
        rotation={[-Math.PI / 4, 0, 0]}
      />

      <Html position={[0, -2.3, 0]} center>
        <div className="w-[250px] text-white text-center text-lg">
          <h1>Click image from the Top</h1>
        </div>
      </Html>
    </Canvas>
  )
};