import { EVENTS, ERAS } from './data.js';
import { createGlobe } from './globe.js';
import { initTimeline, yearToT, formatYear } from './timeline.js';
import { initModal, openModal } from './modal.js';

const CLICK_DRAG_THRESHOLD_SQ = 36;

const events = EVENTS
  .map(ev => ({ ...ev, t: yearToT(ev.year) }))
  .sort((a, b) => a.year - b.year);

const container = document.getElementById('globe-container');
const counter = document.getElementById('counter');
const tooltip = document.getElementById('tooltip');

const globe = await createGlobe(container, events);
document.getElementById('loading').classList.add('fade');

initModal();
// Khai báo trước initTimeline vì onChange được gọi ngay khi khởi tạo.
let countryRows = [];
const timeline = initTimeline({
  events,
  eras: ERAS,
  onChange(t) {
    const happened = globe.setTime(t);
    counter.innerHTML = `<b>${happened}</b> / ${events.length} sự kiện`;
    refreshCountryListStates(t);
  },
  // Nhấn đốm sáng trên trục thời gian → camera bay tới nơi sự kiện xảy ra.
  onTickClick(ev) {
    globe.flyTo(ev.lat, ev.lon);
  }
});

// ----- Chọn quốc gia -----
const countrySelect = document.getElementById('country-select');
const countryEventsBox = document.getElementById('country-events');

const eventsByCountry = new Map();
for (const ev of events) {
  if (!eventsByCountry.has(ev.country)) eventsByCountry.set(ev.country, []);
  eventsByCountry.get(ev.country).push(ev);
}

const countries = [...eventsByCountry.entries()]
  .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], 'vi'));

countrySelect.append(new Option('🌍 Tất cả quốc gia', ''));
for (const [name, list] of countries) {
  countrySelect.append(new Option(`${name} (${list.length})`, name));
}

function refreshCountryListStates(t) {
  for (const row of countryRows) {
    row.el.classList.toggle('future', row.ev.t > t + 0.0001);
  }
}

function renderCountryList(country) {
  countryEventsBox.innerHTML = '';
  countryRows = [];
  if (!country) {
    countryEventsBox.classList.add('hidden');
    return;
  }
  for (const ev of eventsByCountry.get(country)) {
    const el = document.createElement('div');
    el.className = 'country-ev';
    el.innerHTML =
      `<span class="ev-year">${formatYear(ev.year)}</span>` +
      `<span class="ev-title">${ev.title}</span>`;
    el.title = 'Nhảy tới sự kiện này';
    el.addEventListener('click', () => {
      timeline.stopPlay();
      timeline.setT(ev.t + 0.0001);
      openModal(ev);
    });
    countryEventsBox.appendChild(el);
    countryRows.push({ el, ev });
  }
  countryEventsBox.classList.remove('hidden');
  refreshCountryListStates(timeline.getT());
}

countrySelect.addEventListener('change', () => {
  const country = countrySelect.value || null;
  globe.setCountry(country);
  renderCountryList(country);
  if (country) {
    const list = eventsByCountry.get(country);
    const lat = list.reduce((s, e) => s + e.lat, 0) / list.length;
    const lon = list.reduce((s, e) => s + e.lon, 0) / list.length;
    globe.flyTo(lat, lon);
  }
});

// ----- Hover: tooltip + con trỏ -----
const dom = globe.renderer.domElement;
dom.style.cursor = 'grab';

dom.addEventListener('pointermove', e => {
  const ev = globe.pick(e.clientX, e.clientY);
  if (ev) {
    dom.style.cursor = 'pointer';
    tooltip.classList.remove('hidden');
    tooltip.innerHTML =
      `<span class="tt-year">${formatYear(ev.year)}</span>${ev.title}`;
    tooltip.style.left = `${Math.min(e.clientX, window.innerWidth - 270)}px`;
    tooltip.style.top = `${e.clientY}px`;
  } else {
    dom.style.cursor = 'grab';
    tooltip.classList.add('hidden');
  }
});

// ----- Click (phân biệt với kéo xoay) -----
let downPos = null;
dom.addEventListener('pointerdown', e => { downPos = [e.clientX, e.clientY]; });
dom.addEventListener('pointerup', e => {
  if (!downPos) return;
  const dx = e.clientX - downPos[0];
  const dy = e.clientY - downPos[1];
  downPos = null;
  if (dx * dx + dy * dy > CLICK_DRAG_THRESHOLD_SQ) return; // là kéo xoay, không phải click
  const ev = globe.pick(e.clientX, e.clientY);
  if (ev) openModal(ev);
});

// ----- Vòng lặp render -----
function animate(now) {
  requestAnimationFrame(animate);
  globe.controls.update();
  globe.updatePulse(now / 1000);
  globe.renderer.render(globe.scene, globe.camera);
}
requestAnimationFrame(animate);
