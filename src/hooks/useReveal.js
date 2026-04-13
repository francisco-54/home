import { useRef, useEffect } from "react";

/**
 * Agrega la clase "on" al elemento cuando entra al viewport.
 * @param {string} cls      - clase CSS base del elemento (rv | rv-l | rv-r | rv-sc)
 * @param {number} threshold - fracción del elemento visible antes de disparar
 */
export default function useReveal(cls = "rv", threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("on");
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}
