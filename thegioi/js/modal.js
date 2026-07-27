import { ANIMATIONS } from './animations.js';
import { formatYear } from './timeline.js';

let rafId = null;

function stopAnimation() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

export function openModal(ev) {
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-year').textContent = formatYear(ev.year);
  document.getElementById('modal-title').textContent = ev.title;
  document.getElementById('modal-location').textContent = `📍 ${ev.location}`;
  document.getElementById('modal-desc').textContent = ev.desc;
  overlay.classList.remove('hidden');

  const canvas = document.getElementById('modal-canvas');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  // clientWidth không bị ảnh hưởng bởi transform của animation mở modal
  const cssW = canvas.clientWidth;
  const cssH = cssW * 9 / 16;
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);

  const ctx = canvas.getContext('2d');
  const anim = ANIMATIONS[ev.anim] || ANIMATIONS.fallback;
  const t0 = performance.now();

  stopAnimation();
  const loop = now => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    ctx.save();
    anim(ctx, (now - t0) / 1000, cssW, cssH);
    ctx.restore();
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);
}

export function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  stopAnimation();
}

export function initModal() {
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}
