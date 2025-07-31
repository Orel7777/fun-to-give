'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// Define the component as a simple variant first - WebGPU might not be available everywhere
const Scene = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const material = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uPointer;
        varying vec2 vUv;
        
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        void main() {
          vec2 uv = vUv;
          
          // Create scanning effect
          float scan = sin((uv.y + uTime * 0.5) * 20.0) * 0.04;
          
          // Create grid pattern
          vec2 grid = abs(fract(uv * 10.0) - 0.5);
          float gridPattern = smoothstep(0.0, 0.05, min(grid.x, grid.y));
          
          // Add some noise
          float noise = random(uv + uTime * 0.1) * 0.1;
          
          // Create glow effect based on mouse position
          float dist = distance(uv, uPointer * 0.5 + 0.5);
          float glow = 1.0 - smoothstep(0.0, 0.3, dist);
          
          // Combine effects
          vec3 color = vec3(0.2, 0.8, 1.0) * gridPattern;
          color += vec3(1.0, 0.3, 0.0) * glow * 0.5;
          color += vec3(1.0, 0.0, 0.0) * scan;
          color += noise;
          
          gl_FragColor = vec4(color, 0.8);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) }
      },
      transparent: true
    });
    
    return material;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (material && 'uniforms' in material) {
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uPointer.value = pointer;
    }
    
    if (meshRef.current && material && 'opacity' in material) {
      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        visible ? 0.8 : 0,
        0.07
      );
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
      <planeGeometry args={[4, 4]} />
    </mesh>
  );
};

export const HeroFuturistic = () => {
  const titleWords = 'כיף לתת'.split(' ');
  const subtitle = 'עם כל נתינה הלב מתמלא';
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const [subtitleDelay, setSubtitleDelay] = useState(0);

  useEffect(() => {
    // Generate random delays for glitch effect
    setDelays(titleWords.map(() => Math.random() * 0.07));
    setSubtitleDelay(Math.random() * 0.1);
  }, [titleWords.length]);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 600);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black cyber-grid">
      {/* Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Scene />
        </Canvas>
      </div>

      {/* Text Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-10 text-center">
        <div className="text-4xl md:text-6xl xl:text-8xl 2xl:text-9xl font-extrabold font-staff">
          <div className="flex space-x-4 lg:space-x-8 overflow-hidden text-white">
            {titleWords.map((word, index) => (
              <div
                key={index}
                className={`futuristic-text transition-all duration-1000 ${
                  index < visibleWords 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-10'
                }`}
                style={{ 
                  animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                  textShadow: '0 0 20px rgba(245, 163, 131, 0.8)'
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-lg md:text-2xl xl:text-3xl 2xl:text-4xl mt-4 overflow-hidden text-white/90 font-bold">
          <div
            className={`transition-all duration-1000 ${
              subtitleVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-10'
            }`}
            style={{ 
              animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`,
              textShadow: '0 0 15px rgba(154, 205, 190, 0.6)'
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce"
          style={{ animationDelay: '2.5s' }}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm font-medium">גלול למטה</span>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="animate-pulse"
            >
              <path 
                d="M12 5V19" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              <path 
                d="M7 14L12 19L17 14" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFuturistic;