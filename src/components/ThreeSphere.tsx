import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSphere: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);

  // Generate points in a sphere shell
  const points = useMemo(() => {
    const count = 1200;
    const radius = 1.6;
    const tempPoints = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      // Variable radius for organic digital network look
      const r = radius * (0.9 + Math.random() * 0.15);
      tempPoints[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      tempPoints[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      tempPoints[i * 3 + 2] = r * Math.cos(phi);
    }
    return tempPoints;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = time * 0.15;
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
      
      // Floating / bobbing animation
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.08;

      // Mouse reactive tilt
      const targetX = state.pointer.x * 0.5;
      const targetY = state.pointer.y * 0.5;
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.08;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.08;
    }

    if (pointsRef.current) {
      // Animate particle size pulse
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.size = (hovered ? 0.045 : 0.035) + Math.sin(time * 5) * 0.005;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Structural Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial
          color="#BD9A76"
          wireframe
          transparent
          opacity={hovered ? 0.07 : 0.04}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer Glow Halo Sphere */}
      <mesh scale={1.05}>
        <sphereGeometry args={[1.5, 12, 12]} />
        <meshBasicMaterial
          color="#BD9A76"
          wireframe
          transparent
          opacity={hovered ? 0.03 : 0.015}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Particle Vertices */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[points, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#e8c29b"
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const ThreeSphere: React.FC = () => {
  return (
    <div className="w-full h-[350px] sm:h-[450px] md:h-[500px] relative select-none">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] bg-brand-gold opacity-10 rounded-full blur-[80px]" />
      </div>

      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 60 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} color="#e8c29b" />
        <ParticleSphere />
      </Canvas>
    </div>
  );
};
