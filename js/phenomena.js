/* =====================================================================
 * bienac — trang danh sách hiện tượng vật lý
 *
 * Liệt kê các hiện tượng (thiên nhiên & vật lý) dưới dạng thẻ. Nhấn một
 * thẻ sẽ chạy hiệu ứng WebGL tương ứng làm nền toàn màn hình
 * (thông qua window.bienacSelectEffect do js/main.js cung cấp).
 * ===================================================================== */
(function () {
  'use strict';

  const CATEGORIES = {
    nature: { label: 'Thiên nhiên & Vũ trụ', color: '#38d9a9' },
    physic: { label: 'Vật lý',                color: '#9775fa' },
  };

  // name phải trùng với khóa shader trong js/effects.js (BienacFX.EFFECTS)
  const PHENOMENA = [
    {
      name: 'aurora', icon: '🌌', label: 'Cực quang', cat: 'nature',
      color: '#5ef2c0', gradient: 'linear-gradient(135deg, #04293f, #0b7a6e)',
      desc: 'Những dải sáng xanh lục và tím uốn lượn trên bầu trời vùng cực — ' +
            'sinh ra khi các hạt mang điện từ Mặt Trời lao vào khí quyển Trái Đất.',
    },
    {
      name: 'waves', icon: '🌊', label: 'Sóng biển', cat: 'nature',
      color: '#4dabf7', gradient: 'linear-gradient(135deg, #061b3a, #1e4fa0)',
      desc: 'Năng lượng gió truyền qua mặt nước tạo nên những con sóng nhấp nhô ' +
            'không ngừng — dao động lan truyền chứ nước thì gần như đứng yên.',
    },
    {
      name: 'nebula', icon: '✨', label: 'Tinh vân', cat: 'nature',
      color: '#b08cff', gradient: 'linear-gradient(135deg, #1b0b3a, #6e2bb0)',
      desc: 'Những đám mây khí và bụi khổng lồ giữa các vì sao — cái nôi nơi ' +
            'lực hấp dẫn nén vật chất lại để thắp sáng những ngôi sao mới.',
    },
    {
      name: 'fireflies', icon: '🔆', label: 'Đom đóm', cat: 'nature',
      color: '#ffe066', gradient: 'linear-gradient(135deg, #052e2a, #19b89a)',
      desc: 'Ánh sáng lạnh phát ra từ phản ứng hóa học trong cơ thể đom đóm — ' +
            'hiện tượng phát quang sinh học gần như không tỏa nhiệt.',
    },
    {
      name: 'arc', icon: '⚡', label: 'Hồ quang điện', cat: 'physic',
      color: '#7fd4ff', gradient: 'linear-gradient(135deg, #0a1030, #3a3ad0)',
      desc: 'Dòng điện phóng qua không khí giữa hai điện cực, ion hóa chất khí ' +
            'thành luồng plasma sáng rực và nóng tới hàng nghìn độ.',
    },
    {
      name: 'lightning', icon: '🌩️', label: 'Sấm sét', cat: 'physic',
      color: '#cbe3ff', gradient: 'linear-gradient(135deg, #050a1f, #243a6a)',
      desc: 'Tia lửa điện khổng lồ phóng giữa đám mây và mặt đất khi điện tích ' +
            'tích tụ đủ lớn để đánh thủng lớp không khí cách điện.',
    },
    {
      name: 'polarized', icon: '🌈', label: 'Tia phân cực', cat: 'physic',
      color: '#ff8fd0', gradient: 'linear-gradient(135deg, #2a0b30, #b03a8a)',
      desc: 'Ánh sáng chỉ dao động theo một phương xác định — nền tảng của kính ' +
            'phân cực, kính chống lóa và màn hình tinh thể lỏng (LCD).',
    },
    {
      name: 'interference', icon: '〰️', label: 'Giao thoa sóng', cat: 'physic',
      color: '#7af0e0', gradient: 'linear-gradient(135deg, #04293f, #2b8a8a)',
      desc: 'Hai sóng gặp nhau, chỗ tăng cường chỗ triệt tiêu, tạo nên các vân ' +
            'sáng tối xen kẽ — bằng chứng kinh điển cho bản chất sóng của ánh sáng.',
    },
  ];

  const grid = document.getElementById('ph-grid');
  const legend = document.getElementById('ph-legend');
  if (!grid) return;

  const hasFX = !!(window.BienacFX && window.BienacFX.EFFECTS);
  const EFFECT_KEY = 'bienac-effect';

  /* ----------------------------------------------------- Chú giải -- */
  Object.keys(CATEGORIES).forEach((key) => {
    const chip = document.createElement('span');
    chip.className = 'ph-chip';
    chip.style.setProperty('--c', CATEGORIES[key].color);
    chip.textContent = CATEGORIES[key].label;
    legend.appendChild(chip);
  });

  /* -------------------------------------------------- Render thẻ -- */
  const cards = [];

  PHENOMENA.forEach((ph) => {
    const card = document.createElement('button');
    card.className = 'ph-card';
    card.dataset.effect = ph.name;
    card.style.setProperty('--c', ph.color);
    card.setAttribute('aria-pressed', 'false');

    const preview = document.createElement('span');
    preview.className = 'ph-preview';
    preview.style.background = ph.gradient;
    preview.innerHTML = `<span class="ph-icon">${ph.icon}</span>`;

    const body = document.createElement('span');
    body.className = 'ph-body';
    body.innerHTML =
      `<span class="ph-tag" style="--c:${CATEGORIES[ph.cat].color}">${CATEGORIES[ph.cat].label}</span>` +
      `<span class="ph-name">${ph.label}</span>` +
      `<span class="ph-desc">${ph.desc}</span>` +
      `<span class="ph-cta">▶ Xem hiện tượng</span>`;

    card.append(preview, body);
    card.addEventListener('click', () => view(ph));
    grid.appendChild(card);
    cards.push(card);
  });

  /* ----------------------------------- Chạy hiệu ứng làm nền -- */
  const nowEl = document.getElementById('ph-now');
  const nowName = document.getElementById('ph-now-name');

  function view(ph) {
    if (hasFX && window.bienacSelectEffect) {
      window.bienacSelectEffect(ph.name);
    }
    markActive(ph.name);
    if (nowEl && nowName) {
      nowName.textContent = `${ph.icon} ${ph.label}`;
      nowEl.classList.add('show');
    }
  }

  function markActive(name) {
    cards.forEach((c) => {
      const on = c.dataset.effect === name;
      c.classList.toggle('active', on);
      c.setAttribute('aria-pressed', String(on));
    });
  }

  // Đánh dấu hiệu ứng đang chạy (lấy từ localStorage do main.js lưu)
  const current = localStorage.getItem(EFFECT_KEY);
  if (current) markActive(current);
})();
