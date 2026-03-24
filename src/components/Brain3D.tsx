import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera, Center, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const GlowingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Add some gentle rotation and pulsing
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Sphere args={[1.5, 64, 64]} ref={meshRef}>
      <MeshDistortMaterial
        color="#EAB308"
        speed={2}
        distort={0.4}
        radius={1}
        emissive="#F97316"
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const Brain3D = () => {
  return (
    <div className="w-full h-[250px] md:h-[350px] lg:h-[450px] cursor-grab active:cursor-grabbing">
        <Canvas 
          shadows 
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            gl.shadowMap.type = THREE.PCFShadowMap;
          }}
        >
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#EAB308" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
          <Center>
            <GlowingSphere />
          </Center>
        </Float>

        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={1}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default Brain3D;
