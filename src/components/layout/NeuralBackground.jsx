"use client";
import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 70;
const CONNECTION_DIST = 140;
const MOUSE_RADIUS = 110;
const MINT = "62, 255, 194";

export function NeuralBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
    const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };
    resize();
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener("resize", onResize);

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      const particles = particlesRef.current;

      particles.forEach((p) => {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dSq = dx * dx + dy * dy;
        if (dSq < MOUSE_RADIUS_SQ && dSq > 0.25) {
          const d = Math.sqrt(dSq);
          const force = ((MOUSE_RADIUS - d) / MOUSE_RADIUS) * 0.3;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
        p.vx *= 0.975;
        p.vy *= 0.975;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        else if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        else if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${MINT}, 0.45)`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dSq = dx * dx + dy * dy;
          if (dSq < CONNECTION_DIST_SQ) {
            const d = Math.sqrt(dSq);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${MINT}, ${(1 - d / CONNECTION_DIST) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        tick();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}
