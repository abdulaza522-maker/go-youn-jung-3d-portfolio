'use client';
// @ts-nocheck
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Image as R3FImage, Environment, Sparkles } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

const DEFAULT_IMAGES = [
  'images/img1.jpg',
  'images/img2.jpg',
  'images/img3.jpg',
  'images/img4.jpg',
  'images/img5.jpg',
  'images/img6.jpg',
  'images/img7.jpg',
];

function GalleryCards({ images }) {
  const root = useRef(null);
  useFrame((state, delta) => {
    if (root.current) {
      root.current.rotation.y += delta * 0.075;
      root.current.rotation.x += (state.pointer.y * 0.08 - root.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={root}>
      {images.map((src, i) => {
        const angle = (i / images.length) * Math.PI * 2;
        const x = Math.sin(angle) * 3.25;
        const z = Math.cos(angle) * 3.25;
        return (
          <Float key={src} speed={1.2 + i * 0.08} rotationIntensity={0.08} floatIntensity={0.25}>
            <group position={[x, Math.sin(i * 4) * 0.35, z]} rotation={[0, angle, 0]}>
              <mesh position={[0, 0, -0.065]}>
                <boxGeometry args={[1.68, 2.15, 0.1]} />
                <meshStandardMaterial color="#d1a6a6" metalness={0.3} roughness={0.38} />
              </mesh>
              <R3FImage url={src} scale={[1.55, 2.02]} position={[0, 0, 0.01]} transparent toneMapped={false} />
            </group>
          </Float>
        );
      })}
    </group>
  );
}

export default function Scene3D({ images = DEFAULT_IMAGES }) {
  return (
    <Canvas camera={{ position: [0, 0, 7.3], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.4} />
      <pointLight position={[3, 4, 6]} intensity={35} color="#ffd6e5" />
      <pointLight position={[-5, -2, -4]} intensity={18} color="#c8b2ff" />
      <Suspense fallback={null}>
        <GalleryCards images={images} />
        <Sparkles count={70} scale={10} size={2} speed={0.25} opacity={0.5} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
