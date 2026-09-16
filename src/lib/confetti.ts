import confetti from 'canvas-confetti';

/**
 * Triggers a luxury wedding celebration confetti burst (Champagne gold, rose pink, white)
 */
export function triggerWeddingConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ['#D4AF37', '#FFD700', '#F5E6D3', '#E11D48', '#FDA4AF', '#FFFFFF'],
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

/**
 * Continuous subtle hearts/sparkles for live stage display
 */
export function triggerStageCelebration() {
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#D4AF37', '#FBBF24', '#F43F5E', '#FFFFFF'],
    zIndex: 1000,
  });
}
