'use client';
// @ts-nocheck
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const IMAGES = [
  'images/img1.jpg',
  'images/img2.jpg',
  'images/img3.jpg',
  'images/img4.jpg',
  'images/img5.jpg',
  'images/img6.jpg',
  'images/img7.jpg',
];

export default function Scene3D({ images = IMAGES }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const p1 = new THREE.PointLight(0xffd6e5, 35, 100);
    p1.position.set(3, 4, 6);
    scene.add(p1);
    const p2 = new THREE.PointLight(0xc8b2ff, 18, 100);
    p2.position.set(-5, -2, -4);
    scene.add(p2);

    // Rotating carousel of photo cards
    const group = new THREE.Group();
    scene.add(group);

    const loader = new THREE.TextureLoader();
    const radius = 3.25;
    images.forEach((src, i) => {
      const angle = (i / images.length) * Math.PI * 2;
      const card = new THREE.Group();
      card.position.set(Math.sin(angle) * radius, Math.sin(i * 4) * 0.35, Math.cos(angle) * radius);
      card.rotation.y = angle;

      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(1.68, 2.15, 0.1),
        new THREE.MeshStandardMaterial({ color: 0xd1a6a6, metalness: 0.3, roughness: 0.38 })
      );
      frame.position.z = -0.065;
      card.add(frame);

      const mat = new THREE.MeshBasicMaterial({ transparent: true });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.55, 2.02), mat);
      plane.position.z = 0.01;
      card.add(plane);

      loader.load(src, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        mat.map = tex;
        mat.needsUpdate = true;
      });

      group.add(card);
    });

    // Sparkles
    const count = 70;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i++) positions[i] = (Math.random() - 0.5) * 10;
    const sparkleGeo = new THREE.BufferGeometry();
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    scene.add(
      new THREE.Points(
        sparkleGeo,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.5 })
      )
    );

    // Interaction
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointerMove);

    // Animation loop
    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      const delta = clock.getDelta();
      group.rotation.y += delta * 0.075;
      group.rotation.x += (pointer.y * 0.08 - group.rotation.x) * 0.04;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [images]);

  return <div ref={mountRef} className="w-full h-full" />;
}
