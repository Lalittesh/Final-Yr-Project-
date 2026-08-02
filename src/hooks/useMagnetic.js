import { useRef } from 'react';

export function useMagnetic() {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const btn = ref.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
  };

  const handleMouseLeave = () => {
    const btn = ref.current;
    if (btn) btn.style.transform = '';
  };

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
