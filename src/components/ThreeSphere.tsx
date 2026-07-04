import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NeuralNetwork: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const satellite1Ref = useRef<THREE.Mesh>(null);
  const satellite2Ref = useRef<THREE.Mesh>(null);
  const satellite3Ref = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);

  // Generate organic floating particle data
  const particles = useMemo(() => {
    const count = 600;
    const radius = 1.6;
    const tempPoints = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      // Dynamic organic radius to look like a digital aura
      const r = radius * (0.85 + Math.random() * 0.3);
      tempPoints[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      tempPoints[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      tempPoints[i * 3 + 2] = r * Math.cos(phi);
    }
    return tempPoints;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // 1. Group Rotation & Mouse Parallax
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08;
      groupRef.current.rotation.z = Math.sin(time * 0.05) * 0.05;
      
      // Mouse tracking parallax
      const targetX = state.pointer.x * 0.4;
      const targetY = state.pointer.y * 0.4;
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    }

    // 2. Pulse the Compute Core
    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(time * 4) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
      coreRef.current.rotation.y = -time * 0.2;
      
      const mat = coreRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (hovered ? 0.35 : 0.22) + Math.sin(time * 3) * 0.05;
    }

    // 3. Counter-rotate the outer low-poly synaptic shell
    if (shellRef.current) {
      shellRef.current.rotation.y = -time * 0.04;
      shellRef.current.rotation.x = Math.cos(time * 0.06) * 0.1;
      
      const mat = shellRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (hovered ? 0.12 : 0.06) + Math.sin(time * 2) * 0.02;
    }

    // 4. Orbiting Satellites (Data Nodes)
    const orbitSpeed = hovered ? 1.8 : 1.2;
    
    // Satellite 1: Tilted X-axis orbit
    if (satellite1Ref.current) {
      const radius = 1.7;
      const angle = time * orbitSpeed;
      satellite1Ref.current.position.x = radius * Math.cos(angle);
      satellite1Ref.current.position.y = radius * Math.sin(angle) * Math.cos(Math.PI / 6);
      satellite1Ref.current.position.z = radius * Math.sin(angle) * Math.sin(Math.PI / 6);
    }

    // Satellite 2: Tilted Y-axis orbit (retrograde)
    if (satellite2Ref.current) {
      const radius = 2.0;
      const angle = -time * orbitSpeed * 0.8;
      satellite2Ref.current.position.x = radius * Math.cos(angle) * Math.cos(-Math.PI / 4);
      satellite2Ref.current.position.y = radius * Math.sin(angle);
      satellite2Ref.current.position.z = radius * Math.cos(angle) * Math.sin(-Math.PI / 4);
    }

    // Satellite 3: Polar orbit
    if (satellite3Ref.current) {
      const radius = 1.4;
      const angle = time * orbitSpeed * 1.3 + Math.PI;
      satellite3Ref.current.position.x = radius * Math.sin(angle) * Math.cos(Math.PI / 3);
      satellite3Ref.current.position.y = radius * Math.cos(angle);
      satellite3Ref.current.position.z = radius * Math.sin(angle) * Math.sin(Math.PI / 3);
    }

    // 5. Aura Particle size pulsing
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.size = (hovered ? 0.045 : 0.035) + Math.sin(time * 6) * 0.005;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* LAYER 1: Pulsing Compute Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.85, 2]} />
        <meshBasicMaterial
          color="#BD9A76"
          wireframe
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* LAYER 2: Outer Synaptic Low-Poly Connection Mesh */}
      <mesh ref={shellRef}>
        <sphereGeometry args={[1.5, 12, 12]} />
        <meshBasicMaterial
          color="#e8c29b"
          wireframe
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* LAYER 3: Swarm Particle Aura */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#e8c29b"
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.65}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* LAYER 4: Orbiting Satellites (glowing core packets) */}
      <mesh ref={satellite1Ref}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#BD9A76" blending={THREE.AdditiveBlending} />
      </mesh>
      
      <mesh ref={satellite2Ref}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#e8c29b" blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh ref={satellite3Ref}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffffff" blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

export const ThreeSphere: React.FC = () => {
  return (
    <div className="w-full h-[350px] sm:h-[450px] md:h-[500px] relative select-none">
      {/* Background Glow Ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[280px] h-[280px] bg-brand-gold opacity-15 rounded-full blur-[80px]" />
      </div>

      <Canvas
        camera={{ position: [0, 0, 4.0], fov: 60 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} color="#e8c29b" />
        <NeuralNetwork />
      </Canvas>
    </div>
  );
};
