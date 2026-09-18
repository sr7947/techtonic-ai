import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GeminiParticleStreamProps {
  particleCount: number;
}

const GeminiParticleStream: React.FC<GeminiParticleStreamProps> = ({ particleCount }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const lightBeamRef = useRef<THREE.Mesh>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Generate Gemini-style horizontal sweeping particle funnel & beam data
  const { positions, colors, metaData } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const meta: Array<{
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
      amplitude: number;
      phase: number;
      radius: number;
    }> = [];

    // Vivid Gemini Red / Gold palette
    const colorPalette = [
      new THREE.Color('#FF2A2A'), // Bright Crimson Red
      new THREE.Color('#FF4500'), // Orange Red
      new THREE.Color('#FF6B35'), // Warm Glowing Orange
      new THREE.Color('#BD9A76'), // TechTonic Gold
      new THREE.Color('#F3D8B6'), // Warm Amber Highlight
      new THREE.Color('#FFFFFF'), // Core White Sparkle
    ];

    for (let i = 0; i < particleCount; i++) {
      // Horizontal cone distribution (sweeping from left X=-6 across to X=+7)
      // Concentration is highest near center X=0 to X=+3 to mimic Gemini screenshot
      const progress = Math.random(); // 0 to 1 along horizontal axis
      const x = (progress - 0.5) * 14; 
      
      // Cone expansion: narrow at left, expanding into wide horizontal vortex at center/right
      const coneRadius = 0.3 + Math.pow(Math.abs(progress - 0.2), 1.4) * 3.2;
      const angle = Math.random() * Math.PI * 2;
      const radiusOffset = Math.pow(Math.random(), 1.5) * coneRadius;

      const y = radiusOffset * Math.sin(angle);
      const z = (radiusOffset * Math.cos(angle)) * 0.7 + (Math.random() - 0.5) * 1.5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Color selection based on distance from core beam line
      const distFromCenter = Math.sqrt(y * y + z * z);
      let colorIndex = 0;
      if (distFromCenter < 0.4) {
        colorIndex = Math.random() > 0.4 ? 5 : 0; // White core / Red intensity
      } else if (distFromCenter < 1.2) {
        colorIndex = Math.floor(Math.random() * 3); // Crimson / Orange
      } else {
        colorIndex = 3 + Math.floor(Math.random() * 2); // Gold / Amber outer cloud
      }

      const selectedColor = colorPalette[colorIndex].clone();
      // Randomize opacity/brightness
      selectedColor.multiplyScalar(0.7 + Math.random() * 0.6);

      col[i * 3] = selectedColor.r;
      col[i * 3 + 1] = selectedColor.g;
      col[i * 3 + 2] = selectedColor.b;

      meta.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        speed: (0.3 + Math.random() * 1.2) * (x > 0 ? 1.2 : 0.8),
        amplitude: 0.1 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        radius: radiusOffset,
      });
    }

    return { positions: pos, colors: col, metaData: meta };
  }, [particleCount]);

  // Radial glow particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.25, 'rgba(255, 80, 50, 0.95)');
      gradient.addColorStop(0.6, 'rgba(230, 40, 20, 0.35)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smooth global mouse interpolation across entire screen
    mousePos.current.targetX = state.pointer.x;
    mousePos.current.targetY = state.pointer.y;
    
    mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.04;
    mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.04;

    const mouseX = mousePos.current.x;
    const mouseY = mousePos.current.y;

    if (pointsRef.current) {
      const geometry = pointsRef.current.geometry;
      const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionAttr.array as Float32Array;

      // Group rotation & subtle camera tilt responding to screen mouse movement
      pointsRef.current.rotation.y = Math.sin(time * 0.05) * 0.08 + mouseX * 0.25;
      pointsRef.current.rotation.x = Math.cos(time * 0.04) * 0.06 - mouseY * 0.2;
      pointsRef.current.rotation.z = Math.sin(time * 0.03) * 0.04 + mouseX * 0.1;

      // Animate 15,000+ individual particles dynamically
      for (let i = 0; i < particleCount; i++) {
        const m = metaData[i];
        
        // Continuous horizontal flow displacement
        let newX = m.baseX + (time * m.speed * 0.4) % 14;
        if (newX > 7) newX -= 14;

        // Wave & turbulence equation mimicking Gemini screenshot funnel
        const waveY = Math.sin(time * 1.5 + newX * 0.8 + m.phase) * m.amplitude;
        const waveZ = Math.cos(time * 1.2 + newX * 0.6 + m.phase) * m.amplitude;

        // Interactive mouse force repulsion field
        const dx = newX - mouseX * 6;
        const dy = m.baseY - mouseY * 3;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let mouseDisplaceY = 0;
        let mouseDisplaceZ = 0;
        if (dist < 3.0) {
          const force = (3.0 - dist) * 0.22;
          mouseDisplaceY = dy * force * 0.3;
          mouseDisplaceZ = force * 0.4;
        }

        posArray[i * 3] = newX;
        posArray[i * 3 + 1] = m.baseY + waveY + mouseDisplaceY;
        posArray[i * 3 + 2] = m.baseZ + waveZ + mouseDisplaceZ;
      }

      positionAttr.needsUpdate = true;
    }

    // Pulse central focal light beam
    if (lightBeamRef.current) {
      lightBeamRef.current.rotation.z = Math.sin(time * 0.2) * 0.05;
      const pulseOpacity = 0.35 + Math.sin(time * 2.5) * 0.1;
      (lightBeamRef.current.material as THREE.MeshBasicMaterial).opacity = pulseOpacity;
    }
  });

  return (
    <group>
      {/* 15,000+ Swarming Full-Screen WebGL Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          sizeAttenuation
          map={particleTexture}
          vertexColors
          transparent
          opacity={0.92}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Central Volumetric Light Beam Streak */}
      <mesh ref={lightBeamRef} position={[0, 0, -0.5]} rotation={[0, 0, Math.PI / 16]}>
        <cylinderGeometry args={[0.08, 2.5, 16, 32]} />
        <meshBasicMaterial
          color="#FF3B30"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export const GeminiFullPage3D: React.FC = () => {
  // Adaptive particle count based on screen width
  const particleCount = useMemo(() => {
    if (typeof window === 'undefined') return 12000;
    return window.innerWidth < 768 ? 6000 : 15000;
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      
      {/* Background Ambient Red/Gold Light Bleed */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-600/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[500px] h-[350px] bg-brand-gold/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Full-Screen WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 60 }}
        className="w-full h-full pointer-events-auto"
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 3, 4]} intensity={2.0} color="#FF6B35" />
        <pointLight position={[-6, -3, -4]} intensity={1.5} color="#BD9A76" />
        <GeminiParticleStream particleCount={particleCount} />
      </Canvas>
    </div>
  );
};
