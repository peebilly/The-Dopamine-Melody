import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera, useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

const BrainModel = () => {
  // Load the GLB model from the public/models directory
  const { scene } = useGLTF('/models/brain.glb');
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Add some gentle rotation
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
      scale={0.6} 
      rotation={[0, 0, 0]} // Reset rotation
    />
  );
};

// Preload the model
useGLTF.preload('/models/brain.glb');

const Brain3D = () => {
  return (
    <div className="w-full h-[250px] md:h-[350px] lg:h-[450px] cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        
        <Suspense fallback={<mesh><sphereGeometry args={[0.5, 32, 32]} /><meshStandardMaterial color="#EAB308" wireframe /></mesh>}>
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <Center>
              <BrainModel />
            </Center>
          </Float>
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default Brain3D;
