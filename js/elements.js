/* =====================================================================
 * bienac — Bảng tuần hoàn với hiệu ứng đặc trưng từng nguyên tố
 *
 * - Dữ liệu 118 nguyên tố (ký hiệu, tên, nhóm) + vị trí lưới tự tính.
 * - Engine hạt 2D canvas: flame / explosion / glow / sparks / gas /
 *   frost / radioactive / shimmer / liquid / electric.
 * - Màu lửa lấy theo phản ứng thử màu ngọn lửa thật (Li đỏ thẫm,
 *   Na vàng, K tím nhạt, Cu xanh lục, Ba lục nhạt, ...).
 * ===================================================================== */
(function () {
  'use strict';

  /* ----------------------------------------------------- Dữ liệu --- */
  const SYMBOLS = ('H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn ' +
    'Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd ' +
    'Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th ' +
    'Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og').split(' ');

  const NAMES = ('Hydro,Heli,Lithi,Beryli,Bo,Carbon,Nitơ,Oxy,Fluor,Neon,Natri,Magie,Nhôm,Silic,Phosphor,' +
    'Lưu huỳnh,Clo,Argon,Kali,Calci,Scandi,Titan,Vanadi,Crom,Mangan,Sắt,Cobalt,Nickel,Đồng,Kẽm,' +
    'Gali,Germani,Asen,Selen,Brom,Krypton,Rubidi,Stronti,Yttri,Zirconi,Niobi,Molypden,Techneti,' +
    'Rutheni,Rhodi,Paladi,Bạc,Cadmi,Indi,Thiếc,Antimon,Telu,Iod,Xenon,Caesi,Bari,Lantan,Ceri,' +
    'Praseodym,Neodym,Promethi,Samari,Europi,Gadolini,Terbi,Dysprosi,Holmi,Erbi,Thuli,Ytterbi,' +
    'Luteti,Hafni,Tantal,Wolfram,Rheni,Osmi,Iridi,Platin,Vàng,Thủy ngân,Tali,Chì,Bismuth,Poloni,' +
    'Astatin,Radon,Franci,Radi,Actini,Thori,Protactini,Urani,Neptuni,Plutoni,Americi,Curi,Berkeli,' +
    'Californi,Einsteini,Fermi,Mendelevi,Nobeli,Lawrenci,Rutherfordi,Dubni,Seaborgi,Bohri,Hassi,' +
    'Meitneri,Darmstadti,Roentgeni,Copernici,Nihoni,Flerovi,Moscovi,Livermori,Tennessin,Oganesson').split(',');

  const CATEGORIES = {
    alkali:     { label: 'Kim loại kiềm',      color: '#ff6b6b' },
    alkaline:   { label: 'Kim loại kiềm thổ',  color: '#ffa94d' },
    transition: { label: 'Kim loại chuyển tiếp', color: '#f7c948' },
    post:       { label: 'Kim loại yếu',       color: '#69db7c' },
    metalloid:  { label: 'Á kim',              color: '#38d9a9' },
    nonmetal:   { label: 'Phi kim',            color: '#4dabf7' },
    halogen:    { label: 'Halogen',            color: '#9775fa' },
    noble:      { label: 'Khí hiếm',           color: '#da77f2' },
    lanthanide: { label: 'Họ Lantan',          color: '#66d9e8' },
    actinide:   { label: 'Họ Actini',          color: '#ff8787' },
  };

  function categoryOf(z) {
    if ([3, 11, 19, 37, 55, 87].includes(z)) return 'alkali';
    if ([4, 12, 20, 38, 56, 88].includes(z)) return 'alkaline';
    if (z >= 57 && z <= 71) return 'lanthanide';
    if (z >= 89 && z <= 103) return 'actinide';
    if ((z >= 21 && z <= 30) || (z >= 39 && z <= 48) || (z >= 72 && z <= 80) || (z >= 104 && z <= 112)) return 'transition';
    if ([13, 31, 49, 50, 81, 82, 83, 84, 113, 114, 115, 116].includes(z)) return 'post';
    if ([5, 14, 32, 33, 51, 52].includes(z)) return 'metalloid';
    if ([1, 6, 7, 8, 15, 16, 34].includes(z)) return 'nonmetal';
    if ([9, 17, 35, 53, 85, 117].includes(z)) return 'halogen';
    return 'noble'; // 2, 10, 18, 36, 54, 86, 118
  }

  // Vị trí [cột, hàng] trong lưới 18 cột (hàng 9-10 là khối f)
  function gridPos(z) {
    if (z === 1) return [1, 1];
    if (z === 2) return [18, 1];
    if (z <= 10) return [z <= 4 ? z - 2 : z + 8, 2];
    if (z <= 18) return [z <= 12 ? z - 10 : z, 3];
    if (z <= 36) return [z - 18, 4];
    if (z <= 54) return [z - 36, 5];
    if (z <= 56) return [z - 54, 6];
    if (z <= 71) return [z - 54, 9];          // lanthanide
    if (z <= 86) return [z - 68, 6];
    if (z <= 88) return [z - 86, 7];
    if (z <= 103) return [z - 86, 10];        // actinide
    return [z - 100, 7];
  }

  /* Hiệu ứng mặc định theo nhóm + mô tả */
  const CATEGORY_FX = {
    alkali:     { type: 'explosion', color: '#ff6b6b', desc: 'Kim loại kiềm — phản ứng dữ dội với nước, có thể phát nổ.' },
    alkaline:   { type: 'flame', color: '#ffa94d', desc: 'Kim loại kiềm thổ — cháy với ngọn lửa màu đặc trưng.' },
    transition: { type: 'sparks', color: '#ffd9a0', desc: 'Kim loại chuyển tiếp — tia lửa kim loại rực sáng.' },
    post:       { type: 'sparks', color: '#9be8c8', desc: 'Kim loại yếu — tia lửa dịu, dễ nóng chảy.' },
    metalloid:  { type: 'electric', color: '#8ecbff', desc: 'Á kim — chất bán dẫn, dòng điện lập lòe.' },
    nonmetal:   { type: 'gas', color: '#4dabf7', desc: 'Phi kim.' },
    halogen:    { type: 'gas', color: '#9775fa', desc: 'Halogen — hơi khí màu đặc trưng, hoạt động mạnh.' },
    noble:      { type: 'glow', color: '#da77f2', desc: 'Khí hiếm — phát sáng rực rỡ trong ống phóng điện.' },
    lanthanide: { type: 'shimmer', color: '#9ff3e3', desc: 'Đất hiếm — lấp lánh trong vật liệu phát quang và nam châm.' },
    actinide:   { type: 'radioactive', color: '#58ff9b', desc: 'Nguyên tố phóng xạ — phát tia bức xạ liên tục.' },
  };

  /* Ghi đè cho các nguyên tố nổi bật (màu thử lửa, tính chất thật) */
  const FX_OVERRIDES = {
    1:  { type: 'explosion', color: '#9bd1ff', desc: 'Khí hydro nổ "bụp" khi gặp lửa — phản ứng tạo thành nước.' },
    2:  { type: 'glow', color: '#ffd9a0', desc: 'Heli phát ánh cam đào trong ống phóng điện — khí của Mặt Trời.' },
    3:  { type: 'explosion', color: '#ff4040', desc: 'Lithi cháy với ngọn lửa đỏ thẫm — màu thử lửa đặc trưng.' },
    5:  { type: 'flame', color: '#7dff6b', desc: 'Bo cháy với ngọn lửa xanh lục rực rỡ.' },
    6:  { type: 'shimmer', color: '#cfe9ff', desc: 'Carbon — từ than đen đến kim cương lấp lánh nghìn tia sáng.' },
    7:  { type: 'frost', color: '#9fd8ff', desc: 'Nitơ lỏng −196°C — sương giá và băng tinh thể tỏa khói lạnh.' },
    8:  { type: 'flame', color: '#66a3ff', desc: 'Oxy khiến mọi ngọn lửa bùng cháy mãnh liệt hơn.' },
    9:  { type: 'gas', color: '#ffe066', desc: 'Fluor — khí vàng nhạt, phi kim hoạt động mạnh nhất.' },
    10: { type: 'glow', color: '#ff5e3a', desc: 'Neon phát ánh đỏ cam — linh hồn của những biển hiệu đêm.' },
    11: { type: 'explosion', color: '#ffc400', desc: 'Natri nổ trên mặt nước, ngọn lửa vàng rực đặc trưng.' },
    12: { type: 'explosion', color: '#ffffff', desc: 'Magie cháy với ánh sáng trắng chói lòa — từng dùng làm đèn flash.' },
    15: { type: 'flame', color: '#fff3b0', desc: 'Phosphor trắng tự bốc cháy trong không khí, phát quang trong đêm.' },
    16: { type: 'flame', color: '#4f7bff', desc: 'Lưu huỳnh cháy với ngọn lửa xanh lam ma mị.' },
    17: { type: 'gas', color: '#b8e23d', desc: 'Clo — khí vàng lục, mùi hắc, dùng khử trùng nước.' },
    18: { type: 'glow', color: '#b18cff', desc: 'Argon phát ánh tím hoa cà trong ống phóng điện.' },
    19: { type: 'explosion', color: '#c77dff', desc: 'Kali nổ tức thì khi chạm nước, ngọn lửa tím nhạt đặc trưng.' },
    20: { type: 'flame', color: '#ff6b35', desc: 'Calci cháy với ngọn lửa đỏ gạch.' },
    22: { type: 'sparks', color: '#eaf6ff', desc: 'Titan — tia lửa trắng sáng chói, kim loại của hàng không vũ trụ.' },
    26: { type: 'sparks', color: '#ffae42', desc: 'Sắt — chùm tia lửa cam rực như pháo hoa que hàn.' },
    29: { type: 'flame', color: '#00e5a0', desc: 'Đồng nhuộm ngọn lửa thành xanh lục-lam — màu của pháo hoa xanh.' },
    30: { type: 'flame', color: '#9be8c8', desc: 'Kẽm cháy với ngọn lửa xanh lục nhạt ánh trắng.' },
    35: { type: 'gas', color: '#c4622a', desc: 'Brom — chất lỏng nâu đỏ bốc hơi thành khói màu cam nâu.' },
    36: { type: 'glow', color: '#cfe9ff', desc: 'Krypton phát ánh trắng xanh lạnh trong ống phóng điện.' },
    37: { type: 'explosion', color: '#ff5e8a', desc: 'Rubidi nổ mạnh hơn cả Kali, ngọn lửa đỏ tím.' },
    38: { type: 'flame', color: '#ff2447', desc: 'Stronti — ngọn lửa đỏ thắm, màu đỏ của pháo hoa.' },
    43: { type: 'radioactive', color: '#58ff9b', desc: 'Techneti — nguyên tố nhân tạo đầu tiên, phóng xạ.' },
    47: { type: 'shimmer', color: '#e6f1ff', desc: 'Bạc — ánh kim lấp lánh trắng sáng nhất trong các kim loại.' },
    53: { type: 'gas', color: '#9a6bff', desc: 'Iod thăng hoa thành làn hơi tím huyền ảo.' },
    54: { type: 'glow', color: '#6ea8ff', desc: 'Xenon phát ánh xanh lam — đèn pha siêu sáng và động cơ ion.' },
    55: { type: 'explosion', color: '#8a7dff', desc: 'Caesi — kim loại kiềm nổ dữ dội nhất, ngọn lửa xanh tím.' },
    56: { type: 'flame', color: '#aaff55', desc: 'Bari nhuộm ngọn lửa thành xanh lục nhạt — pháo hoa xanh lá.' },
    61: { type: 'radioactive', color: '#58ff9b', desc: 'Promethi — đất hiếm phóng xạ, từng dùng làm sơn dạ quang.' },
    63: { type: 'shimmer', color: '#ff5e7a', desc: 'Europi — chất phát quang đỏ trong màn hình và tờ tiền Euro.' },
    74: { type: 'sparks', color: '#fff6e0', desc: 'Wolfram — kim loại chịu nhiệt nhất, dây tóc bóng đèn trắng rực.' },
    78: { type: 'shimmer', color: '#e8e8f0', desc: 'Platin — ánh kim trắng bạc quý giá, gần như không bao giờ xỉn.' },
    79: { type: 'shimmer', color: '#ffd700', desc: 'Vàng — ánh kim vàng rực không bao giờ phai.' },
    80: { type: 'liquid', color: '#d8dee6', desc: 'Thủy ngân — kim loại lỏng duy nhất, những giọt bạc lăn tròn.' },
    83: { type: 'shimmer', color: '#a1c4ff', desc: 'Bismuth — tinh thể bậc thang óng ánh bảy sắc cầu vồng.' },
    84: { type: 'radioactive', color: '#58ff9b', desc: 'Poloni — phóng xạ cực mạnh, do Marie Curie tìm ra.' },
    85: { type: 'radioactive', color: '#58ff9b', desc: 'Astatin — halogen hiếm nhất Trái Đất, phóng xạ.' },
    86: { type: 'radioactive', color: '#58ff9b', desc: 'Radon — khí hiếm phóng xạ, không màu không mùi.' },
    87: { type: 'radioactive', color: '#ff7b7b', desc: 'Franci — kim loại kiềm phóng xạ, hiếm bậc nhất tự nhiên.' },
    88: { type: 'radioactive', color: '#7bffd0', desc: 'Radi — phát quang xanh trong bóng tối, do Marie Curie tìm ra.' },
    92: { type: 'radioactive', color: '#58ff9b', desc: 'Urani — nhiên liệu của nhà máy điện hạt nhân.' },
    94: { type: 'radioactive', color: '#58ff9b', desc: 'Plutoni — nguyên tố của bom nguyên tử và tàu vũ trụ.' },
    117: { type: 'radioactive', color: '#bd8aff', desc: 'Tennessin — halogen siêu nặng nhân tạo, tồn tại tích tắc.' },
    118: { type: 'radioactive', color: '#e08aff', desc: 'Oganesson — nguyên tố nặng nhất từng được tạo ra.' },
  };

  function elementOf(z) {
    const cat = categoryOf(z);
    const fx = Object.assign({}, CATEGORY_FX[cat], FX_OVERRIDES[z] || {});
    const [col, row] = gridPos(z);
    return { z, symbol: SYMBOLS[z - 1], name: NAMES[z - 1], cat, fx, col, row };
  }
  const ELEMENTS = [];
  for (let z = 1; z <= 118; z++) ELEMENTS.push(elementOf(z));

  /* ------------------------------------------------ Render bảng --- */
  const grid = document.getElementById('pt-grid');
  const legend = document.getElementById('pt-legend');
  if (!grid) return;

  Object.keys(CATEGORIES).forEach((key) => {
    const chip = document.createElement('span');
    chip.className = 'pt-chip';
    chip.style.setProperty('--c', CATEGORIES[key].color);
    chip.textContent = CATEGORIES[key].label;
    legend.appendChild(chip);
  });

  // Ô đánh dấu vị trí khối f trong bảng chính
  [['57–71', 3, 6], ['89–103', 3, 7]].forEach(([text, col, row]) => {
    const mark = document.createElement('div');
    mark.className = 'pt-fmark';
    mark.textContent = text;
    mark.style.gridColumn = col;
    mark.style.gridRow = row;
    grid.appendChild(mark);
  });

  ELEMENTS.forEach((el) => {
    const b = document.createElement('button');
    b.className = 'pt-el';
    b.style.gridColumn = el.col;
    b.style.gridRow = el.row;
    b.style.setProperty('--c', CATEGORIES[el.cat].color);
    b.title = `${el.z} · ${el.name}`;
    b.innerHTML = `<span class="pt-num">${el.z}</span><span class="pt-sym">${el.symbol}</span>`;
    b.addEventListener('click', () => openModal(el));
    grid.appendChild(b);
  });

  /* ------------------------------------------------------ Modal --- */
  const modal = document.getElementById('el-modal');
  const canvas = document.getElementById('el-canvas');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = null;

  function openModal(el) {
    current = el;
    document.getElementById('el-symbol').textContent = el.symbol;
    document.getElementById('el-name').textContent = el.name;
    document.getElementById('el-number').textContent = `Số hiệu ${el.z}`;
    document.getElementById('el-category').textContent = CATEGORIES[el.cat].label;
    document.getElementById('el-desc').textContent = el.fx.desc;
    modal.style.setProperty('--el-color', el.fx.color);
    modal.style.setProperty('--el-cat', CATEGORIES[el.cat].color);
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    fx.play(el.fx);
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    fx.stop();
  }
  document.getElementById('el-close').addEventListener('click', closeModal);
  document.getElementById('el-backdrop').addEventListener('click', closeModal);
  document.getElementById('el-replay').addEventListener('click', () => current && fx.play(current.fx));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  /* =================================================================
   * ENGINE HIỆU ỨNG HẠT (2D canvas, blend cộng sáng)
   * ================================================================= */
  function hexRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgba(hex, a) {
    const [r, g, b] = hexRgb(hex);
    return `rgba(${r},${g},${b},${a})`;
  }
  const rand = (a, b) => a + Math.random() * (b - a);

  const fx = (function () {
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, raf = null, last = 0, t = 0;
    let def = null, parts = [], blobs = [], bolts = [], drops = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      W = canvas.width = Math.round(rect.width * dpr);
      H = canvas.height = Math.round(rect.height * dpr);
    }
    window.addEventListener('resize', () => { if (!modal.hidden) resize(); });

    /* ---------------- spawn theo từng loại hiệu ứng ---------------- */
    function spawnFlame(n, cx, baseY, spread) {
      for (let i = 0; i < n; i++) {
        parts.push({
          x: cx + rand(-spread, spread), y: baseY + rand(-6, 6),
          vx: rand(-22, 22) + Math.sin(t * 2.2) * 14, vy: rand(-150, -60),
          life: rand(0.6, 1.3), age: 0, r: rand(5, 13) * (W / 640), kind: 'flame',
        });
      }
    }
    function spawnBurst(cx, cy) {
      for (let i = 0; i < 130; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = rand(60, 420) * (W / 640);
        parts.push({
          x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          life: rand(0.5, 1.4), age: 0, r: rand(1.5, 4) * (W / 640), kind: 'ember',
        });
      }
    }
    function spawnSpark(cx, baseY) {
      const a = -Math.PI / 2 + rand(-0.65, 0.65);
      const sp = rand(220, 460) * (H / 320);
      parts.push({
        x: cx + rand(-8, 8), y: baseY, px: cx, py: baseY,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        life: rand(0.5, 1.1), age: 0, r: rand(0.8, 1.8), kind: 'spark',
      });
    }
    function spawnGasBlob() {
      blobs.push({
        x: W / 2 + rand(-W * 0.22, W * 0.22), y: H + 30,
        vy: rand(-48, -22), r: rand(18, 42) * (W / 640), grow: rand(14, 30),
        life: rand(2.4, 4), age: 0, ph: Math.random() * Math.PI * 2,
      });
    }
    function spawnFlake() {
      parts.push({
        x: rand(0, W), y: -10, vx: 0, vy: rand(26, 70) * (H / 320),
        life: 99, age: 0, r: rand(2, 5) * (W / 640), kind: 'flake',
        ph: Math.random() * Math.PI * 2, rot: Math.random() * Math.PI,
      });
    }
    function spawnRay(cx, cy) {
      const a = Math.random() * Math.PI * 2;
      const sp = rand(280, 520) * (W / 640);
      parts.push({
        x: cx, y: cy, px: cx, py: cy,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        life: rand(0.35, 0.7), age: 0, r: 1, kind: 'ray',
      });
    }
    function spawnTwinkle() {
      parts.push({
        x: rand(W * 0.08, W * 0.92), y: rand(H * 0.08, H * 0.85),
        vx: 0, vy: rand(4, 14), life: rand(0.5, 1.2), age: 0,
        r: rand(3, 11) * (W / 640), kind: 'twinkle', rot: Math.random() * Math.PI,
      });
    }
    function spawnDrop() {
      drops.push({
        x: rand(W * 0.2, W * 0.8), y: -16, vx: rand(-12, 12), vy: 0,
        r: rand(7, 15) * (W / 640), rest: 0,
      });
    }
    function spawnBolt() {
      const x0 = rand(W * 0.2, W * 0.8);
      const x1 = x0 + rand(-W * 0.18, W * 0.18);
      const pts = [[x0, 0]];
      const steps = 9;
      for (let i = 1; i <= steps; i++) {
        const yy = (H - 26) * (i / steps);
        const xx = x0 + (x1 - x0) * (i / steps) + rand(-W * 0.05, W * 0.05);
        pts.push([xx, yy]);
      }
      bolts.push({ pts, life: 0.2, age: 0 });
      for (let i = 0; i < 8; i++) spawnSpark(pts[steps][0], H - 26);
    }

    /* ----------------------------- vòng đời 1 hiệu ứng ------------- */
    let acc = 0, flash = 0, ring = null;

    function start(d) {
      def = d; t = 0; acc = 0; flash = 0; ring = null;
      parts = []; blobs = []; bolts = []; drops = [];
      resize();
      ctx.fillStyle = '#05080f';
      ctx.fillRect(0, 0, W, H);

      if (reduceMotion) { drawStatic(); return; }

      if (def.type === 'explosion') {
        flash = 1;
        ring = { r: 8, a: 0.9 };
        spawnBurst(W / 2, H * 0.52);
      }
      if (def.type === 'frost') for (let i = 0; i < 26; i++) { spawnFlake(); parts[parts.length - 1].y = rand(0, H); }
      if (def.type === 'liquid') for (let i = 0; i < 5; i++) { spawnDrop(); drops[drops.length - 1].y = rand(-H, 0); }

      if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
    }

    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }

    // Bản tĩnh cho người dùng bật "giảm chuyển động"
    function drawStatic() {
      const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.min(W, H) * 0.55);
      g.addColorStop(0, rgba(def.color, 0.85));
      g.addColorStop(0.5, rgba(def.color, 0.25));
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    function update(dt) {
      t += dt; acc += dt;
      const type = def.type;
      const cx = W / 2, baseY = H - 18 * (H / 320);

      if (type === 'flame') spawnFlame(Math.round(120 * dt) + 2, cx, baseY, W * 0.07);
      if (type === 'explosion') {
        flash = Math.max(0, flash - dt * 3.2);
        if (ring) { ring.r += dt * 620 * (W / 640); ring.a -= dt * 1.6; if (ring.a <= 0) ring = null; }
        // sau tiếng nổ, ngọn lửa màu tiếp tục cháy ở tâm
        if (t > 0.25) spawnFlame(Math.round(80 * dt) + 1, cx, H * 0.62, W * 0.05);
      }
      if (type === 'sparks') for (let i = 0; i < 3; i++) spawnSpark(cx, baseY);
      if (type === 'gas' && acc > 0.1) { acc = 0; spawnGasBlob(); }
      if (type === 'frost' && acc > 0.08) { acc = 0; spawnFlake(); }
      if (type === 'glow' && acc > rand(0.4, 0.9)) { acc = 0; for (let i = 0; i < 5; i++) spawnRay(cx, H * 0.45); }
      if (type === 'radioactive') {
        if (acc > 0.05) { acc = 0; spawnRay(cx, H * 0.5); }
      }
      if (type === 'shimmer' && acc > 0.05) { acc = 0; spawnTwinkle(); spawnTwinkle(); }
      if (type === 'liquid' && acc > 0.55 && drops.length < 16) { acc = 0; spawnDrop(); }
      if (type === 'electric' && acc > rand(0.16, 0.45)) { acc = 0; spawnBolt(); }

      // Hạt
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.age += dt;
        if (p.kind === 'spark' || p.kind === 'ray') { p.px = p.x; p.py = p.y; }
        if (p.kind === 'ember' || p.kind === 'spark') p.vy += 420 * dt * (H / 320);
        if (p.kind === 'ember') { p.vx *= 1 - 1.6 * dt; p.vy *= 1 - 0.6 * dt; }
        if (p.kind === 'flame') p.vx += Math.sin(t * 3 + p.y * 0.04) * 30 * dt;
        if (p.kind === 'flake') p.x += Math.sin(t * 1.4 + p.ph) * 28 * dt;
        p.x += p.vx * dt; p.y += p.vy * dt;
        const out = p.x < -30 || p.x > W + 30 || p.y > H + 30 || p.y < -40;
        if (p.age > p.life || (p.kind !== 'flake' && out) || (p.kind === 'flake' && p.y > H + 10)) parts.splice(i, 1);
      }
      // Khói
      for (let i = blobs.length - 1; i >= 0; i--) {
        const b = blobs[i];
        b.age += dt; b.y += b.vy * dt; b.r += b.grow * dt;
        b.x += Math.sin(t * 0.8 + b.ph) * 16 * dt;
        if (b.age > b.life) blobs.splice(i, 1);
      }
      // Sét
      for (let i = bolts.length - 1; i >= 0; i--) {
        bolts[i].age += dt;
        if (bolts[i].age > bolts[i].life) bolts.splice(i, 1);
      }
      // Giọt thủy ngân
      const floor = H - 14 * (H / 320);
      for (const d of drops) {
        if (d.rest > 0) { d.rest += dt; continue; }
        d.vy += 560 * dt * (H / 320);
        d.x += d.vx * dt; d.y += d.vy * dt;
        if (d.y + d.r > floor) {
          d.y = floor - d.r;
          d.vy *= -0.42; d.vx += rand(-20, 20);
          if (Math.abs(d.vy) < 26) { d.vy = 0; d.vx = 0; d.rest = 0.001; }
        }
        if (d.x < d.r) { d.x = d.r; d.vx *= -0.6; }
        if (d.x > W - d.r) { d.x = W - d.r; d.vx *= -0.6; }
      }
      for (let i = drops.length - 1; i >= 0; i--) if (drops[i].rest > 7) drops.splice(i, 1);
    }

    function draw() {
      const color = def.color;
      // vệt mờ dần tạo đuôi chuyển động
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(5,8,15,0.3)';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      const cx = W / 2;

      if (def.type === 'flame' || def.type === 'explosion') {
        // quầng sáng ở chân ngọn lửa
        const gy = def.type === 'flame' ? H - 10 : H * 0.62;
        const g = ctx.createRadialGradient(cx, gy, 0, cx, gy, W * 0.22);
        g.addColorStop(0, rgba(color, 0.5));
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
      if (def.type === 'glow' || def.type === 'radioactive') {
        const gy = def.type === 'glow' ? H * 0.45 : H * 0.5;
        const pulse = def.type === 'radioactive'
          ? 0.75 + Math.random() * 0.25
          : 0.8 + 0.2 * Math.sin(t * 2.4);
        const R = Math.min(W, H) * 0.3 * pulse;
        const g = ctx.createRadialGradient(cx, gy, 0, cx, gy, R);
        g.addColorStop(0, 'rgba(255,255,255,0.9)');
        g.addColorStop(0.25, rgba(color, 0.85));
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, gy, R, 0, Math.PI * 2);
        ctx.fill();
        if (def.type === 'glow') {
          // vòng hào quang quay quanh quả cầu sáng
          for (let i = 0; i < 14; i++) {
            const a = t * 0.9 + (i / 14) * Math.PI * 2;
            const rr = Math.min(W, H) * 0.36;
            ctx.fillStyle = rgba(color, 0.5);
            ctx.beginPath();
            ctx.arc(cx + Math.cos(a) * rr, gy + Math.sin(a) * rr * 0.55, 2.2 * (W / 640), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      if (def.type === 'frost') {
        const g = ctx.createLinearGradient(0, H, 0, H * 0.45);
        g.addColorStop(0, rgba(color, 0.22 + 0.05 * Math.sin(t * 1.3)));
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
      if (flash > 0) {
        const g = ctx.createRadialGradient(cx, H * 0.52, 0, cx, H * 0.52, W * 0.6);
        g.addColorStop(0, `rgba(255,255,255,${flash})`);
        g.addColorStop(0.4, rgba(def.color, flash * 0.8));
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
      if (ring) {
        ctx.strokeStyle = rgba(def.color, Math.max(ring.a, 0));
        ctx.lineWidth = 3 * (W / 640);
        ctx.beginPath();
        ctx.arc(cx, H * 0.52, ring.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (const b of blobs) {
        const a = Math.sin(Math.PI * Math.min(b.age / b.life, 1)) * 0.16;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, rgba(color, a));
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of parts) {
        const k = 1 - p.age / p.life;
        if (p.kind === 'flame') {
          const r = p.r * k;
          if (r < 0.4) continue;
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.4);
          g.addColorStop(0, `rgba(255,255,255,${0.55 * k})`);
          g.addColorStop(0.35, rgba(color, 0.5 * k));
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 2.4, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === 'ember') {
          ctx.fillStyle = rgba(color, 0.9 * k);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * k + 0.4, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === 'spark' || p.kind === 'ray') {
          ctx.strokeStyle = p.kind === 'ray' ? rgba(color, 0.85 * k) : `rgba(255,255,255,${0.85 * k})`;
          ctx.lineWidth = p.kind === 'ray' ? 1.4 : 1.6;
          ctx.beginPath();
          ctx.moveTo(p.px, p.py);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          if (p.kind === 'spark') {
            ctx.fillStyle = rgba(color, 0.8 * k);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (p.kind === 'flake' || p.kind === 'twinkle') {
          const a = p.kind === 'twinkle' ? Math.sin(Math.PI * (p.age / p.life)) : 0.8;
          const arms = p.kind === 'flake' ? 6 : 4;
          ctx.strokeStyle = p.kind === 'twinkle' ? rgba(color, a) : rgba(color, 0.7);
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          for (let i = 0; i < arms; i++) {
            const a2 = p.rot + (i / arms) * Math.PI * 2;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + Math.cos(a2) * p.r, p.y + Math.sin(a2) * p.r);
          }
          ctx.stroke();
          if (p.kind === 'twinkle') {
            ctx.fillStyle = `rgba(255,255,255,${a})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      for (const bolt of bolts) {
        const a = 1 - bolt.age / bolt.life;
        ctx.strokeStyle = rgba(color, 0.5 * a);
        ctx.lineWidth = 5;
        strokePath(bolt.pts);
        ctx.strokeStyle = `rgba(255,255,255,${0.9 * a})`;
        ctx.lineWidth = 1.6;
        strokePath(bolt.pts);
      }

      // Thủy ngân vẽ phủ thường (không cộng sáng) cho chất kim loại đặc
      if (drops.length) {
        ctx.globalCompositeOperation = 'source-over';
        const floor = H - 14 * (H / 320);
        ctx.fillStyle = 'rgba(160,170,185,0.12)';
        ctx.fillRect(0, floor, W, H - floor);
        for (const d of drops) {
          const squash = d.rest > 0 ? 0.62 : 1;
          const g = ctx.createRadialGradient(d.x - d.r * 0.35, d.y - d.r * 0.45, d.r * 0.1, d.x, d.y, d.r * 1.1);
          g.addColorStop(0, '#ffffff');
          g.addColorStop(0.35, def.color);
          g.addColorStop(1, '#3c4654');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.ellipse(d.x, d.y + (1 - squash) * d.r, d.r * (2 - squash), d.r * squash, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function strokePath(pts) {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
    }

    function loop(ts) {
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      if (!modal.hidden && W) {
        update(dt);
        draw();
      }
      raf = requestAnimationFrame(loop);
    }

    return { play: start, stop };
  })();
})();
