import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MassiveMotionSphereProps {
  particleCount?: number;
  sphereRadius?: number;
  autoRotateSpeed?: number;
  interactive?: boolean;
  showInsideLogo?: boolean;
  className?: string;
  onInteractionChange?: (interacting: boolean) => void;
}

// ---------------------------------------------------------------------------
// 1. REVOLVING 3D WENZDAYLAB LOGO (Suspended Inside the Sphere)
// ---------------------------------------------------------------------------
const RevolvingInsideLogo: React.FC<{ size?: number }> = ({ size = 1.15 }) => {
  const logoGroupRef = useRef<THREE.Group>(null);
  const glowDotRef = useRef<THREE.Mesh>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  // Load logo texture onto a double-sided metallic badge
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/wenzdaylab-logo.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (logoGroupRef.current) {
      // Independent hypnotic rotation around Y axis
      logoGroupRef.current.rotation.y = time * 0.42;
      // Gentle vertical floating breathing motion
      logoGroupRef.current.position.y = Math.sin(time * 1.6) * 0.05;
      // Subtle Z-axis roll wobble for 3D depth
      logoGroupRef.current.rotation.z = Math.sin(time * 0.8) * 0.06;
      // Subtle pitch oscillation
      logoGroupRef.current.rotation.x = Math.cos(time * 0.6) * 0.04;
    }

    // Pulse the orange glowing dot and point light
    if (glowDotRef.current && pointLightRef.current) {
      const pulse = 1.0 + Math.sin(time * 4) * 0.25;
      glowDotRef.current.scale.set(pulse, pulse, pulse);
      pointLightRef.current.intensity = 2.4 + Math.sin(time * 3) * 0.8;
    }
  });

  return (
    <group ref={logoGroupRef} position={[0, 0, 0]} scale={[size, size, size]}>
      {/* 3D Double-Sided Metallic Emblem Front */}
      <mesh position={[0, 0, 0.015]}>
        <planeGeometry args={[1.3, 1.3]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.05}
          roughness={0.25}
          metalness={0.85}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Back side of emblem */}
      <mesh position={[0, 0, -0.015]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.3, 1.3]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.05}
          roughness={0.25}
          metalness={0.85}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Dark Titanium Bevel Rim / Core Backplate */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.028, 48]} />
        <meshStandardMaterial
          color="#12161E"
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Real 3D Radiant Orange Sphere Dot (matches the top-right prong dot) */}
      <mesh ref={glowDotRef} position={[0.31, 0.31, 0.035]}>
        <sphereGeometry args={[0.075, 32, 32]} />
        <meshStandardMaterial
          color="#FF7A00"
          emissive="#FF5500"
          emissiveIntensity={3.5}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Dynamic Solar Point Light casting orange glow from the dot onto inner particles */}
      <pointLight
        ref={pointLightRef}
        position={[0.31, 0.31, 0.06]}
        color="#FF7A00"
        intensity={2.8}
        distance={4.2}
        decay={2}
      />

      {/* Subtle Core Blue-Steel Ambient Fill inside the sphere */}
      <pointLight
        position={[0, -0.2, 0]}
        color="#38BDF8"
        intensity={0.4}
        distance={2.5}
        decay={2}
      />
    </group>
  );
};

// ---------------------------------------------------------------------------
// 2. MASSIVE 3D PARTICLE SPHERE (Motion.dev point-cloud with horizontal rings)
// ---------------------------------------------------------------------------
interface ParticleSphereMeshProps {
  particleCount: number;
  radius: number;
  autoRotateSpeed: number;
  isDragging: boolean;
  dragDelta: { x: number; y: number };
  mousePos: { x: number; y: number };
  showInsideLogo: boolean;
}

