/* ── Libraries Data ───────────────────────────────────── */
const LIBRARIES = [
  {
    name: "Trinity College",
    loc: "Dublin, Ireland",
    country: "Ireland",
    vid: "NrZ69l5hqWk",
    desc: "The Long Room — 65 metres of ancient oak, marble busts and 200,000 of the oldest books in Ireland",
  },
  {
    name: "Admont Abbey",
    loc: "Styria, Austria",
    country: "Austria",
    vid: "wMywixffBsY",
    desc: "The world's largest monastic library, a Baroque masterpiece with frescoed ceilings and gilded shelves",
  },
  {
    name: "Morgan Library",
    loc: "New York, USA",
    country: "United States",
    vid: "WpfCP3AJSJ4",
    desc: "J.P. Morgan's gilded private library — home to Gutenberg Bibles, Mozart manuscripts, and Rembrandt drawings",
  },
  {
    name: "Bodleian Library",
    loc: "Oxford, UK",
    country: "United Kingdom",
    vid: "PeLoyrDqL_A",
    desc: "One of Europe's oldest research libraries, established in 1602 and a filming location for Harry Potter",
  },
  {
    name: "Library of Congress",
    loc: "Washington D.C., USA",
    country: "United States",
    vid: "brp1usbA4_4",
    desc: "The world's largest library with 170 million items — its Great Hall is breathtaking",
  },
  {
    name: "Strahov Monastery",
    loc: "Prague, Czech Republic",
    country: "Czech Republic",
    vid: "7wKXVBursH4",
    desc: "A stunning Baroque theological hall with painted ceilings and antique gilded globes",
  },
  {
    name: "Real Gabinete",
    loc: "Rio de Janeiro, Brazil",
    country: "Brazil",
    vid: "cfPiigncsWk",
    desc: "The Royal Portuguese Reading Room — the finest example of Neo-Manueline architecture outside Portugal",
  },
  {
    name: "George Peabody Library",
    loc: "Baltimore, USA",
    country: "United States",
    vid: "brp1usbA4_4",
    desc: "Five tiers of ornate cast-iron balconies rising beneath a stunning glass skylight — called the 'Cathedral of Books'",
  },
];

/* ── Sound Sources ────────────────────────────────────── */
const SOUNDS = {
  ambient: "https://www.youtube.com/embed/-VgN7nKx9MU?autoplay=1&loop=1&playlist=-VgN7nKx9MU",
  lofi:    "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&loop=1&playlist=jfKfPfyJRdk",
};

/* ── State ────────────────────────────────────────────── */
let state = {
  curLib:    -1,
  sound:     'none',
  focusMode: false,
};

let pomo = {
  running:   false,
  phase:     'focus',    // 'focus' | 'short' | 'long'
  secsLeft:  25 * 60,
  cycle:     0,
  interval:  null,
  cfg: { focus: 25, short: 5, long: 15, cycles: 4 },
};

/* ── Build Library Grid ───────────────────────────────── */
function buildGrid() {
  const grid = document.getElementById('lib-grid');
  LIBRARIES.forEach((lib, i) => {
    const card = document.createElement('div');
    card.className = 'lib-card';
    card.id = 'lc' + i;
    card.innerHTML = `<div class="lib-card-name">${lib.name}</div><div class="lib-card-loc">${lib.loc}</div>`;
    card.addEventListener('click', () => selectLib(i));
    grid.appendChild(card);
  });
}

/* ── Select Library ───────────────────────────────────── */
function selectLib(i) {
  document.querySelectorAll('.lib-card').forEach(c => c.classList.remove('sel'));
  const card = document.getElementById('lc' + i);
  if (card) card.classList.add('sel');

  state.curLib = i;
  const lib = LIBRARIES[i];

  document.getElementById('lib-title').textContent = lib.name;
  document.getElementById('lib-desc').textContent  = lib.desc;
  document.getElementById('badge-name').textContent = lib.name;
  document.getElementById('badge-loc').textContent  = lib.loc;

  const src = `https://www.youtube.com/embed/${lib.vid}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${lib.vid}`;
  document.getElementById('yt-player').src = src;
}

/* ── Sound ────────────────────────────────────────────── */
function setSound(type) {
  state.sound = type;
  ['ambient', 'lofi', 'none'].forEach(s => {
    document.getElementById('sp-' + s).classList.toggle('on', s === type);
  });
  const af = document.getElementById('audio-frame');
  af.src = type === 'none' ? '' : SOUNDS[type];
}

/* ── Enter / Exit App ─────────────────────────────────── */
function enterApp() {
  document.getElementById('landing').classList.add('out');
  const main = document.getElementById('main');
  main.classList.remove('hidden');
  setTimeout(() => main.classList.add('visible'), 50);
  if (state.curLib === -1) selectLib(0);
}

