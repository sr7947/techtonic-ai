import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sparkles, Orbit, Flame, RefreshCw, Zap } from 'lucide-react';

interface VortexParticlesProps {
  mode: 'gemini' | 'galaxy' | 'wave';
  speed: number;
  particleCount: number;
  mouseAttract: boolean;
}

const ParticleSwarm: React.FC<VortexParticlesProps> = ({ mode, speed, particleCount, mouseAttract }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const coreGlowRef = useRef<THREE.Mesh>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Generate initial particle geometry and color data
  const { positions, colors, initialData } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const meta: Array<{
      radius: number;
      angle: number;
      height: number;
      speed: number;
      phase: number;
      baseColor: THREE.Color;
      spread: number;
    }> = [];

    // Colors: Red/Gold Gemini aesthetic blending with TechTonic AI gold
    const colorPalette = [
      new THREE.Color('#FF3B30'), // Vivid Red (Gemini particle style)
      new THREE.Color('#FF6B35'), // Warm Orange
      new THREE.Color('#BD9A76'), // TechTonic Gold
      new THREE.Color('#F3D8B6'), // Bright Warm Amber
      new THREE.Color('#FF9F0A'), // Bright Amber
      new THREE.Color('#E63946'), // Crimson
    ];

    for (let i = 0; i < particleCount; i++) {
      // Create sweeping funnel / vortex distribution
      const u = Math.random();
      const radius = 0.4 + Math.pow(u, 1.8) * 4.5;
      const angle = Math.random() * Math.PI * 2;
      
      // Height funnel curvature (narrow at core, spreading wide outwards)
      const height = (Math.random() - 0.5) * (1.2 + radius * 0.8);
      const spread = (Math.random() - 0.5) * 0.3;

      pos[i * 3] = radius * Math.cos(angle) + spread;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = radius * Math.sin(angle) + spread;

      // Color pick with gradient depending on radius (red core -> gold/amber outer)
      const colorIndex = Math.floor(Math.random() * colorPalette.length);
      const selectedColor = colorPalette[colorIndex].clone();
      
      // Slight brightness variance
      selectedColor.multiplyScalar(0.8 + Math.random() * 0.5);

      col[i * 3] = selectedColor.r;
      col[i * 3 + 1] = selectedColor.g;
      col[i * 3 + 2] = selectedColor.b;

      meta.push({
        radius,
        angle,
        height,
        speed: (0.2 + Math.random() * 0.8) * (radius * 0.3 + 0.5),
        phase: Math.random() * Math.PI * 2,
        baseColor: selectedColor,
        spread,
      });
    }

    return { positions: pos, colors: col, initialData: meta };
  }, [particleCount]);

  // Create radial particle dot texture programmatically
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 200, 150, 0.9)');
      gradient.addColorStop(0.5, 'rgba(230, 70, 50, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed;
    
    // Smooth mouse interpolation
    mousePos.current.x += (state.pointer.x - mousePos.current.x) * 0.05;
    mousePos.current.y += (state.pointer.y - mousePos.current.y) * 0.05;

    const mouseX = mousePos.current.x;
    const mouseY = mousePos.current.y;

    if (pointsRef.current) {
      const geometry = pointsRef.current.geometry;
      const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionAttr.array as Float32Array;

      // Rotate whole points group with mouse parallax
      pointsRef.current.rotation.y = time * 0.08 + mouseX * 0.4;
      pointsRef.current.rotation.x = Math.sin(time * 0.04) * 0.15 - mouseY * 0.3;
      pointsRef.current.rotation.z = Math.cos(time * 0.03) * 0.08;

      // Animate individual particles for dynamic organic fluid flow
      for (let i = 0; i < particleCount; i++) {
        const p = initialData[i];
        let currentAngle = p.angle;
        let currentRadius = p.radius;
        let currentHeight = p.height;

        if (mode === 'gemini') {
          // Gemini Vortex: Double hyperbolic particle swirl with wave ripples
          currentAngle += time * 0.3 * (1.5 / (currentRadius + 0.2));
          currentHeight = p.height + Math.sin(time * 1.5 + p.phase + currentRadius * 2) * 0.25;
          currentRadius = p.radius + Math.sin(time * 2 + p.phase) * 0.12;
        } else if (mode === 'galaxy') {
          // Spiral Galaxy: Multi-arm swirl
          currentAngle += time * 0.4;
          currentRadius = p.radius + Math.cos(time + p.phase) * 0.1;
          currentHeight = p.height + Math.sin(time * 2 + p.angle * 3) * 0.15;
        } else {
          // Quantum Wave: Longitudinal wave mesh
          currentHeight = p.height + Math.sin(p.radius * 3 - time * 2) * 0.4;
          currentRadius = p.radius + Math.cos(p.angle * 2 + time) * 0.2;
        }

        // Apply mouse interaction force
        if (mouseAttract) {
          const dx = mouseX * 3 - posArray[i * 3];
          const dy = mouseY * 2 - posArray[i * 3 + 1];
          const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
          if (dist < 2.5) {
            const force = (2.5 - dist) * 0.15;
            posArray[i * 3] += dx * force * 0.05;
            posArray[i * 3 + 1] += dy * force * 0.05;
          }
        }

        // Map back to 3D buffer array
        posArray[i * 3] = currentRadius * Math.cos(currentAngle);
        posArray[i * 3 + 1] = currentHeight;
        posArray[i * 3 + 2] = currentRadius * Math.sin(currentAngle);
      }

      positionAttr.needsUpdate = true;
    }

    // Pulse center compute core mesh
    if (coreGlowRef.current) {
      const pulse = 1.0 + Math.sin(time * 3) * 0.15;
      coreGlowRef.current.scale.set(pulse, pulse, pulse);
      coreGlowRef.current.rotation.y = -time * 0.3;
    }
  });

  return (
    <group>
      {/* 3D Dynamic Particle Swarm */}
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
          size={0.065}
          sizeAttenuation
          map={particleTexture}
          vertexColors
          transparent
          opacity={0.88}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Center Volumetric Light Core */}
      <mesh ref={coreGlowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#FF5722"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export const GeminiParticleVortex: React.FC = () => {
  const [mode, setMode] = useState<'gemini' | 'galaxy' | 'wave'>('gemini');
  const [speed, setSpeed] = useState<number>(1);
  const [mouseAttract, setMouseAttract] = useState<boolean>(true);

  // Responsive particle density (lower count on small screens for maximum 60FPS speed)
  const particleCount = useMemo(() => {
    if (typeof window === 'undefined') return 6000;
    return window.innerWidth < 768 ? 4000 : 9000;
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[650px] overflow-hidden rounded-3xl select-none">
      
      {/* Background Deep Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[140px] animate-pulse" />
        <div className="w-[400px] h-[400px] bg-amber-500/15 rounded-full blur-[120px] absolute" />
        <div className="w-[300px] h-[300px] bg-brand-gold/20 rounded-full blur-[90px] absolute" />
      </div>

      {/* Three.js Canvas Container */}
      <Canvas
        camera={{ position: [0, 0.5, 4.8], fov: 55 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#FF6B35" />
        <pointLight position={[-5, -5, -5]} intensity={1.0} color="#BD9A76" />
        <ParticleSwarm
          mode={mode}
          speed={speed}
          particleCount={particleCount}
          mouseAttract={mouseAttract}
        />
      </Canvas>

      {/* Interactive 3D Control Floating Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-2 bg-brand-navy-dark/80 backdrop-blur-md p-2 rounded-2xl border border-brand-gold/20 shadow-2xl">
        <div className="flex items-center gap-1 bg-brand-navy-deep/60 p-1 rounded-xl border border-brand-gold/10">
          <button
            onClick={() => setMode('gemini')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-all ${
              mode === 'gemini'
                ? 'bg-gradient-to-r from-red-500 to-amber-500 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Gemini Vortex
          </button>
          
          <button
            onClick={() => setMode('galaxy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-all ${
              mode === 'galaxy'
                ? 'bg-gradient-to-r from-amber-500 to-brand-gold text-brand-navy-dark font-bold shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Orbit className="w-3.5 h-3.5" />
            Cosmic Swarm
          </button>

          <button
            onClick={() => setMode('wave')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-all ${
              mode === 'wave'
                ? 'bg-gradient-to-r from-brand-gold to-yellow-400 text-brand-navy-dark font-bold shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Quantum Wave
          </button>
        </div>

        {/* Speed & Interactive Toggles */}
        <div className="flex items-center gap-1.5 pl-1">
          <button
            onClick={() => setSpeed((prev) => (prev === 1 ? 1.8 : prev === 1.8 ? 0.4 : 1))}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-brand-navy-light/30 border border-brand-gold/15 text-brand-gold-bright text-[10px] font-semibold hover:bg-brand-navy-light/60 transition-all"
            title="Toggle Vortex Speed"
          >
            <RefreshCw className="w-3 h-3" />
            {speed === 1 ? '1x Speed' : speed === 1.8 ? '1.8x Fast' : '0.4x Slow'}
          </button>

          <button
            onClick={() => setMouseAttract(!mouseAttract)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-[10px] font-semibold transition-all ${
              mouseAttract
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-brand-navy-light/20 text-slate-400 border-slate-700'
            }`}
            title="Toggle Mouse Particle Repulsion"
          >
            <Zap className="w-3 h-3" />
            {mouseAttract ? 'Mouse Physics: ON' : 'Mouse Physics: OFF'}
          </button>
        </div>
      </div>
    </div>
  );
};
