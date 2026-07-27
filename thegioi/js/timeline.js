// Ánh xạ thời gian phi tuyến (log theo "số năm trước") để 3,3 triệu năm
// tiền sử không nuốt trọn thanh trượt: t ∈ [0,1] → năm.
const REF_YEAR = 2030;
const MIN_AGO = 4;        // t = 1  → năm 2026
const MAX_AGO = 3302030;  // t = 0  → năm -3.300.000
const LOG_MIN = Math.log(MIN_AGO);
const LOG_MAX = Math.log(MAX_AGO);

export function tToYear(t) {
  const ago = Math.exp(LOG_MAX + (LOG_MIN - LOG_MAX) * t);
  return REF_YEAR - ago;
}

export function yearToT(year) {
  const ago = Math.min(Math.max(REF_YEAR - year, MIN_AGO), MAX_AGO);
  return (LOG_MAX - Math.log(ago)) / (LOG_MAX - LOG_MIN);
}

export function formatYear(year) {
  const y = Math.round(year);
  if (y <= -100000) {
    const ago = -y;
    if (ago >= 1e6) {
      const trieu = (ago / 1e6).toLocaleString('vi-VN', { maximumFractionDigits: 1 });
      return `${trieu} triệu năm trước`;
    }
    return `${(Math.round(ago / 1000) * 1000).toLocaleString('vi-VN')} năm trước`;
  }
  if (y < 0) {
    let v = -y;
    if (v > 20000) v = Math.round(v / 1000) * 1000;
    else if (v > 2000) v = Math.round(v / 10) * 10;
    return `${v.toLocaleString('vi-VN')} TCN`;
  }
  if (y < 1000) return `Năm ${y}`;
  return String(y);
}

const SLIDER_MAX = 10000;
const PLAY_DURATION_S = 75; // chạy hết thanh thời gian trong ~75 giây

export function initTimeline({ events, eras, onChange, onTickClick }) {
  const slider = document.getElementById('time-slider');
  const yearLabel = document.getElementById('year-label');
  const playBtn = document.getElementById('play-btn');
  const eraBox = document.getElementById('era-buttons');
  const ticksBox = document.getElementById('ticks');

  let t = 1;
  let playing = false;
  let lastFrame = 0;

  const ticks = events.map(ev => {
    const el = document.createElement('div');
    el.className = 'tick';
    el.style.left = `${ev.t * 100}%`;
    el.title = `${ev.title} — ${formatYear(ev.year)}`;
    el.addEventListener('click', () => {
      stopPlay();
      setT(ev.t + 0.0001);
      if (onTickClick) onTickClick(ev);
    });
    ticksBox.appendChild(el);
    return { el, t: ev.t };
  });

  const eraButtons = eras.map(era => {
    const btn = document.createElement('button');
    btn.textContent = era.label;
    btn.addEventListener('click', () => { stopPlay(); setT(yearToT(era.year)); });
    eraBox.appendChild(btn);
    return { btn, t: yearToT(era.year) };
  });

  function refreshUI() {
    slider.value = Math.round(t * SLIDER_MAX);
    yearLabel.textContent = formatYear(tToYear(t));
    const pct = (t * 100).toFixed(2);
    slider.style.setProperty(
      '--track-bg',
      `linear-gradient(to right, rgba(255,200,87,.85) ${pct}%, rgba(255,255,255,.14) ${pct}%)`
    );
    for (const tick of ticks) tick.el.classList.toggle('passed', tick.t <= t);
    // Nút thời đại "active" là mốc gần nhất phía sau con trỏ thời gian.
    let activeIdx = -1;
    eraButtons.forEach((b, i) => { if (b.t <= t + 0.0001) activeIdx = i; });
    eraButtons.forEach((b, i) => b.btn.classList.toggle('active', i === activeIdx));
  }

  function setT(next) {
    t = Math.min(Math.max(next, 0), 1);
    refreshUI();
    onChange(t);
  }

  function stopPlay() {
    playing = false;
    playBtn.textContent = '▶';
    playBtn.title = 'Phát dòng thời gian';
    playBtn.classList.remove('playing');
  }

  function startPlay() {
    if (t >= 0.9999) t = 0; // hết dòng thời gian thì phát lại từ đầu
    playing = true;
    lastFrame = performance.now();
    playBtn.textContent = '⏸';
    playBtn.title = 'Tạm dừng';
    playBtn.classList.add('playing');
    requestAnimationFrame(step);
  }

  function step(now) {
    if (!playing) return;
    const dt = (now - lastFrame) / 1000;
    lastFrame = now;
    setT(t + dt / PLAY_DURATION_S);
    if (t >= 1) { stopPlay(); return; }
    requestAnimationFrame(step);
  }

  playBtn.addEventListener('click', () => (playing ? stopPlay() : startPlay()));
  slider.addEventListener('input', () => { stopPlay(); setT(Number(slider.value) / SLIDER_MAX); });

  refreshUI();
  onChange(t);
  return { setT, getT: () => t, stopPlay };
}
