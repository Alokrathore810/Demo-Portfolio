'use client';

import { useState, useEffect } from 'react';

export default function MotionController() {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('alok_reduced_motion') === 'true';
    if (saved) {
      setIsReduced(true);
      document.body.classList.add('reduced-motion');
    }
  }, []);

  const toggleMotion = () => {
    const nextState = !isReduced;
    setIsReduced(nextState);
    if (nextState) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
    localStorage.setItem('alok_reduced_motion', nextState);
  };

  return (
    <button
      className={`motion-toggle-pill ${isReduced ? 'motion-off' : ''}`}
      id="motionToggleBtn"
      aria-label="Toggle animations and motion"
      onClick={toggleMotion}
    >
      <span className="motion-icon" id="motionIcon" aria-hidden="true">
        {isReduced ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <rect width="4" height="16" x="6" y="4"></rect>
            <rect width="4" height="16" x="14" y="4"></rect>
          </svg>
        )}
      </span>
      <span className="motion-label" id="motionToggleText">
        {isReduced ? 'MOTION OFF' : 'MOTION ON'}
      </span>
    </button>
  );
}
