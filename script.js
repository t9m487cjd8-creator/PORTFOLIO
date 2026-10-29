(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Hero: rotating line + cursor glow ---------- */
  const phrases = ['Always coding.', 'Constantly learning.', 'Shipping side quests.'];
  const rot = $('#rotator');
  let pi = 0;
  if (!reduce) {
    setInterval(() => {
      rot.classList.add('out');
      setTimeout(() => {
        pi = (pi + 1) % phrases.length;
        rot.textContent = phrases[pi];
        rot.classList.remove('out');
      }, 350);
    }, 2800);
  }

  const hero = $('#hero');
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100) + '%');
    hero.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100) + '%');
  });

  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.15 });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------- About: words light up as you scroll ---------- */
  const statement = $('#statement');
  statement.innerHTML = statement.textContent.trim().split(/\s+/)
    .map(w => '<span class="w">' + w + '</span>').join(' ');
  const words = $$('.w', statement);

  /* ---------- Scroll-linked updates ---------- */
  const bar = $('#bar'), heroInner = $('#heroInner');
  let ticking = false;

  function update() {
    const y = scrollY;
    bar.classList.toggle('scrolled', y > 8);

    if (!reduce) {
      const p = clamp(y / (innerHeight * 0.7), 0, 1);
      heroInner.style.transform = 'translateY(' + (y * 0.25) + 'px) scale(' + (1 - p * 0.08) + ')';
      heroInner.style.opacity = 1 - p;
    }

    const r = statement.getBoundingClientRect();
    const prog = reduce ? 1 : clamp((innerHeight * 0.8 - r.top) / (r.height + innerHeight * 0.3), 0, 1);
    const lit = Math.round(prog * words.length);
    words.forEach((w, i) => w.classList.toggle('on', i < lit));

    ticking = false;
  }
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  addEventListener('resize', update);
  update();

  /* ---------- Card spotlight ---------- */
  $$('.card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- Password generator ---------- */
  const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const NUMBERS = '0123456789';
  const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.?';

  function rand(n) {
    const a = new Uint32Array(1), max = Math.floor(2 ** 32 / n) * n;
    do { crypto.getRandomValues(a); } while (a[0] >= max);
    return a[0] % n;
  }
  const pick = (set, k) => Array.from({ length: k }, () => set[rand(set.length)]);

  function build(l, n, s) {
    const c = [...pick(LETTERS, l), ...pick(NUMBERS, n), ...pick(SYMBOLS, s)];
    for (let i = c.length - 1; i > 0; i--) {
      const j = rand(i + 1);
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c.join('');
  }

  const sl = { l: $('#pwL'), n: $('#pwN'), s: $('#pwS') };
  const levels = [
    [40, 'Weak', '#ff453a'],
    [60, 'Fair', '#ff9f0a'],
    [80, 'Strong', '#30d158'],
    [Infinity, 'Excellent', '#0a84ff']
  ];

  function renderPw() {
    const l = +sl.l.value, n = +sl.n.value, s = +sl.s.value, total = l + n + s;
    $('#vL').textContent = l; $('#vN').textContent = n; $('#vS').textContent = s;
    $('#pwOut').textContent = total ? build(l, n, s) : 'Move a slider to begin.';

    const pool = (l ? LETTERS.length : 0) + (n ? NUMBERS.length : 0) + (s ? SYMBOLS.length : 0);
    const bits = total ? total * Math.log2(pool) : 0;
    const lv = levels.find(x => bits < x[0]);
    const fill = $('#meterFill');
    fill.style.width = clamp(bits, 0, 100) + '%';
    fill.style.setProperty('--lvl', lv[2]);
    $('#strength').textContent = total ? lv[1] + ', about ' + Math.round(bits) + ' bits' : '';
  }

  Object.values(sl).forEach(el => el.addEventListener('input', renderPw));
  $('#pwNew').addEventListener('click', renderPw);
  $('#pwCopy').addEventListener('click', async e => {
    const btn = e.currentTarget, text = $('#pwOut').textContent;
    if (!text || text.startsWith('Move a slider')) return;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'Copied';
    } catch {
      btn.textContent = 'Press Ctrl+C after selecting';
    }
    setTimeout(() => (btn.textContent = 'Copy'), 1600);
  });

  /* ---------- Factorial (BigInt keeps big answers exact) ---------- */
  const fIn = $('#fN');

  function factorial(n) {
    let r = 1n;
    for (let i = 2n; i <= BigInt(n); i++) r *= i;
    return r.toString();
  }

  function renderF() {
    const n = Number(fIn.value);
    if (fIn.value.trim() === '' || !Number.isInteger(n) || n < 0 || n > 1000) {
      $('#fOut').textContent = 'Enter a whole number from 0 to 1000.';
      $('#fDigits').textContent = '';
      return;
    }
    const result = factorial(n);
    $('#fOut').textContent = n + '! = ' + result;
    $('#fDigits').textContent = result.length + (result.length === 1 ? ' digit' : ' digits');
  }

  const setF = v => { fIn.value = clamp(v, 0, 1000); renderF(); };
  fIn.addEventListener('input', renderF);
  $('#fMinus').addEventListener('click', () => setF((parseInt(fIn.value, 10) || 0) - 1));
  $('#fPlus').addEventListener('click', () => setF((parseInt(fIn.value, 10) || 0) + 1));
  $$('.chip').forEach(c => c.addEventListener('click', () => setF(+c.dataset.n)));

  /* ---------- Initial render ---------- */
  renderPw();
  renderF();
})();
