/* =====================================================================
 * bienac — khởi tạo trang & bảng chọn hiệu ứng
 * ===================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
   * CẤU HÌNH — chỉnh các giá trị dưới đây cho đúng kênh của bạn
   * ------------------------------------------------------------------ */
  const CONFIG = {
    // Link kênh YouTube của bạn
    channelUrl: 'https://www.youtube.com/@bienac',
    // Danh sách video hiển thị ở mục "Video mới nhất".
    // Điền id = mã video YouTube (phần sau ?v= trong link) để hiện thumbnail thật.
    videos: [
      { id: '', title: 'Cực quang sinh ra như thế nào?',            tag: 'Vật lý' },
      { id: '', title: 'Vì sao đại dương có sóng?',                  tag: 'Tự nhiên' },
      { id: '', title: 'Tinh vân — vườn ươm của những vì sao',       tag: 'Vũ trụ' },
      { id: '', title: 'Ánh sáng của đom đóm: hóa học kỳ diệu',      tag: 'Sinh học' },
      { id: '', title: 'Lỗ đen có thực sự "đen"?',                   tag: 'Vũ trụ' },
      { id: '', title: 'Thời gian có trôi như nhau ở mọi nơi?',      tag: 'Vật lý' },
    ],
  };

  const EFFECT_KEY = 'bienac-effect';
  const DEFAULT_EFFECT = 'aurora';

  /* ----------------------------------------------- Hiệu ứng nền --- */
  const canvas = document.getElementById('fx-canvas');
  const engine = new window.BienacFX.FXEngine(canvas);

  const saved = localStorage.getItem(EFFECT_KEY);
  const initial = window.BienacFX.EFFECTS.includes(saved) ? saved : DEFAULT_EFFECT;

  const options = document.getElementById('fx-options');
  const buttons = options ? Array.from(options.querySelectorAll('button[data-effect]')) : [];

  function selectEffect(name, instant) {
    if (!window.BienacFX.EFFECTS.includes(name)) return;
    if (instant) {
      engine.current = engine.getProgram(name);
    } else {
      engine.setEffect(name);
    }
    localStorage.setItem(EFFECT_KEY, name);
    buttons.forEach((b) => b.classList.toggle('active', b.dataset.effect === name));
  }
  selectEffect(initial, true);

  buttons.forEach((b) => {
    b.addEventListener('click', () => selectEffect(b.dataset.effect, false));
  });

  // Phím tắt 1-4 đổi hiệu ứng
  window.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) return;
    const idx = parseInt(e.key, 10) - 1;
    if (idx >= 0 && idx < buttons.length) selectEffect(buttons[idx].dataset.effect, false);
  });

  // Thu gọn / mở bảng chọn
  const toggle = document.getElementById('fx-toggle');
  toggle.addEventListener('click', () => {
    const open = options.classList.toggle('collapsed') === false;
    toggle.setAttribute('aria-expanded', String(open));
  });

  /* ------------------------------------------------- Liên kết ----- */
  ['nav-subscribe', 'hero-subscribe', 'about-subscribe', 'more-videos'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = CONFIG.channelUrl + (id === 'more-videos' ? '/videos' : '?sub_confirmation=1');
  });

  /* ---------------------------------------------- Lưới video ------ */
  const grid = document.getElementById('video-grid');
  const PLACEHOLDER_GRADIENTS = [
    'linear-gradient(135deg, #04293f, #0b7a6e)',
    'linear-gradient(135deg, #061b3a, #1e4fa0)',
    'linear-gradient(135deg, #1b0b3a, #6e2bb0)',
    'linear-gradient(135deg, #052e2a, #19b89a)',
    'linear-gradient(135deg, #0a1030, #3a3ad0)',
    'linear-gradient(135deg, #2a0b30, #b03a8a)',
  ];

  CONFIG.videos.forEach((v, i) => {
    const a = document.createElement('a');
    a.className = 'video-card';
    a.target = '_blank';
    a.rel = 'noopener';
    a.href = v.id ? `https://www.youtube.com/watch?v=${v.id}` : CONFIG.channelUrl + '/videos';

    const thumb = document.createElement('div');
    thumb.className = 'video-thumb';
    if (v.id) {
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.alt = v.title;
      img.src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;
      thumb.appendChild(img);
    } else {
      thumb.style.background = PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length];
      thumb.innerHTML = '<span class="thumb-mark">▶</span>';
    }

    const meta = document.createElement('div');
    meta.className = 'video-meta';
    meta.innerHTML = `<span class="video-tag">${v.tag}</span><h3>${v.title}</h3>`;

    a.appendChild(thumb);
    a.appendChild(meta);
    grid.appendChild(a);
  });

  /* ----------------------------------------------------- Khác ----- */
  document.getElementById('year').textContent = new Date().getFullYear();

  // Header đổi nền khi cuộn
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Hiện dần các section khi cuộn tới
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        observer.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section, .video-card').forEach((el) => observer.observe(el));
})();
