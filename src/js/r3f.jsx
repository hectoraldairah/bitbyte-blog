import React, { useRef } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingBox() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"tomato"} />
    </mesh>
  );
}

function Scene() {
  return (
    <Canvas
      camera={{ position: [3, 2, 5], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <RotatingBox />
    </Canvas>
  );
}

const container = document.getElementById("react-root");
if (container) {
  const root = createRoot(container);
  root.render(<Scene />);
}
