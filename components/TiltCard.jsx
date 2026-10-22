'use client';

import { useRef } from 'react';

export default function TiltCard({ children, className = '', maxTilt = 6, ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (document.body.classList.contains('reduced-motion')) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cardX = e.clientX - rect.left;
    const cardY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((cardY - centerY) / centerY) * -maxTilt;
    const rotateY = ((cardX - centerX) / centerX) * maxTilt;

    card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}
