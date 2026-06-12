/* =====================================================================
 * bienac — engine hiệu ứng nền WebGL
 * 4 hiệu ứng: aurora (cực quang), waves (sóng biển),
 *             nebula (tinh vân), fireflies (đom đóm ánh sáng)
 * ===================================================================== */
(function () {
  'use strict';

  const VERTEX_SRC = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  // Hàm noise dùng chung cho mọi shader
  const GLSL_COMMON = `
    precision highp float;
    uniform float u_time;
    uniform vec2  u_resolution;
    uniform vec2  u_mouse;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y);
    }
    float fbm(vec2 p) {
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = p * 2.03 + vec2(13.7, 7.1);
        a *= 0.5;
      }
      return v;
    }
    float stars(vec2 frag, float density, float speed) {
      vec2 cell = floor(frag / 2.0);
      float h = hash(cell);
      float twinkle = 0.5 + 0.5 * sin(u_time * speed + h * 60.0);
      return step(density, h) * twinkle;
    }
  `;

  /* ------------------------------------------------ CỰC QUANG ----- */
  const FRAG_AURORA = GLSL_COMMON + `
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 p  = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
      p.x += (u_mouse.x - 0.5) * 0.15;

      // Bầu trời đêm
      vec3 col = mix(vec3(0.008, 0.012, 0.035), vec3(0.015, 0.04, 0.10), uv.y);

      // Sao lấp lánh
      col += vec3(0.9, 0.95, 1.0) * stars(gl_FragCoord.xy, 0.997, 2.0) * 0.7 * smoothstep(0.15, 0.8, uv.y);

      // Ba dải cực quang
      for (int i = 0; i < 3; i++) {
        float fi = float(i);
        float t  = u_time * (0.10 + fi * 0.025);
        float wav = fbm(vec2(p.x * 1.4 + fi * 7.3 + t, t * 0.6));
        float y   = uv.y - 0.34 - fi * 0.10 - wav * 0.42;
        float band = exp(-abs(y) * (5.2 - wav * 2.5));
        float rays = 0.55 + 0.45 * fbm(vec2(p.x * 7.0 + t * 3.0, uv.y * 2.2 - t));
        vec3 tint = mix(vec3(0.05, 1.0, 0.55), vec3(0.15, 0.55, 1.0), wav);
        tint = mix(tint, vec3(0.65, 0.30, 0.95), fi * 0.34);
        col += tint * band * rays * 0.52;
      }

      // Ánh phản chiếu nhẹ phía chân trời
      col += vec3(0.0, 0.25, 0.22) * exp(-uv.y * 6.0) * 0.35;
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  /* ------------------------------------------------ SÓNG BIỂN ----- */
  const FRAG_WAVES = GLSL_COMMON + `
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 p  = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
      p.x += (u_mouse.x - 0.5) * 0.2;

      // Đại dương về đêm
      vec3 col = mix(vec3(0.0, 0.015, 0.05), vec3(0.0, 0.05, 0.11), uv.y);
      col += vec3(0.9, 0.95, 1.0) * stars(gl_FragCoord.xy, 0.9975, 1.5) * 0.5 * smoothstep(0.5, 0.95, uv.y);

      // Vầng trăng mờ
      float moon = length(p - vec2(0.75, 0.55));
      col += vec3(0.7, 0.9, 1.0) * exp(-moon * 5.5) * 0.25;

      // Các lớp sóng phát sáng
      for (int i = 0; i < 7; i++) {
        float fi = float(i);
        float t  = u_time * (0.35 + fi * 0.07);
        float yy = -0.75 + fi * 0.17;
        float w  = sin(p.x * 2.1 + t + fi * 1.7) * 0.10
                 + sin(p.x * 4.6 - t * 1.25 + fi * 0.8) * 0.05
                 + (fbm(vec2(p.x * 1.6 + fi * 4.0, t * 0.35)) - 0.5) * 0.22;
        float d = abs(p.y - yy - w);
        float glow = 0.014 / (d + 0.014);
        glow *= glow;
        vec3 wc = mix(vec3(0.10, 0.95, 0.90), vec3(0.15, 0.40, 1.0), fi / 6.0);
        col += wc * glow * (0.35 + 0.18 * sin(fi * 2.0 + u_time * 0.4));
      }
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  /* ------------------------------------------------- TINH VÂN ----- */
  const FRAG_NEBULA = GLSL_COMMON + `
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 p  = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
      p += (u_mouse - 0.5) * 0.12;
      float t = u_time * 0.045;

      // Domain warping tạo mây tinh vân
      vec2 q = vec2(fbm(p * 1.1 + t), fbm(p * 1.1 + vec2(5.2, 1.3) - t));
      vec2 r = vec2(fbm(p * 1.1 + 3.5 * q + vec2(1.7, 9.2) + t * 0.7),
                    fbm(p * 1.1 + 3.5 * q + vec2(8.3, 2.8) - t * 0.5));
      float f = fbm(p * 1.1 + 3.5 * r);

      vec3 col = mix(vec3(0.015, 0.008, 0.045), vec3(0.10, 0.18, 0.50), clamp(f * f * 1.6, 0.0, 1.0));
      col = mix(col, vec3(0.0, 0.85, 0.80), clamp(q.y * q.y * 0.85, 0.0, 1.0) * f);
      col = mix(col, vec3(0.60, 0.20, 0.85), clamp(r.x * 0.7, 0.0, 1.0) * f * 0.8);
      col += vec3(0.9, 0.7, 1.0) * pow(f, 5.0) * 0.6;

      // Trường sao hai lớp
      col += vec3(0.9, 0.95, 1.0) * stars(gl_FragCoord.xy, 0.9965, 1.8) * 0.8;
      col += vec3(0.7, 0.85, 1.0) * stars(gl_FragCoord.xy + 37.0, 0.998, 0.9) * 1.0;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  /* -------------------------------------------------- ĐOM ĐÓM ----- */
  const FRAG_FIREFLIES = GLSL_COMMON + `
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      float aspect = u_resolution.x / u_resolution.y;
      vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;

      // Khu rừng đêm: gradient + sương mù chuyển động
      vec3 col = mix(vec3(0.004, 0.02, 0.03), vec3(0.01, 0.05, 0.08), uv.y);
      float mist = fbm(vec2(p.x * 1.2 + u_time * 0.05, p.y * 1.5 - u_time * 0.02));
      col += vec3(0.0, 0.10, 0.10) * mist * 0.5;

      // Đàn đom đóm trôi lơ lửng
      for (int i = 0; i < 48; i++) {
        float fi = float(i);
        float h1 = hash(vec2(fi, 1.0));
        float h2 = hash(vec2(fi, 2.0));
        float h3 = hash(vec2(fi, 3.0));
        float spd = 0.018 + h3 * 0.05;
        vec2 pos = vec2(
          (fract(h1 + u_time * spd) * 2.4 - 1.2) * aspect,
          fract(h2 + u_time * spd * 0.6) * 2.4 - 1.2
        );
        pos += vec2(sin(u_time * (0.6 + h3) + fi * 2.1),
                    cos(u_time * (0.4 + h2) + fi * 1.3)) * 0.06;
        pos += (u_mouse - 0.5) * 0.1 * (0.3 + h3);

        float d = length(p - pos);
        float blink = 0.45 + 0.55 * pow(0.5 + 0.5 * sin(u_time * (1.0 + h1 * 2.0) + fi * 7.0), 3.0);
        vec3 fc = mix(vec3(0.15, 1.0, 0.85), vec3(0.55, 0.45, 1.0), h3);
        col += fc * exp(-d * d * (1400.0 - h2 * 800.0)) * blink;      // lõi sáng
        col += fc * exp(-d * 7.0) * 0.035 * blink;                     // quầng sáng
      }
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const SHADERS = {
    aurora:    FRAG_AURORA,
    waves:     FRAG_WAVES,
    nebula:    FRAG_NEBULA,
    fireflies: FRAG_FIREFLIES,
  };

  class FXEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.gl = canvas.getContext('webgl', { antialias: false, alpha: false })
             || canvas.getContext('experimental-webgl');
      if (!this.gl) {
        canvas.style.display = 'none';
        document.body.classList.add('no-webgl');
        return;
      }
      this.programs = {};
      this.current = null;
      this.mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
      this.start = performance.now();
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const gl = this.gl;
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

      this.resize = this.resize.bind(this);
      this.loop = this.loop.bind(this);
      window.addEventListener('resize', this.resize);
      window.addEventListener('pointermove', (e) => {
        this.mouse.tx = e.clientX / window.innerWidth;
        this.mouse.ty = 1 - e.clientY / window.innerHeight;
      }, { passive: true });
      this.resize();
      requestAnimationFrame(this.loop);
    }

    compile(type, src) {
      const gl = this.gl;
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    getProgram(name) {
      if (!this.gl || !SHADERS[name]) return null;
      if (this.programs[name]) return this.programs[name];
      const gl = this.gl;
      const vs = this.compile(gl.VERTEX_SHADER, VERTEX_SRC);
      const fs = this.compile(gl.FRAGMENT_SHADER, SHADERS[name]);
      if (!vs || !fs) return null;
      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error('Link error:', gl.getProgramInfoLog(prog));
        return null;
      }
      const entry = {
        prog,
        aPos: gl.getAttribLocation(prog, 'a_pos'),
        uTime: gl.getUniformLocation(prog, 'u_time'),
        uRes: gl.getUniformLocation(prog, 'u_resolution'),
        uMouse: gl.getUniformLocation(prog, 'u_mouse'),
      };
      this.programs[name] = entry;
      return entry;
    }

    setEffect(name) {
      if (!this.gl || !SHADERS[name]) return;
      // Mờ dần rồi đổi shader để chuyển cảnh mượt
      this.canvas.classList.add('fx-fading');
      setTimeout(() => {
        this.current = this.getProgram(name);
        this.canvas.classList.remove('fx-fading');
      }, 350);
    }

    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      this.canvas.width = Math.floor(window.innerWidth * dpr);
      this.canvas.height = Math.floor(window.innerHeight * dpr);
      if (this.gl) this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    loop(now) {
      const gl = this.gl;
      if (gl && this.current) {
        // Chuột di chuyển mượt theo quán tính
        this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.05;
        this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.05;

        const t = this.reducedMotion ? 10.0 : (now - this.start) / 1000;
        const e = this.current;
        gl.useProgram(e.prog);
        gl.enableVertexAttribArray(e.aPos);
        gl.vertexAttribPointer(e.aPos, 2, gl.FLOAT, false, 0, 0);
        gl.uniform1f(e.uTime, t);
        gl.uniform2f(e.uRes, this.canvas.width, this.canvas.height);
        gl.uniform2f(e.uMouse, this.mouse.x, this.mouse.y);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      requestAnimationFrame(this.loop);
    }
  }

  window.BienacFX = { FXEngine, EFFECTS: Object.keys(SHADERS) };
})();
