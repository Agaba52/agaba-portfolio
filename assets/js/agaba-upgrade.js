/* agaba-upgrade.js — additive layer for Agaba Abel's portfolio.
   Add ONE line before </body> in index.html:
   <script src="assets/js/agaba-upgrade.js" defer></script>            */
(function () {
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = matchMedia('(hover:hover)').matches;

  /* ---------- 1. Styles ---------- */
  var css = `
@property --a{syntax:'<angle>';inherits:false;initial-value:0deg}
/* Credentials: small, standard logos */
#credentials .logo-tile{width:2rem!important;height:2rem!important;padding:.3rem!important;border-radius:.5rem!important;background:#fff;display:inline-grid;place-items:center;transition:transform .35s cubic-bezier(.2,.8,.2,1)}
#credentials .logo-tile img{width:1.25rem!important;height:1.25rem!important;object-fit:contain}
/* Credentials: living cards */
#credentials article{--c:34,211,238;position:relative;transition:transform .25s ease-out,box-shadow .35s,border-color .35s;will-change:transform}
#credentials article:nth-child(6n+2){--c:167,139,250}
#credentials article:nth-child(6n+3){--c:74,222,128}
#credentials article:nth-child(6n+4){--c:251,146,60}
#credentials article:nth-child(6n+5){--c:244,114,182}
#credentials article:nth-child(6n+6){--c:250,204,21}
#credentials article::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:2px;pointer-events:none;opacity:0;transition:opacity .3s;
 background:conic-gradient(from var(--a),rgba(var(--c),0) 0%,rgba(var(--c),1) 25%,rgba(var(--c),0) 50%,rgba(var(--c),1) 75%,rgba(var(--c),0) 100%);
 -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:ag-spin 3s linear infinite}
#credentials article::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;
 background:radial-gradient(260px circle at var(--mx,50%) var(--my,50%),rgba(var(--c),.22),transparent 65%)}
#credentials article:hover{border-color:rgba(var(--c),.7);box-shadow:0 30px 60px -22px rgba(var(--c),.6),0 0 0 1px rgba(var(--c),.25);z-index:5}
#credentials article:hover::before,#credentials article:hover::after{opacity:1}
#credentials article:hover .logo-tile{transform:rotate(-10deg) scale(1.2)}
#credentials article:hover span.text-cyan-400{color:rgb(var(--c))}
#credentials article a{display:inline-block;transition:transform .25s,color .25s}
#credentials article:hover a{transform:translateX(8px);color:rgb(var(--c))}
@keyframes ag-spin{to{--a:360deg}}
/* Boot intro */
#ag-boot{position:fixed;inset:0;z-index:10000;background:#05070a;display:flex;align-items:center;justify-content:center;font:500 13px/1.8 'JetBrains Mono',monospace;color:#4ade80;transition:opacity .6s,visibility .6s;cursor:pointer}
#ag-boot.off{opacity:0;visibility:hidden}
#ag-boot pre{margin:0;white-space:pre-wrap;padding:1rem;max-width:30rem}
#ag-boot b{color:#22d3ee;text-shadow:0 0 14px #22d3ee;font-size:1.3em}
/* Effects */
#ag-fx,#ag-rain{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9998}
#ag-rain{z-index:9999;opacity:0;transition:opacity .6s}
#ag-magic{position:fixed;right:1rem;bottom:1rem;z-index:9997;width:3rem;height:3rem;border-radius:50%;border:1px solid rgba(34,211,238,.6);background:rgba(9,9,11,.85);color:#22d3ee;font-size:1.3rem;cursor:pointer;backdrop-filter:blur(6px);animation:ag-pulse 2.4s infinite;transition:transform .2s}
#ag-magic:hover{transform:scale(1.15) rotate(15deg)}
@keyframes ag-pulse{0%{box-shadow:0 0 0 0 rgba(34,211,238,.5)}100%{box-shadow:0 0 0 16px rgba(34,211,238,0)}}
#ag-toast{position:fixed;left:50%;top:5rem;transform:translate(-50%,-20px);z-index:10001;opacity:0;pointer-events:none;background:#05070a;border:1px solid #22d3ee;color:#22d3ee;font:700 .85rem 'JetBrains Mono',monospace;padding:.7rem 1.1rem;border-radius:.7rem;box-shadow:0 0 30px rgba(34,211,238,.45);transition:.4s;text-align:center;max-width:90vw}
#ag-toast.on{opacity:1;transform:translate(-50%,0)}
`;
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- 2. Boot intro (once per session, click to skip) ---------- */
  var seen = false;
  try { seen = sessionStorage.getItem('ag-boot'); sessionStorage.setItem('ag-boot', '1'); } catch (e) {}
  if (!seen && !RM) {
    var boot = document.createElement('div'); boot.id = 'ag-boot';
    boot.innerHTML = '<pre id="ag-boot-t"></pre>';
    document.body.appendChild(boot);
    var lines = ['> booting agaba.sec ...', '> loading wazuh agents ........ ok', '> scanning inbox for phishing ... 0 threats', '> verifying credentials ......... ok', '', '<b>ACCESS GRANTED</b>'], li = 0, t = document.getElementById('ag-boot-t');
    var done = function () { boot.classList.add('off'); setTimeout(function () { boot.remove(); }, 700); };
    boot.addEventListener('click', done);
    (function next() {
      if (li >= lines.length) return setTimeout(done, 700);
      t.innerHTML += lines[li++] + '\n'; setTimeout(next, 330);
    })();
  }

  /* ---------- 3. Credential cards: 3D tilt + cursor spotlight ---------- */
  if (!RM && FINE) {
    document.querySelectorAll('#credentials article').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
        c.style.transform = 'perspective(800px) translateY(-10px) scale(1.05) rotateX(' + (0.5 - y) * 10 + 'deg) rotateY(' + (x - 0.5) * 12 + 'deg)';
      });
      c.addEventListener('pointerleave', function () { c.style.transform = ''; });
    });
  }

  /* ---------- 4. Heading decrypt effect ---------- */
  if (!RM && 'IntersectionObserver' in window) {
    var G = '!<>-_\\/[]{}=+*^?#01', io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return; io.unobserve(en.target);
        var el = en.target, final = el.textContent, f = 0, N = 22;
        var iv = setInterval(function () {
          var out = '', k = Math.floor(final.length * f / N);
          for (var i = 0; i < final.length; i++) out += (i < k || final[i] === ' ') ? final[i] : G[Math.floor(Math.random() * G.length)];
          el.textContent = out;
          if (++f > N) { clearInterval(iv); el.textContent = final; }
        }, 35);
      });
    }, { threshold: .6 });
    document.querySelectorAll('main h2').forEach(function (h) { io.observe(h); });
  }

  /* ---------- 5. Sparkle trail + click bursts ---------- */
  var cv = document.createElement('canvas'); cv.id = 'ag-fx'; document.body.appendChild(cv);
  var cx = cv.getContext('2d'), P = [], run = false, cols = ['34,211,238', '167,139,250', '74,222,128', '244,114,182'];
  function size() { cv.width = innerWidth; cv.height = innerHeight; } size(); addEventListener('resize', size);
  function spawn(x, y, n, v) {
    for (var i = 0; i < n; i++) { var a = Math.random() * 6.283, s = Math.random() * v;
      P.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - .3, l: 1, r: 1 + Math.random() * 2.2, c: cols[Math.floor(Math.random() * cols.length)] }); }
    if (!run) { run = true; requestAnimationFrame(tick); }
  }
  function tick() {
    cx.clearRect(0, 0, cv.width, cv.height);
    P = P.filter(function (p) { return p.l > 0; });
    P.forEach(function (p) {
      p.x += p.vx; p.y += p.vy; p.vy += .03; p.l -= .022;
      cx.fillStyle = 'rgba(' + p.c + ',' + p.l + ')'; cx.shadowColor = 'rgb(' + p.c + ')'; cx.shadowBlur = 8;
      cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.283); cx.fill();
    });
    if (P.length) requestAnimationFrame(tick); else { run = false; cx.clearRect(0, 0, cv.width, cv.height); }
  }
  if (!RM) {
    if (FINE) addEventListener('pointermove', function (e) { if (Math.random() < .35) spawn(e.clientX, e.clientY, 1, 1.2); });
    addEventListener('pointerdown', function (e) { spawn(e.clientX, e.clientY, 22, 4); });
  }

  /* ---------- 6. The big surprise: matrix rain + toast ---------- */
  var toast = document.createElement('div'); toast.id = 'ag-toast'; document.body.appendChild(toast);
  function say(m) { toast.innerHTML = m; toast.classList.add('on'); setTimeout(function () { toast.classList.remove('on'); }, 4200); }
  var rain = document.createElement('canvas'); rain.id = 'ag-rain'; document.body.appendChild(rain);
  var busy = false;
  function matrix() {
    if (busy) return; busy = true;
    var c = rain.getContext('2d'); rain.width = innerWidth; rain.height = innerHeight;
    var fs = 16, cols2 = Math.floor(rain.width / fs), drops = [], ch = 'アイウエオカキクケコ0123456789ABCDEF<>/{}$#';
    for (var i = 0; i < cols2; i++) drops[i] = Math.random() * -40;
    rain.style.opacity = 1; say('ACCESS GRANTED &mdash; welcome, recruiter 👾<br><span style="font-weight:400;color:#a1a1aa">Agaba is open to hire. Say hi below.</span>');
    var iv = setInterval(function () {
      c.fillStyle = 'rgba(5,7,10,.12)'; c.fillRect(0, 0, rain.width, rain.height);
      c.fillStyle = '#22d3ee'; c.font = fs + 'px monospace';
      for (var i = 0; i < cols2; i++) {
        c.fillText(ch[Math.floor(Math.random() * ch.length)], i * fs, drops[i] * fs);
        if (drops[i] * fs > rain.height && Math.random() > .975) drops[i] = 0; drops[i]++;
      }
    }, 45);
    setTimeout(function () { rain.style.opacity = 0; }, 4500);
    setTimeout(function () { clearInterval(iv); busy = false; }, 5200);
    spawn(innerWidth / 2, innerHeight / 2, 80, 8);
  }
  var btn = document.createElement('button'); btn.id = 'ag-magic'; btn.title = 'Press for magic'; btn.setAttribute('aria-label', 'Press for magic'); btn.textContent = '✨';
  btn.addEventListener('click', matrix); document.body.appendChild(btn);

  /* Easter eggs: Konami code, typing "hack", or clicking the logo 5 times */
  var K = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], ki = 0, typed = '';
  addEventListener('keydown', function (e) {
    ki = (e.keyCode === K[ki]) ? ki + 1 : (e.keyCode === K[0] ? 1 : 0);
    if (ki === K.length) { ki = 0; matrix(); }
    if (e.key && e.key.length === 1 && !/input|textarea/i.test((e.target || {}).tagName || '')) {
      typed = (typed + e.key.toLowerCase()).slice(-4); if (typed === 'hack') { typed = ''; matrix(); }
    }
  });
  var logo = document.querySelector('header a[href="#home"]'), clicks = 0, ct;
  if (logo) logo.addEventListener('click', function () { clearTimeout(ct); ct = setTimeout(function () { clicks = 0; }, 900); if (++clicks >= 5) { clicks = 0; matrix(); } });
})();