/* ── Focus Mode ───────────────────────────────────────── */
function enterFocus() {
  state.focusMode = true;
  document.getElementById('focus-overlay').classList.add('on');
}
function exitFocus() {
  state.focusMode = false;
  document.getElementById('focus-overlay').classList.remove('on');
}

/* ── Clock ────────────────────────────────────────────── */
function tickClock() {
  const now  = new Date();
  const full = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const short = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById('hud-clock').textContent = short;
  document.getElementById('fo-clock').textContent  = full;
}

/* ── Pomodoro ─────────────────────────────────────────── */
function fmt(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function updatePomoUI() {
  const t = fmt(pomo.secsLeft);
  document.getElementById('pomo-time').textContent    = t;
  document.getElementById('hud-pomo-time').textContent = t;
  document.getElementById('fo-pomo').textContent       = t;

  const phaseLabels = { focus: 'Focus', short: 'Short break', long: 'Long break' };
  const phaseLabel  = phaseLabels[pomo.phase];
  const stateLabel  = pomo.running ? phaseLabel : (pomo.secsLeft === pomo.cfg.focus * 60 && pomo.phase === 'focus' ? 'Ready to focus' : 'Paused');

  document.getElementById('pomo-phase-label').textContent = stateLabel;
  document.getElementById('hud-pomo-phase').textContent   = phaseLabel;
  document.getElementById('fo-phase').textContent         = phaseLabel;

  const cycles = pomo.cfg.cycles;
  for (let i = 0; i < 4; i++) {
    const pip  = document.getElementById('pip' + i);
    const hdot = document.getElementById('hd'  + i);
    const done = i < pomo.cycle && i < cycles;
    if (pip)  pip.className  = 'pip'  + (done ? ' done' : '');
    if (hdot) hdot.className = 'hdot' + (done ? ' done' : '');
  }
}

function togglePomo() {
  if (pomo.running) {
    clearInterval(pomo.interval);
    pomo.running = false;
    document.getElementById('play-label').textContent = 'Resume';
    document.getElementById('play-icon').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
  } else {
    pomo.running = true;
    document.getElementById('play-label').textContent = 'Pause';
    document.getElementById('play-icon').innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    pomo.interval = setInterval(() => {
      pomo.secsLeft--;
      if (pomo.secsLeft <= 0) nextPomoPhase();
      updatePomoUI();
    }, 1000);
  }
  updatePomoUI();
}

function nextPomoPhase() {
  clearInterval(pomo.interval);
  pomo.running = false;
  playChime();

  if (pomo.phase === 'focus') {
    pomo.cycle++;
    if (pomo.cycle >= pomo.cfg.cycles) {
      pomo.phase    = 'long';
      pomo.secsLeft = pomo.cfg.long * 60;
    } else {
      pomo.phase    = 'short';
      pomo.secsLeft = pomo.cfg.short * 60;
    }
  } else {
    if (pomo.phase === 'long') pomo.cycle = 0;
    pomo.phase    = 'focus';
    pomo.secsLeft = pomo.cfg.focus * 60;
  }
  document.getElementById('play-label').textContent = 'Start';
  document.getElementById('play-icon').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
  updatePomoUI();
}

function resetPomo() {
  clearInterval(pomo.interval);
  pomo.running  = false;
  pomo.phase    = 'focus';
  pomo.secsLeft = pomo.cfg.focus * 60;
  pomo.cycle    = 0;
  document.getElementById('play-label').textContent = 'Start';
  document.getElementById('play-icon').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
  updatePomoUI();
}

function skipPomo() { nextPomoPhase(); }

function updateCfg() {
  pomo.cfg.focus  = Math.max(1, parseInt(document.getElementById('cfg-focus').value)  || 25);
  pomo.cfg.short  = Math.max(1, parseInt(document.getElementById('cfg-short').value)  || 5);
  pomo.cfg.long   = Math.max(1, parseInt(document.getElementById('cfg-long').value)   || 15);
  pomo.cfg.cycles = Math.max(2, parseInt(document.getElementById('cfg-cycles').value) || 4);
  if (!pomo.running) resetPomo();
  updatePomoUI();
}

/* ── Chime (gentle beep using Web Audio API) ──────────── */
function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const freqs = [523, 659, 784]; // C5, E5, G5
    freqs.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const t = ctx.currentTime + i * 0.18;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.05);
      gain.gain.linearRampToValueAtTime(0, t + 0.5);
      osc.start(t);
      osc.stop(t + 0.55);
    });
  } catch (e) {}
}

/* ── Keyboard Shortcuts ───────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
    e.preventDefault();
    togglePomo();
  }
  if (e.code === 'KeyF') {
    state.focusMode ? exitFocus() : enterFocus();
  }
  if (e.code === 'Escape') exitFocus();
});

/* ── Init ─────────────────────────────────────────────── */
buildGrid();
updatePomoUI();
tickClock();
setInterval(tickClock, 1000);
