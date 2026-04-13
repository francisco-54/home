import { useState, useRef, useEffect } from "react";

/**
 * Anima un número desde 0 hasta `target` con easing cúbico,
 * disparándose cuando el elemento entra al viewport.
 * @param {number} target   - valor final
 * @param {number} duration - duración en ms
 * @returns {[React.Ref, number]} - [ref para el contenedor, valor actual]
 */
export default function useCounter(target, duration = 1800) {
  const [n, setN]  = useState(0);
  const done = useRef(false);
  const ref  = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          let start = null;

          const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setN(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(step);
            else setN(target);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return [ref, n];
}
