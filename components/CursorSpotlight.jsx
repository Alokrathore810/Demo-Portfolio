'use client';

import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isMoving = false;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        rafId = requestAnimationFrame(updatePos);
      }
    };

    function updatePos() {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      el.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

      const dist = Math.hypot(mouseX - currentX, mouseY - currentY);
      if (dist > 0.5) {
        rafId = requestAnimationFrame(updatePos);
      } else {
        isMoving = false;
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={spotlightRef} className="cursor-spotlight" id="cursorSpotlight" aria-hidden="true" />;
}
