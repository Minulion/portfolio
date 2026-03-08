"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Mesh, Points } from "three";

function FloatingPoints() {
  const pointsRef = useRef<Points>(null);
  const points = useMemo(() => {
    const count = 1000;
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 12;
      data[i * 3 + 1] = (Math.random() - 0.5) * 7;
      data[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    return data;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.035;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.06;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8fd3ff" size={0.028} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

function AmbientOrb() {
  const orbRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!orbRef.current) {
      return;
    }

    orbRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.14;
    orbRef.current.rotation.y = state.clock.elapsedTime * 0.22;
  });

  return (
    <mesh ref={orbRef} position={[0, 0.15, -0.8]}>
      <icosahedronGeometry args={[1.35, 4]} />
      <meshStandardMaterial
        color="#f5d89f"
        emissive="#4c6b9a"
        emissiveIntensity={0.4}
        roughness={0.3}
        metalness={0.4}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[2, 3, 4]} intensity={1.6} />
      <FloatingPoints />
      <AmbientOrb />
    </Canvas>
  );
}
