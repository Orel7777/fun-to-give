"use client";
/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import './Particles.css';

interface ParticlesProps {
  particleColors?: string[];
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleBaseSize?: number;
  moveParticlesOnHover?: boolean;
  alphaParticles?: boolean;
  disableRotation?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export default function Particles({
  particleColors = ['#ffffff', '#ffffff'],
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleBaseSize = 100,
  moveParticlesOnHover = true,
  alphaParticles = false,
  disableRotation = false
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

         // יצירת חלקיקים
     const particles: Particle[] = [];
     for (let i = 0; i < particleCount; i++) {
       const colorIndex = Math.floor(Math.random() * particleColors.length);
                particles.push({
           x: (Math.random() - 0.5) * canvas.width,
           y: (Math.random() - 0.5) * canvas.height,
           vx: (Math.random() - 0.5) * speed * 10,
           vy: speed * 20 + Math.random() * speed * 10, // תנועה איטית מאוד כלפי מטה
           size: Math.random() * particleBaseSize + 2,
           color: particleColors[colorIndex],
           alpha: alphaParticles ? Math.random() * 0.4 + 0.2 : 0.7
         });
     }
     particlesRef.current = particles;

     // הגדרת גודל Canvas
     const handleResize = () => {
       const rect = canvas.getBoundingClientRect();
       canvas.width = rect.width;
       canvas.height = rect.height;
       
       // עדכון החלקיקים לגודל החדש
       particles.forEach((particle) => {
         particle.x = (Math.random() - 0.5) * canvas.width;
         particle.y = (Math.random() - 0.5) * canvas.height;
       });
     };
    
         handleResize();
     window.addEventListener('resize', handleResize);

    // event listeners לעכבר
    if (moveParticlesOnHover) {
      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = (e.clientX - rect.left) / rect.width;
        mouseRef.current.y = (e.clientY - rect.top) / rect.height;
      });

      canvas.addEventListener('mouseleave', () => {
        mouseRef.current.x = 0;
        mouseRef.current.y = 0;
      });
    }

    // animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

             particles.forEach((particle) => {
         // עדכון מיקום עם אפקט שלג איטי מאוד
         particle.x += particle.vx + Math.sin(Date.now() * 0.00005 + particle.x * 0.0005) * 0.1;
         particle.y += particle.vy + Math.cos(Date.now() * 0.00003 + particle.y * 0.0003) * 0.05;

         // גבולות - החלקיקים חוזרים מלמעלה כמו שלג
         if (particle.x > canvas.width / 2) particle.x = -canvas.width / 2;
         if (particle.x < -canvas.width / 2) particle.x = canvas.width / 2;
         if (particle.y > canvas.height / 2) {
           particle.y = -canvas.height / 2; // חוזר מלמעלה
           particle.x = (Math.random() - 0.5) * canvas.width; // מיקום אקראי חדש
         }

        // תגובה לעכבר
        if (moveParticlesOnHover && (mouseRef.current.x !== 0 || mouseRef.current.y !== 0)) {
          const mouseX = (mouseRef.current.x - 0.5) * particleSpread * 2;
          const mouseY = (mouseRef.current.y - 0.5) * particleSpread * 2;
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < particleSpread) {
            const force = (particleSpread - dist) / particleSpread;
            particle.vx += dx * force * 0.01;
            particle.vy += dy * force * 0.01;
          }
        }

        // ציור החלקיק
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(
          centerX + particle.x,
          centerY + particle.y,
          particle.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleColors, particleCount, particleSpread, speed, particleBaseSize, moveParticlesOnHover, alphaParticles, disableRotation]);

  return (
    <div className="particles-container">
      <canvas
        ref={canvasRef}
        className="particles-canvas"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
} 