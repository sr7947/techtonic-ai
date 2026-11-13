import React, { useEffect, useRef } from 'react';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
  alpha: number;
  colorType: 'amber' | 'gold' | 'solar';
}

export const ThreeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle3D[] = [];
    const particleCount = 130;
    const connectionDistance = 145;
    const mouseDistance = 220;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const colorTypes: Array<'amber' | 'gold' | 'solar'> = ['amber', 'gold', 'solar'];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1.8 + 0.6, // Depth from 0.6 (close) to 2.4 (far)
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          vz: (Math.random() - 0.5) * 0.005,
          baseRadius: Math.random() * 2.2 + 1.2,
          alpha: Math.random() * 0.45 + 0.4,
          colorType: colorTypes[Math.floor(Math.random() * colorTypes.length)],
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle ambient space grid
      ctx.strokeStyle = 'rgba(255, 122, 0, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 90;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw 3D floating particles
      particles.forEach((p) => {
        // Perspective speed scaling (closer objects move slightly faster)
        const depthSpeedScale = 1.2 / p.z;
        p.x += p.vx * depthSpeedScale;
        p.y += p.vy * depthSpeedScale;
        p.z += p.vz;

        // Wrap around boundaries
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;
        if (p.z < 0.6 || p.z > 2.4) p.vz *= -1;

        // Depth size attenuation
        const currentRadius = p.baseRadius * (1.2 / p.z);
        const currentAlpha = Math.min(0.9, p.alpha * (1.2 / p.z));

        // Particle colors based on type
        let fillStyle = `rgba(255, 122, 0, ${currentAlpha})`;
        let glowColor = 'rgba(255, 122, 0, 0.7)';

        if (p.colorType === 'gold') {
          fillStyle = `rgba(255, 195, 75, ${currentAlpha})`;
          glowColor = 'rgba(255, 185, 50, 0.7)';
        } else if (p.colorType === 'solar') {
          fillStyle = `rgba(255, 150, 25, ${currentAlpha})`;
          glowColor = 'rgba(255, 95, 0, 0.7)';
        }

        // Render glowing particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.shadowBlur = 8;
        ctx.shadowColor = glowColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw constellation connection webs
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.16 * (1.2 / ((p1.z + p2.z) / 2));
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 135, 20, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Draw dynamic connection to mouse cursor
        if (mouseRef.current.active) {
          const mouseDist = Math.hypot(p1.x - mouseRef.current.x, p1.y - mouseRef.current.y);
          if (mouseDist < mouseDistance) {
            const alpha = (1 - mouseDist / mouseDistance) * 0.32;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(255, 155, 30, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();

            // Gentle ambient attraction to mouse
            p1.x += (mouseRef.current.x - p1.x) * 0.004;
            p1.y += (mouseRef.current.y - p1.y) * 0.004;
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
