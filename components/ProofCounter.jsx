'use client';

import { useState, useEffect, useRef } from 'react';

export default function ProofCounter({ target, suffix = '', duration = 1600 }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    let hasCounted = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            let start = null;
            function step(timestamp) {
              if (!start) start = timestamp;
              const progress = Math.min((timestamp - start) / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(ease * target));
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setCount(target);
              }
            }
            requestAnimationFrame(step);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={counterRef} className="counter-val" data-target={target}>
      {count}
      {suffix}
    </span>
  );
}
