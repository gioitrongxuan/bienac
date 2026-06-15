/* =====================================================================
 * bienac — nội dung text đọc từ data/content.json
 *
 * Mục đích: cho phép sửa mọi tiêu đề / slogan / đoạn text của website
 * mà KHÔNG cần đụng vào HTML hay JS. Chỉ cần sửa data/content.json.
 *
 * Cú pháp trong content.json (markdown rút gọn):
 *   **chữ**  → in đậm
 *   *chữ*    → tô màu nhấn (accent)
 *   {year}   → tự thay bằng năm hiện tại
 *
 * Cách gắn vào HTML:
 *   data-cms="đường.dẫn"            → đổ text (có định dạng) vào phần tử;
 *                                     mảng → mỗi phần tử thành 1 đoạn <p>.
 *   data-cms-text="đường.dẫn"       → đổ text thuần (vd thẻ <title>).
 *   data-cms-attr="attr:đường.dẫn"  → gán vào thuộc tính (vd meta content);
 *                                     nhiều cặp ngăn bằng dấu ";".
 *
 * Text mặc định vẫn nằm sẵn trong HTML, nên nếu không tải được content.json
 * (mở bằng file:// hoặc offline) trang vẫn hiển thị bình thường.
 * ===================================================================== */
(function () {
  'use strict';

  const YEAR = new Date().getFullYear();

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function render(value) {
    return escapeHtml(value)
      .replace(/\{year\}/g, YEAR)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<span class="accent">$1</span>');
  }

  function get(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  }

  function apply(content) {
    document.querySelectorAll('[data-cms]').forEach((el) => {
      const val = get(content, el.getAttribute('data-cms'));
      if (val == null) return;
      el.innerHTML = Array.isArray(val)
        ? val.map((p) => `<p>${render(p)}</p>`).join('')
        : render(val);
    });

    document.querySelectorAll('[data-cms-text]').forEach((el) => {
      const val = get(content, el.getAttribute('data-cms-text'));
      if (val != null) el.textContent = String(val).replace(/\{year\}/g, YEAR);
    });

    document.querySelectorAll('[data-cms-attr]').forEach((el) => {
      el.getAttribute('data-cms-attr').split(';').forEach((pair) => {
        const sep = pair.indexOf(':');
        if (sep < 0) return;
        const attr = pair.slice(0, sep).trim();
        const val = get(content, pair.slice(sep + 1).trim());
        if (attr && val != null) el.setAttribute(attr, String(val));
      });
    });
  }

  (async () => {
    try {
      const res = await fetch('data/content.json', { cache: 'no-store' });
      if (res.ok) apply(await res.json());
    } catch (e) { /* file:// hoặc offline → giữ text mặc định trong HTML */ }
  })();
})();