const ParticleSphereMesh: React.FC<ParticleSphereMeshProps> = ({
  particleCount,
  radius,
  autoRotateSpeed,
  isDragging,
  dragDelta,
  mousePos,
  showInsideLogo,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const sphereGroupRef = useRef<THREE.Group>(null);
  const ambientPointsRef = useRef<THREE.Points>(null);

  // Rotation physics state
  const rotationState = useRef({
    rotX: 0.15,
    rotY: 0,
    velX: 0,
    velY: autoRotateSpeed * 0.002,
  });

  // Generate the soft circular glowing particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 180, 80, 0.95)');
      gradient.addColorStop(0.5, 'rgba(255, 110, 20, 0.5)');
      gradient.addColorStop(0.85, 'rgba(180, 70, 10, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    return texture;
  }, []);

  // Compute stratified particle positions, colors matching Motion.dev
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    // Light source vector (from upper-right front)
    const lightDir = new THREE.Vector3(0.85, 0.55, 0.9).normalize();

    // Color definitions for illumination gradients
    const cHighlight = new THREE.Color('#FFF5DE'); // Crisp warm white-gold
    const cAmberGold = new THREE.Color('#FFA62B'); // Luminous amber
    const cSolarOrange = new THREE.Color('#FF7A00'); // Vivid orange
    const cBronzeMid = new THREE.Color('#9E6D24');  // Warm metallic bronze
    const cDarkShadow = new THREE.Color('#1F150A'); // Deep shadow obsidian-bronze
    const cRimLight = new THREE.Color('#FF9433');   // Silhouette rim reflection

    for (let i = 0; i < particleCount; i++) {
      // Stratified distribution: sample latitude phi and longitude theta
      const u = Math.random();
      const v = Math.random();

      // Longitude (0 to 2*PI)
      const theta = u * Math.PI * 2;

      // Latitude phi (0 to PI) with banding density enhancement
      let phi = Math.acos(2.0 * v - 1.0);

      // Enhance point density along horizontal ring stripes matching Motion.dev
      const bandFactor =
        Math.pow(Math.sin(phi * 7.0), 8) * 0.45 +
        Math.pow(Math.sin(phi * 14.0 + 0.3), 8) * 0.35 +
        Math.pow(Math.cos(phi * 3.5), 10) * 0.25;

      // Volumetric thickness around sphere surface
      const thickness = (Math.random() - 0.5) * 0.12 * (1.0 + bandFactor);
      const r = radius + thickness;

      // Cartesian coordinates
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Lighting & shading calculation
      const normal = new THREE.Vector3(x, y, z).normalize();
      const dot = normal.dot(lightDir);
      const diffuse = Math.max(0.0, dot);
      const rim = Math.pow(1.0 - Math.abs(normal.z), 3.0);

      // Interpolate color based on light exposure and band position
      const finalColor = new THREE.Color();

      if (diffuse > 0.65) {
        // High exposure: Blend amber into bright highlight
        const t = (diffuse - 0.65) / 0.35;
        finalColor.lerpColors(cAmberGold, cHighlight, t);
      } else if (diffuse > 0.2) {
        // Mid exposure: Solar orange to warm amber
        const t = (diffuse - 0.2) / 0.45;
        finalColor.lerpColors(cSolarOrange, cAmberGold, t);
      } else {
        // Shadow side: Dark bronze with rim lighting boost
        const t = Math.max(0, diffuse) / 0.2;
        finalColor.lerpColors(cDarkShadow, cBronzeMid, t);
        if (rim > 0.4) {
          finalColor.lerp(cRimLight, rim * 0.65);
        }
      }

      // Add horizontal band brightness boost (creates the stripes)
      if (bandFactor > 0.2) {
        finalColor.lerp(cAmberGold, bandFactor * 0.5);
      }

      col[i * 3] = finalColor.r;
      col[i * 3 + 1] = finalColor.g;
      col[i * 3 + 2] = finalColor.b;
    }

    return { positions: pos, colors: col };
  }, [particleCount, radius]);

  // Ambient floating dust particles around the massive sphere
  const ambientPositions = useMemo(() => {
    const count = 750;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const dist = radius * (1.1 + Math.random() * 1.5);
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);

      pos[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = dist * Math.cos(phi);
      pos[i * 3 + 2] = dist * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, [radius]);

  // Main 60fps render loop with physics, drag inertia, and mouse tracking
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const s = rotationState.current;

    if (isDragging) {
      // User is dragging: directly update rotation velocities
      s.velY = dragDelta.x * 0.004;
      s.velX = dragDelta.y * 0.004;
      s.rotY += s.velY;
      s.rotX += s.velX;
    } else {
      // User released drag: apply inertia damping & smooth decay
      s.velX *= 0.93;
      s.velY *= 0.93;

      // Blend back into steady idle auto-rotation
      const idleSpeed = autoRotateSpeed * 0.0018;
      s.rotY += s.velY + idleSpeed;
      s.rotX += s.velX;

      // Subtle planetary wobble
      s.rotX += Math.sin(time * 0.3) * 0.0003;
    }

    // Clamp vertical tilt to avoid flipping upside down
    s.rotX = Math.max(-Math.PI * 0.42, Math.min(Math.PI * 0.42, s.rotX));

    // Mouse parallax tracking when not dragging
    const targetParallaxX = mousePos.x * 0.25;
    const targetParallaxY = mousePos.y * 0.2;

    if (sphereGroupRef.current) {
      // Apply smooth Euler rotation with planetary axial tilt (-12deg) and mouse parallax
      sphereGroupRef.current.rotation.z = -0.21;
      sphereGroupRef.current.rotation.x = s.rotX + targetParallaxY;
      sphereGroupRef.current.rotation.y = s.rotY + targetParallaxX;
    }

    // Ambient floating dust slow counter-rotation
    if (ambientPointsRef.current) {
      ambientPointsRef.current.rotation.y = -time * 0.02;
      ambientPointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.05;
    }
  });

  return (
    <group ref={sphereGroupRef}>
      {/* 1. REVOLVING 3D LOGO INSIDE THE SPHERE */}
      {showInsideLogo && <RevolvingInsideLogo size={radius * 0.44} />}

      {/* 2. THE MASSIVE 3D PARTICLE SPHERE (Motion.dev Banded Shell) */}
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
          size={0.034}
          vertexColors
          map={particleTexture}
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* 3. AMBIENT DRIFTING PARTICLES / STARDUST HALO */}
      <points ref={ambientPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[ambientPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          color="#FFA62B"
          map={particleTexture}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

// ---------------------------------------------------------------------------
// 3. MAIN EXPORTED COMPONENT (Canvas + Pointer Drag Handler + Camera Zoom)
// ---------------------------------------------------------------------------
export const MassiveMotionSphere: React.FC<MassiveMotionSphereProps> = ({
  particleCount = 19000,
  sphereRadius = 1.38,
  autoRotateSpeed = 1.0,
  interactive = true,
  showInsideLogo = true,
  className = 'w-full h-full',
  onInteractionChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag interaction states
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const dragDelta = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  // Camera zoom state
  const [cameraZ, setCameraZ] = useState(4.6);

  // Pointer drag events
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    setHasInteracted(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    dragDelta.current = { x: 0, y: 0 };
    if (onInteractionChange) onInteractionChange(true);
    // Capture pointer for smooth drags even outside canvas boundary
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [interactive, onInteractionChange]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    // Parallax tracking when moving over container
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      setMouseParallax({ x: normX, y: normY });
    }

    if (!isDragging) return;

    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    dragDelta.current = { x: dx, y: dy };
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    dragDelta.current = { x: 0, y: 0 };
    if (onInteractionChange) onInteractionChange(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  }, [onInteractionChange]);

  // Mouse wheel zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !interactive) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent page scroll when interacting directly inside sphere canvas
      if (Math.abs(e.deltaY) > 0) {
        setCameraZ((prev) => {
          const next = prev + e.deltaY * 0.003;
          return Math.max(3.2, Math.min(6.8, next));
        });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className} ${
        interactive ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'pointer-events-none'
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Ambient Radial Glow Behind Sphere */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[520px] h-[520px] bg-gradient-to-tr from-amber-600/15 via-orange-500/10 to-transparent rounded-full blur-[110px]" />
      </div>

      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 3, 5]} intensity={1.8} color="#FFE5B4" />

        <ParticleSphereMesh
          particleCount={particleCount}
          radius={sphereRadius}
          autoRotateSpeed={autoRotateSpeed}
          isDragging={isDragging}
          dragDelta={dragDelta.current}
          mousePos={mouseParallax}
          showInsideLogo={showInsideLogo}
        />
      </Canvas>

      {/* Subtle Drag Hint Overlay (fades out after first interaction) */}
      {interactive && !hasInteracted && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-amber-500/30 text-[10px] uppercase tracking-widest text-amber-300/80 backdrop-blur-md animate-pulse">
          <span>Drag to Rotate</span>
          <span>•</span>
          <span>Scroll to Zoom</span>
        </div>
      )}
    </div>
  );
};
