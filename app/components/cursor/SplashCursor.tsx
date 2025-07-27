"use client";
import React, { useEffect, useRef } from "react";

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: ColorRGB;
  TRANSPARENT?: boolean;
}

interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: ColorRGB;
}

function pointerPrototype(): Pointer {
  return {
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: { r: 0, g: 0, b: 0 },
  };
}

export default function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pointers: Pointer[] = [pointerPrototype()];

    // Configuration object for fluid simulation (currently unused but kept for future implementation)
    const config = {
      SIM_RESOLUTION: SIM_RESOLUTION!,
      DYE_RESOLUTION: DYE_RESOLUTION!,
      CAPTURE_RESOLUTION: CAPTURE_RESOLUTION!,
      DENSITY_DISSIPATION: DENSITY_DISSIPATION!,
      VELOCITY_DISSIPATION: VELOCITY_DISSIPATION!,
      PRESSURE: PRESSURE!,
      PRESSURE_ITERATIONS: PRESSURE_ITERATIONS!,
      CURL: CURL!,
      SPLAT_RADIUS: SPLAT_RADIUS!,
      SPLAT_FORCE: SPLAT_FORCE!,
      SHADING,
      COLOR_UPDATE_SPEED: COLOR_UPDATE_SPEED!,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
    };

    // WebGL setup and fluid simulation code would go here
    // This is a simplified version - the full implementation would include
    // all the WebGL shaders, framebuffers, and fluid dynamics calculations

    function scaleByPixelRatio(input: number) {
      const pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }

    function generateColor(): ColorRGB {
      const c = HSVtoRGB(Math.random(), 1.0, 1.0);
      c.r *= 0.15;
      c.g *= 0.15;
      c.b *= 0.15;
      return c;
    }

    function HSVtoRGB(h: number, s: number, v: number): ColorRGB {
      let r = 0, g = 0, b = 0;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
      }
      return { r, g, b };
    }

    // Simple cursor trail effect
    const cursorTrail = document.getElementById('cursor-trail') as HTMLElement;
    
    if (cursorTrail) {
      window.addEventListener("mousemove", (e) => {
        cursorTrail.style.left = e.clientX + "px";
        cursorTrail.style.top = e.clientY + "px";
        
        // Change color randomly
        const colors = [
          "rgba(255,0,0,0.8)",
          "rgba(0,255,0,0.8)", 
          "rgba(0,0,255,0.8)",
          "rgba(255,255,0,0.8)",
          "rgba(255,0,255,0.8)",
          "rgba(0,255,255,0.8)"
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        cursorTrail.style.background = `radial-gradient(circle, ${randomColor} 0%, ${randomColor.replace('0.8', '0.3')} 50%, transparent 100%)`;
      });
    }

    // Event listeners for mouse and touch
    window.addEventListener("mousedown", (e) => {
      const pointer = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      pointer.id = -1;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1 - posY / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    });

    window.addEventListener("mousemove", (e) => {
      const pointer = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1 - posY / canvas.height;
      pointer.deltaX = pointer.texcoordX - pointer.prevTexcoordX;
      pointer.deltaY = pointer.texcoordY - pointer.prevTexcoordY;
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    });

    window.addEventListener("mouseup", () => {
      const pointer = pointers[0];
      pointer.down = false;
    });

    // Touch events
    window.addEventListener("touchstart", (e) => {
      const touches = e.targetTouches;
      const pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        const posX = scaleByPixelRatio(touches[i].clientX);
        const posY = scaleByPixelRatio(touches[i].clientY);
        pointer.id = touches[i].identifier;
        pointer.down = true;
        pointer.moved = false;
        pointer.texcoordX = posX / canvas.width;
        pointer.texcoordY = 1 - posY / canvas.height;
        pointer.prevTexcoordX = pointer.texcoordX;
        pointer.prevTexcoordY = pointer.texcoordY;
        pointer.deltaX = 0;
        pointer.deltaY = 0;
        pointer.color = generateColor();
      }
    });

    window.addEventListener("touchmove", (e) => {
      const touches = e.targetTouches;
      const pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        const posX = scaleByPixelRatio(touches[i].clientX);
        const posY = scaleByPixelRatio(touches[i].clientY);
        pointer.prevTexcoordX = pointer.texcoordX;
        pointer.prevTexcoordY = pointer.texcoordY;
        pointer.texcoordX = posX / canvas.width;
        pointer.texcoordY = 1 - posY / canvas.height;
        pointer.deltaX = pointer.texcoordX - pointer.prevTexcoordX;
        pointer.deltaY = pointer.texcoordY - pointer.prevTexcoordY;
        pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
      }
    });

    window.addEventListener("touchend", () => {
      const pointer = pointers[0];
      pointer.down = false;
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousedown", () => {});
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("mouseup", () => {});
      window.removeEventListener("touchstart", () => {});
      window.removeEventListener("touchmove", () => {});
      window.removeEventListener("touchend", () => {});
    };
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
  ]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    >
      <canvas
        ref={canvasRef}
        id="fluid"
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
          background: "transparent",
        }}
      />
      {/* Simple cursor trail effect */}
      <div
        style={{
          position: "fixed",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,0,0,0.3) 50%, transparent 100%)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: "all 0.1s ease",
          zIndex: 1000,
        }}
        id="cursor-trail"
      />
    </div>
  );
} 