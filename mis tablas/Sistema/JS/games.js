// Módulo de Juegos y Desafíos Matemáticos - MIS TABLAS 4° BÁSICO

const GamesModule = {
  activeGame: null,
  gameScore: 0,
  gameStreak: 0,

  // Catálogo de Juegos
  GAMES_LIST: [
    {
      id: 'memory',
      title: 'Memoria Matemática',
      icon: '🧠',
      tag: 'Concentración y parejas',
      desc: 'Encuentra las parejas que relacionan cada multiplicación con su resultado correcto.'
    },
    {
      id: 'catch',
      title: 'Atrapa el Resultado',
      icon: '🎈',
      tag: 'Reflejos rápidos',
      desc: '¡Las respuestas flotan por la pantalla! Toca rápido la respuesta correcta antes de que se escape.'
    },
    {
      id: 'builder',
      title: 'Construye la Multiplicación',
      icon: '🧱',
      tag: 'Enfoque Concreto COPISI',
      desc: 'Agrupa cajas y objetos reales para formar la multiplicación que te pide el desafío.'
    },
    {
      id: 'who',
      title: '¿Quién tiene la respuesta?',
      icon: '🎭',
      tag: 'Personajes y Diálogo',
      desc: 'Cuatro amigos tienen una respuesta cada uno. Descubre cuál de ellos calculó el valor correcto.'
    },
    {
      id: 'speed',
      title: 'Desafío contra el Tiempo',
      icon: '⚡',
      tag: '60 segundos de emoción',
      desc: 'Responde la mayor cantidad de desafíos matemáticos posibles antes de que termine el cronómetro.'
    },
    {
      id: 'drag',
      title: 'Arrastra y Completa',
      icon: '🧩',
      tag: 'Asociación y lógica',
      desc: 'Arrastra o toca cada ficha numérica para completar las operaciones faltantes.'
    },
    {
      id: 'detective',
      title: 'Detective Matemático',
      icon: '🕵️',
      tag: 'Pistas y deducción',
      desc: 'Sigue las 3 pistas misteriosas para descubrir el número secreto y abrir la caja fuerte.'
    }
  ],

  // Renderizar catálogo de juegos
  renderGamesMenu() {
    const container = document.getElementById('gamesModuleContainer');
    if (!container) return;

    let cardsHtml = '';
    this.GAMES_LIST.forEach(game => {
      cardsHtml += `
        <div class="game-hub-card" onclick="GamesModule.launchGame('${game.id}')">
          <div class="game-icon-circle">${game.icon}</div>
          <span class="game-tag-pill">${game.tag}</span>
          <h3 class="game-title">${game.title}</h3>
          <p class="game-desc">${game.desc}</p>
          <button class="btn-play-game">¡Jugar Ahora! ▶</button>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="games-hub-header">
        <h2>🎮 Sala de Juegos y Desafíos Matemáticos</h2>
        <p>Aprende jugando con 7 dinámicas entretenidas diseñadas para evitar la monotonía.</p>
      </div>
      <div class="games-hub-grid">
        ${cardsHtml}
      </div>
    `;
  },

  launchGame(gameId) {
    this.activeGame = gameId;
    this.gameScore = 0;
    this.gameStreak = 0;
    AudioManager.playClick();

    const container = document.getElementById('gamesModuleContainer');
    if (gameId === 'memory') this.initMemoryGame(container);
    else if (gameId === 'catch') this.initCatchGame(container);
    else if (gameId === 'builder') this.initBuilderGame(container);
    else if (gameId === 'who') this.initWhoGame(container);
    else if (gameId === 'speed') this.initSpeedGame(container);
    else if (gameId === 'drag') this.initDragGame(container);
    else if (gameId === 'detective') this.initDetectiveGame(container);
  },

  renderGameHeader(container, title, icon, onReset) {
    return `
      <div class="game-play-header">
        <button class="btn-back" onclick="GamesModule.renderGamesMenu()">
          <span>←</span> Volver a Juegos
        </button>
        <div class="game-title-badge">
          <span class="icon">${icon}</span>
          <h3>${title}</h3>
        </div>
        <div class="game-header-stats">
          <span class="game-stat-pill">⭐ Racha: <strong id="gameStreakDisplay">0</strong></span>
        </div>
      </div>
    `;
  },

  // ==========================================
  // JUEGO 1: MEMORIA MATEMÁTICA
  // ==========================================
  memoryState: {
    cards: [],
    flipped: [],
    matchedCount: 0,
    totalPairs: 6
  },

  initMemoryGame(container) {
    // Generar 6 pares aleatorios de operaciones y sus resultados
    const ops = [
      { op: '3 × 4', val: 12 },
      { op: '6 × 7', val: 42 },
      { op: '8 × 5', val: 40 },
      { op: '9 × 3', val: 27 },
      { op: '4 × 6', val: 24 },
      { op: '7 × 7', val: 49 },
      { op: '5 × 5', val: 25 },
      { op: '8 × 8', val: 64 },
      { op: '9 × 6', val: 54 },
      { op: '2 × 9', val: 18 }
    ].sort(() => 0.5 - Math.random()).slice(0, 6);

    const cards = [];
    ops.forEach((p, i) => {
      cards.push({ id: `op_${i}`, pairId: i, text: p.op, type: 'op' });
      cards.push({ id: `val_${i}`, pairId: i, text: String(p.val), type: 'val' });
    });

    // Mezclar cartas
    cards.sort(() => 0.5 - Math.random());

    this.memoryState = {
      cards: cards,
      flipped: [],
      matchedCount: 0,
      totalPairs: ops.length
    };

    container.innerHTML = `
      ${this.renderGameHeader(container, 'Memoria Matemática', '🧠')}
      <div class="memory-game-wrap">
        <p class="game-instruction">Toca dos cartas para emparejar la multiplicación con su resultado correcto.</p>
        <div class="memory-grid" id="memoryGrid">
          ${cards.map((c, idx) => `
            <div class="memory-card" id="card-${idx}" onclick="GamesModule.flipMemoryCard(${idx})">
              <div class="card-face card-back">❓</div>
              <div class="card-face card-front ${c.type === 'op' ? 'face-op' : 'face-val'}">${c.text}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  flipMemoryCard(index) {
    const st = this.memoryState;
    const cardEl = document.getElementById(`card-${index}`);

    if (!cardEl || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;
    if (st.flipped.length >= 2) return;

    AudioManager.playCardFlip();
    cardEl.classList.add('flipped');
    st.flipped.push({ index, card: st.cards[index] });

    if (st.flipped.length === 2) {
      const [first, second] = st.flipped;
      if (first.card.pairId === second.card.pairId) {
        // Coincidencia acertada!
        setTimeout(() => {
          const card1El = document.getElementById(`card-${first.index}`);
          const card2El = document.getElementById(`card-${second.index}`);
          if (card1El) card1El.classList.add('matched');
          if (card2El) card2El.classList.add('matched');
          AudioManager.playSuccess();
          if (card1El && typeof App !== 'undefined' && App.spawnConfetti) {
            const r = card1El.getBoundingClientRect();
            App.spawnConfetti(r.left + r.width / 2, r.top + r.height / 2, 14);
          }
          st.matchedCount++;
          st.flipped = [];

          if (st.matchedCount === st.totalPairs) {
            // Ganó el juego de memoria
            if (typeof App !== 'undefined' && App.spawnConfetti) {
              App.spawnConfetti(window.innerWidth / 2, window.innerHeight / 3, 35);
            }
            setTimeout(() => GamesModule.finishGame('Memoria Matemática', 120, 'memoria_brillante'), 600);
          }
        }, 400);
      } else {
        // No coinciden, voltear de regreso
        setTimeout(() => {
          document.getElementById(`card-${first.index}`).classList.remove('flipped');
          document.getElementById(`card-${second.index}`).classList.remove('flipped');
          AudioManager.playTryAgain();
          st.flipped = [];
        }, 900);
      }
    }
  },

  // ==========================================
  // JUEGO 2: ATRAPA EL RESULTADO (BALLOONS / ORBS)
  // ==========================================
  catchState: {
    round: 0,
    totalRounds: 5,
    currentOp: null
  },

  initCatchGame(container) {
    this.catchState.round = 0;
    this.catchState.score = 0;
    this.renderCatchRound(container);
  },

  renderCatchRound(container) {
    const st = this.catchState;
    if (st.round >= st.totalRounds) {
      this.finishGame('Atrapa el Resultado', 100, 'relampago');
      return;
    }

    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    const correct = a * b;

    // Distractores
    const options = [correct];
    while (options.length < 4) {
      const diff = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1) * a;
      const opt = Math.max(2, correct + diff);
      if (!options.includes(opt)) options.push(opt);
    }
    options.sort(() => 0.5 - Math.random());

    st.currentOp = { a, b, correct };

    container.innerHTML = `
      ${this.renderGameHeader(container, 'Atrapa el Resultado', '🎈')}
      <div class="catch-game-wrap">
        <div class="catch-target-card">
          <span class="catch-label">Ronda ${st.round + 1} de ${st.totalRounds}: ¡Atrapa el número correcto!</span>
          <div class="catch-op-big">${a} × ${b} = <span class="pulse-quest">?</span></div>
        </div>

        <div class="catch-bubble-field">
          ${options.map((val, idx) => `
            <div class="catch-bubble bubble-color-${idx % 4}" onclick="GamesModule.handleCatchAnswer(${val}, ${correct}, this)">
              <span>${val}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  handleCatchAnswer(chosen, correct, el) {
    if (chosen === correct) {
      el.classList.add('pop-correct');
      AudioManager.playSuccess();
      const rect = el.getBoundingClientRect();
      if (typeof App !== 'undefined' && App.spawnConfetti) {
        App.spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
      }
      this.catchState.score++;
      this.catchState.round++;
      setTimeout(() => {
        const c = document.getElementById('gamesModuleContainer');
        if (c) this.renderCatchRound(c);
      }, 700);
    } else {
      el.classList.add('pop-wrong');
      AudioManager.playTryAgain();
    }
  },

  // ==========================================
  // JUEGO 3: CONSTRUYE LA MULTIPLICACIÓN (COPISI)
  // ==========================================
  builderState: {
    targetGroups: 3,
    targetItems: 4,
    currentGroups: 1,
    currentItems: 1
  },

  initBuilderGame(container) {
    const g = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
    const it = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)];

    this.builderState = {
      targetGroups: g,
      targetItems: it,
      currentGroups: 2,
      currentItems: 2
    };

    this.renderBuilderView(container);
  },

  renderBuilderView(container) {
    const st = this.builderState;
    const targetResult = st.targetGroups * st.targetItems;
    const currentTotal = st.currentGroups * st.currentItems;

    let basketsHtml = '';
    for (let i = 1; i <= st.currentGroups; i++) {
      let itemsInside = '';
      for (let j = 1; j <= st.currentItems; j++) {
        itemsInside += '<span class="builder-item">🍪</span>';
      }
      basketsHtml += `
        <div class="builder-box">
          <span class="builder-box-tag">Caja #${i}</span>
          <div class="builder-box-content">${itemsInside}</div>
        </div>
      `;
    }

    container.innerHTML = `
      ${this.renderGameHeader(container, 'Construye la Multiplicación', '🧱')}
      <div class="builder-wrap">
        <div class="builder-mission-card">
          <span class="mission-tag">MISIÓN COPISI</span>
          <h3>Construye la operación: <span class="highlight-text">${st.targetGroups} × ${st.targetItems}</span></h3>
          <p>Necesitas tener exactamente <strong>${st.targetGroups} cajas</strong> con <strong>${st.targetItems} galletas</strong> en cada una.</p>
        </div>

        <div class="builder-controls-panel">
          <div class="control-row">
            <label>📦 Cantidad de Cajas (Grupos):</label>
            <div class="stepper">
              <button class="btn-step" onclick="GamesModule.adjustBuilder('groups', -1)">-</button>
              <span class="step-val">${st.currentGroups}</span>
              <button class="btn-step" onclick="GamesModule.adjustBuilder('groups', 1)">+</button>
            </div>
          </div>
          <div class="control-row">
            <label>🍪 Galletas por Caja (Elementos):</label>
            <div class="stepper">
              <button class="btn-step" onclick="GamesModule.adjustBuilder('items', -1)">-</button>
              <span class="step-val">${st.currentItems}</span>
              <button class="btn-step" onclick="GamesModule.adjustBuilder('items', 1)">+</button>
            </div>
          </div>
        </div>

        <div class="builder-stage">
          ${basketsHtml}
        </div>

        <div class="builder-verify-row">
          <div class="builder-current-calc">
            Tu construcción actual: <strong>${st.currentGroups} × ${st.currentItems} = ${currentTotal}</strong> galletas.
          </div>
          <button class="btn-primary btn-large" onclick="GamesModule.checkBuilder()">
            ✅ ¡Verificar mi Construcción!
          </button>
        </div>

        <div id="builderFeedback"></div>
      </div>
    `;
  },

  adjustBuilder(type, delta) {
    const st = this.builderState;
    if (type === 'groups') {
      st.currentGroups = Math.max(1, Math.min(8, st.currentGroups + delta));
    } else {
      st.currentItems = Math.max(1, Math.min(8, st.currentItems + delta));
    }
    AudioManager.playClick();
    const c = document.getElementById('gamesModuleContainer');
    if (c) this.renderBuilderView(c);
  },

  checkBuilder() {
    const st = this.builderState;
    const fb = document.getElementById('builderFeedback');
    if (st.currentGroups === st.targetGroups && st.currentItems === st.targetItems) {
      AudioManager.playSuccess();
      if (typeof App !== 'undefined' && App.spawnConfetti) {
        App.spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 28);
      }
      fb.innerHTML = `
        <div class="feedback-toast success anim-snap-success">
          🎉 ¡Perfecto! Construiste ${st.targetGroups} grupos de ${st.targetItems} = ${st.targetGroups * st.targetItems}.
        </div>
      `;
      setTimeout(() => this.finishGame('Construye la Multiplicación', 110, 'arquitecto'), 1200);
    } else {
      AudioManager.playTryAgain();
      fb.innerHTML = `
        <div class="feedback-toast warning">
          👀 Revisa bien: Necesitas ${st.targetGroups} cajas (tienes ${st.currentGroups}) y ${st.targetItems} galletas por caja (tienes ${st.currentItems}). ¡Tú puedes!
        </div>
      `;
    }
  },

  // ==========================================
  // JUEGO 4: ¿QUIÉN TIENE LA RESPUESTA?
  // ==========================================
  whoState: {
    round: 0,
    totalRounds: 4,
    score: 0
  },

  initWhoGame(container) {
    this.whoState.round = 0;
    this.whoState.score = 0;
    this.renderWhoRound(container);
  },

  renderWhoRound(container) {
    const st = this.whoState;
    if (st.round >= st.totalRounds) {
      this.finishGame('¿Quién tiene la respuesta?', 100);
      return;
    }

    const scenarios = [
      { text: 'En la biblioteca hay 6 estantes con 8 libros cada uno. ¿Cuántos libros hay en total?', a: 6, b: 8, correct: 48 },
      { text: 'Para la fiesta se compraron 7 bolsas con 9 globos cada una. ¿Cuántos globos hay en total?', a: 7, b: 9, correct: 63 },
      { text: 'Un paquete de galletas tiene 5 galletas. Si compro 8 paquetes, ¿cuántas galletas tengo?', a: 5, b: 8, correct: 40 },
      { text: 'En el huerto escolar se plantaron 4 filas con 7 lechugas en cada fila. ¿Cuántas lechugas hay?', a: 4, b: 7, correct: 28 }
    ];

    const currentScenario = scenarios[st.round % scenarios.length];
    const correctVal = currentScenario.correct;

    // 4 personajes
    const characters = [
      { name: 'Búho Sabio', avatar: 'avatar_buho.svg' },
      { name: 'Zorro Veloz', avatar: 'avatar_zorro.svg' },
      { name: 'Astronauta Pepo', avatar: 'avatar_astronauta.svg' },
      { name: 'Robot Chispa', avatar: 'avatar_robot.svg' }
    ];

    // Opciones numéricas
    const options = [correctVal];
    while (options.length < 4) {
      const diff = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 4) + 1) * currentScenario.a;
      const fake = Math.max(6, correctVal + diff);
      if (!options.includes(fake)) options.push(fake);
    }
    options.sort(() => 0.5 - Math.random());

    // Asignar opciones a personajes
    const assigned = characters.map((c, i) => ({ ...c, val: options[i], isCorrect: options[i] === correctVal }));

    container.innerHTML = `
      ${this.renderGameHeader(container, '¿Quién tiene la respuesta?', '🎭')}
      <div class="who-wrap">
        <div class="who-problem-box">
          <span class="who-badge">Problema ${st.round + 1} de ${st.totalRounds}</span>
          <p class="who-story-text">"${currentScenario.text}"</p>
          <div class="who-op-hint">Operación: ${currentScenario.a} × ${currentScenario.b}</div>
        </div>

        <div class="characters-grid">
          ${assigned.map((char, idx) => `
            <div class="char-choice-card" onclick="GamesModule.chooseCharacter(${char.isCorrect}, '${char.name}', ${correctVal}, this)">
              <div class="speech-bubble">
                <span class="speech-num">${char.val}</span>
              </div>
              <img src="IMAGEN/${char.avatar}" alt="${char.name}" class="char-avatar-img">
              <span class="char-name-label">${char.name}</span>
            </div>
          `).join('')}
        </div>

        <div id="whoFeedback"></div>
      </div>
    `;
  },

  chooseCharacter(isCorrect, name, correctVal, el) {
    const fb = document.getElementById('whoFeedback');
    document.querySelectorAll('.char-choice-card').forEach(c => c.style.pointerEvents = 'none');

    if (isCorrect) {
      el.classList.add('char-correct', 'anim-victory-jump');
      AudioManager.playSuccess();
      const rect = el.getBoundingClientRect();
      if (typeof App !== 'undefined' && App.spawnConfetti) {
        App.spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 22);
      }
      this.whoState.score++;
      fb.innerHTML = `
        <div class="feedback-toast success anim-snap-success">
          👏 ¡Acertaste! ${name} tenía la respuesta correcta (${correctVal}).
        </div>
      `;
    } else {
      el.classList.add('char-wrong');
      AudioManager.playTryAgain();
      fb.innerHTML = `
        <div class="feedback-toast warning">
          💡 Casi... La respuesta correcta era <strong>${correctVal}</strong>. ¡A la próxima lo lograrás!
        </div>
      `;
    }

    setTimeout(() => {
      this.whoState.round++;
      const c = document.getElementById('gamesModuleContainer');
      if (c) this.renderWhoRound(c);
    }, 1800);
  },

  // ==========================================
  // JUEGO 5: DESAFÍO CONTRA EL TIEMPO
  // ==========================================
  speedTimer: null,
  speedSeconds: 60,
  speedScore: 0,
  speedQuestion: null,

  initSpeedGame(container) {
    if (this.speedTimer) clearInterval(this.speedTimer);
    this.speedSeconds = 60;
    this.speedScore = 0;
    this.gameStreak = 0;

    container.innerHTML = `
      ${this.renderGameHeader(container, 'Desafío contra el Tiempo', '⚡')}
      <div class="speed-wrap">
        <div class="speed-status-bar">
          <div class="timer-box">
            ⏱️ <span id="speedTimerNum">60</span>s
          </div>
          <div class="score-box">
            Aciertos: <strong id="speedScoreNum">0</strong>
          </div>
        </div>

        <div class="speed-card" id="speedCardArea">
          <!-- Pregunta dinámica -->
        </div>
      </div>
    `;

    this.nextSpeedQuestion();

    // Iniciar reloj
    this.speedTimer = setInterval(() => {
      this.speedSeconds--;
      const timerEl = document.getElementById('speedTimerNum');
      if (timerEl) timerEl.textContent = this.speedSeconds;

      if (this.speedSeconds <= 0) {
        clearInterval(this.speedTimer);
        this.finishGame('Desafío contra el Tiempo', this.speedScore * 15, this.speedScore >= 8 ? 'relampago' : null);
      }
    }, 1000);
  },

  nextSpeedQuestion() {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 9) + 2;
    const correct = a * b;

    const options = [correct];
    while (options.length < 4) {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1) * a;
      const fake = Math.max(4, correct + delta);
      if (!options.includes(fake)) options.push(fake);
    }
    options.sort(() => 0.5 - Math.random());

    const area = document.getElementById('speedCardArea');
    if (!area) return;

    area.innerHTML = `
      <div class="speed-question-op">${a} × ${b}</div>
      <div class="speed-options-row">
        ${options.map(opt => `
          <button class="btn-speed-opt" onclick="GamesModule.handleSpeedAnswer(${opt}, ${correct})">
            ${opt}
          </button>
        `).join('')}
      </div>
    `;
  },

  handleSpeedAnswer(chosen, correct) {
    if (chosen === correct) {
      AudioManager.playSuccess();
      this.speedScore++;
      this.gameStreak++;
      if (this.speedScore % 5 === 0) {
        StorageManager.unlockBadge('relampago');
      }
    } else {
      AudioManager.playTryAgain();
      this.gameStreak = 0;
    }

    const sEl = document.getElementById('speedScoreNum');
    if (sEl) sEl.textContent = this.speedScore;
    const streakEl = document.getElementById('gameStreakDisplay');
    if (streakEl) streakEl.textContent = this.gameStreak;

    this.nextSpeedQuestion();
  },

  // ==========================================
  // JUEGO 6: ARRASTRA Y COMPLETA (BLOQUEO DEFINITIVO ANTI-ACHUNTE)
  // ==========================================
  dragState: {
    pairs: [],
    slotsResolved: 0,
    correctCount: 0,
    wrongCount: 0,
    selectedTile: null
  },

  initDragGame(container) {
    // Banco de operaciones con pistas pedagógicas
    const poolBank = [
      { id: 1, opText: '7 × [?] = 28', missing: 4, hint: '7 × 4 = 28' },
      { id: 2, opText: '[?] × 6 = 36', missing: 6, hint: '6 × 6 = 36' },
      { id: 3, opText: '9 × 5 = [?]', missing: 45, hint: '9 × 5 = 45' },
      { id: 4, opText: '8 × [?] = 56', missing: 7, hint: '8 × 7 = 56' },
      { id: 5, opText: '[?] × 4 = 32', missing: 8, hint: '8 × 4 = 32' },
      { id: 6, opText: '6 × 8 = [?]', missing: 48, hint: '6 × 8 = 48' },
      { id: 7, opText: '3 × [?] = 27', missing: 9, hint: '3 × 9 = 27' },
      { id: 8, opText: '[?] × 9 = 81', missing: 9, hint: '9 × 9 = 81' },
      { id: 9, opText: '5 × [?] = 40', missing: 8, hint: '5 × 8 = 40' },
      { id: 10, opText: '4 × 7 = [?]', missing: 28, hint: '4 × 7 = 28' }
    ];

    // Seleccionar 4 operaciones aleatorias
    const pool = [...poolBank].sort(() => 0.5 - Math.random()).slice(0, 4);

    this.dragState = {
      pairs: pool,
      slotsResolved: 0,
      correctCount: 0,
      wrongCount: 0,
      selectedTile: null
    };

    const tiles = pool.map(p => p.missing).sort(() => 0.5 - Math.random());

    container.innerHTML = `
      ${this.renderGameHeader(container, 'Arrastra y Completa', '🧩')}
      <div class="drag-wrap">
        
        <!-- Marcador en vivo del estado del juego -->
        <div class="drag-live-scoreboard">
          <div class="drag-score-chip chip-correct">
            <span>✔ Correctas:</span> <strong id="dragScoreCorrect">0</strong>/4
          </div>
          <div class="drag-score-chip chip-locked">
            <span>🔒 Bloqueadas:</span> <strong id="dragScoreWrong">0</strong>/4
          </div>
          <div class="drag-score-chip chip-pending">
            <span>⏳ Pendientes:</span> <strong id="dragScorePending">4</strong>/4
          </div>
        </div>

        <p class="game-instruction">
          Arrastra (o toca) una ficha de abajo y colócala en su casilla.
          <br><strong>⚠️ ¡Cuidado con el achunte! Si te equivocas, la respuesta se bloqueará definitivamente con ❌ sin poder repetirla. ¡Aún así podrás seguir jugando las demás operaciones hasta terminarlas todas!</strong>
        </p>

        <div class="drag-slots-list" id="dragSlotsList">
          ${pool.map((p, idx) => `
            <div class="drag-slot-row" id="slotRow-${idx}">
              <span class="slot-op">${p.opText.replace('[?]', '')}</span>
              <div class="drop-target-box" id="dropSlot-${idx}" data-expected="${p.missing}" data-index="${idx}" onclick="GamesModule.placeSelectedTile(${idx})">
                <span class="placeholder-text">¿Qué número va aquí?</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Banner informativo pedagógico dinámico -->
        <div id="dragPedagogicalNotice" class="drag-pedagogical-notice" style="display: none;"></div>

        <div class="drag-tiles-tray" id="tilesTray">
          ${tiles.map((num, idx) => `
            <div class="drag-tile anim-float-tile" id="dragTile-${idx}" draggable="true" data-num="${num}" onclick="GamesModule.selectTile(${num}, this)" ondragstart="GamesModule.handleDragStart(event, ${num})">
              ${num}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Soporte Drag and Drop nativo
    pool.forEach((p, idx) => {
      const slot = document.getElementById(`dropSlot-${idx}`);
      if (slot) {
        slot.addEventListener('dragover', (e) => {
          if (slot.classList.contains('slot-resolved')) return;
          e.preventDefault();
        });
        slot.addEventListener('drop', (e) => {
          if (slot.classList.contains('slot-resolved')) return;
          e.preventDefault();
          const val = Number(e.dataTransfer.getData('text/plain'));
          if (!isNaN(val)) {
            GamesModule.applyTileToSlot(idx, val);
          }
        });
      }
    });
  },

  handleDragStart(e, num) {
    e.dataTransfer.setData('text/plain', String(num));
    this.selectTile(num, e.currentTarget);
  },

  selectTile(num, tileEl) {
    document.querySelectorAll('.drag-tile').forEach(t => t.classList.remove('selected'));
    tileEl.classList.add('selected');
    this.dragState.selectedTile = { num, el: tileEl };
    AudioManager.playClick();
  },

  placeSelectedTile(slotIdx) {
    const slot = document.getElementById(`dropSlot-${slotIdx}`);
    if (!slot || slot.classList.contains('slot-resolved')) return;

    if (!this.dragState.selectedTile) {
      slot.classList.add('pulse-attention');
      setTimeout(() => slot.classList.remove('pulse-attention'), 400);
      return;
    }
    this.applyTileToSlot(slotIdx, this.dragState.selectedTile.num);
  },

  applyTileToSlot(slotIdx, num) {
    const slot = document.getElementById(`dropSlot-${slotIdx}`);
    if (!slot || slot.classList.contains('slot-resolved')) return;

    const expected = Number(slot.getAttribute('data-expected'));
    const currentPair = this.dragState.pairs[slotIdx];
    const noticeEl = document.getElementById('dragPedagogicalNotice');

    if (num === expected) {
      // ==========================================
      // CASO ACIERTO: BLOQUEAR COMO CORRECTA (VERDE)
      // ==========================================
      AudioManager.playSuccess();
      slot.classList.add('slot-resolved', 'filled-correct', 'anim-snap-success');
      slot.innerHTML = `
        <div class="resolved-correct-box">
          <span class="filled-val">${num}</span>
          <span class="tag-correct-check">✔ ¡Correcto!</span>
        </div>
      `;
      slot.onclick = null;

      // Ocultar la ficha usada
      if (this.dragState.selectedTile && this.dragState.selectedTile.el) {
        this.dragState.selectedTile.el.style.visibility = 'hidden';
      } else {
        const matchingTile = document.querySelector(`.drag-tile[data-num="${num}"]:not([style*="hidden"])`);
        if (matchingTile) matchingTile.style.visibility = 'hidden';
      }

      // Animación de partículas y confeti en la casilla
      const rect = slot.getBoundingClientRect();
      if (typeof App !== 'undefined' && App.spawnConfetti) {
        App.spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
      }

      this.dragState.correctCount++;
      this.dragState.slotsResolved++;
      this.dragState.selectedTile = null;
      document.querySelectorAll('.drag-tile').forEach(t => t.classList.remove('selected'));

      if (noticeEl) {
        noticeEl.style.display = 'flex';
        noticeEl.className = 'drag-pedagogical-notice notice-success';
        noticeEl.innerHTML = `<span>🎉 ¡Excelente cálculo! ${currentPair.opText.replace('[?]', num)}</span>`;
      }

    } else {
      // ==========================================
      // CASO ERROR: BLOQUEO DEFINITIVO DE LA RESPUESTA (ROJO)
      // "la respuesta incorrecta se bloquee definitivamente no temporalmente pero que aun asi siga el juego"
      // ==========================================
      AudioManager.playTryAgain();
      slot.classList.add('slot-resolved', 'slot-locked-wrong', 'anim-stamp-lock');
      slot.innerHTML = `
        <div class="wrong-lock-box">
          <span class="lock-icon-stamp">🔒</span>
          <div class="wrong-lock-text">
            <strong>❌ ${num} (Incorrecto)</strong>
            <small>Bloqueada definitivamente • Era ${expected}</small>
          </div>
        </div>
      `;
      slot.onclick = null;

      // La ficha regresa a la bandeja con animación de sacudida
      const wrongTile = document.querySelector(`.drag-tile[data-num="${num}"]`);
      if (wrongTile) {
        wrongTile.classList.add('tile-returned-shake');
        setTimeout(() => wrongTile.classList.remove('tile-returned-shake'), 800);
      }

      this.dragState.wrongCount++;
      this.dragState.slotsResolved++;
      this.dragState.selectedTile = null;
      document.querySelectorAll('.drag-tile').forEach(t => t.classList.remove('selected'));

      if (noticeEl) {
        noticeEl.style.display = 'flex';
        noticeEl.className = 'drag-pedagogical-notice notice-error';
        noticeEl.innerHTML = `<span>🔒 <strong>Respuesta bloqueada:</strong> ${num} no era la respuesta. (Pista: ${currentPair.hint}). ¡Continúa con las demás operaciones!</span>`;
      }
    }

    // Actualizar marcadores en vivo
    const cEl = document.getElementById('dragScoreCorrect');
    const wEl = document.getElementById('dragScoreWrong');
    const pEl = document.getElementById('dragScorePending');
    if (cEl) cEl.textContent = this.dragState.correctCount;
    if (wEl) wEl.textContent = this.dragState.wrongCount;
    if (pEl) pEl.textContent = (4 - this.dragState.slotsResolved);

    // ==========================================
    // VERIFICAR SI TERMINARON TODAS LAS OPERACIONES
    // ==========================================
    if (this.dragState.slotsResolved >= this.dragState.pairs.length) {
      setTimeout(() => {
        this.finishDragGameResults();
      }, 900);
    }
  },

  finishDragGameResults() {
    const total = 4;
    const correct = this.dragState.correctCount;
    const wrong = this.dragState.wrongCount;
    const points = Math.max(20, correct * 30 + (correct === 4 ? 20 : 0));
    const stars = correct === 4 ? 3 : correct >= 2 ? 2 : 1;

    StorageManager.addPoints(points);
    StorageManager.addStars(stars);
    if (correct >= 3) StorageManager.unlockBadge('arquitecto');

    AudioManager.playFanfare();

    // Gran explosión festiva si tuvo buen resultado
    if (typeof App !== 'undefined' && App.spawnConfetti) {
      App.spawnConfetti(window.innerWidth / 2, window.innerHeight / 3, 40);
    }

    const container = document.getElementById('gamesModuleContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="game-win-card anim-pop-bounce">
        <div class="win-trophy anim-trophy-wobble">🏆</div>
        <h2>¡Desafío Arrastra y Completa Finalizado!</h2>
        <p class="drag-results-summary">
          Completaste todas las operaciones:
          <br><strong class="text-success">✔ ${correct} Correctas</strong> • <strong class="text-danger">🔒 ${wrong} Bloqueadas</strong>
        </p>
        
        <div class="result-stars anim-stars-glow">
          ${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}
        </div>

        <div class="reward-pill anim-glow-pill">
          <span>+${points} Puntos de Aventura</span> • <span>+${stars} Estrellas</span>
        </div>

        <p class="result-message">
          ${correct === 4 
            ? '🌟 ¡Perfecto! Dominio absoluto sin jugar al achunte. ¡Todas correctas a la primera!' 
            : correct >= 2 
            ? '👏 ¡Buen desempeño! Recuerda pensar en las tablas antes de responder para no bloquear casillas.' 
            : '💪 ¡Ánimo! El cálculo mental requiere práctica. ¡Inténtalo de nuevo con nuevas operaciones!'}
        </p>

        <div class="win-actions">
          <button class="btn-primary anim-btn-pulse" onclick="GamesModule.launchGame('drag')">
            🔄 Jugar otra ronda (Nuevas operaciones)
          </button>
          <button class="btn-secondary" onclick="GamesModule.renderGamesMenu()">
            🎮 Volver a la Sala de Juegos
          </button>
          <button class="btn-accent" onclick="App.showView('menu')">
            🏠 Menú Principal
          </button>
        </div>
      </div>
    `;

    App.updateHeaderStats();
  },

  // ==========================================
  // JUEGO 7: DETECTIVE MATEMÁTICO
  // ==========================================
  detectiveState: {
    secretNum: 24,
    clues: []
  },

  initDetectiveGame(container) {
    const cases = [
      {
        secret: 24,
        clues: [
          '🔎 Pista 1: Pertenezco a la tabla del 6 y a la tabla del 4.',
          '🔎 Pista 2: Soy mayor que 20 y menor que 30.',
          '🔎 Pista 3: Si me divides en 3 partes iguales, cada parte es 8.'
        ]
      },
      {
        secret: 35,
        clues: [
          '🔎 Pista 1: Pertenezco a la tabla del 5 y a la tabla del 7.',
          '🔎 Pista 2: Termino en 5 y estoy entre el 30 y el 40.',
          '🔎 Pista 3: 7 veces 5 es exactamente mi valor.'
        ]
      },
      {
        secret: 48,
        clues: [
          '🔎 Pista 1: Soy múltiplo de 6 y de 8.',
          '🔎 Pista 2: Si me sumas 2, me convierto en 50.',
          '🔎 Pista 3: 6 × 8 da exactamente este número.'
        ]
      }
    ];

    const currentCase = cases[Math.floor(Math.random() * cases.length)];
    this.detectiveState = {
      secretNum: currentCase.secret,
      clues: currentCase.clues
    };

    container.innerHTML = `
      ${this.renderGameHeader(container, 'Detective Matemático', '🕵️')}
      <div class="detective-wrap">
        <div class="detective-case-file">
          <div class="case-header">
            <span class="stamp-confidential">CASO MATEMÁTICO MISTERIOSO</span>
            <h3>Descubre el Número Oculto</h3>
          </div>
          <div class="clues-list">
            ${currentCase.clues.map(c => `<div class="clue-item">${c}</div>`).join('')}
          </div>
        </div>

        <div class="safe-vault-box">
          <div class="vault-dial">
            <span class="vault-label">Ingresa el código secreto:</span>
            <input type="number" id="detectiveGuessInput" class="vault-input" placeholder="??" autofocus>
            <button class="btn-primary" onclick="GamesModule.checkDetectiveGuess()">
              🔓 Desbloquear Caja Fuerte
            </button>
          </div>
          <div id="detectiveFeedback"></div>
        </div>
      </div>
    `;
  },

  checkDetectiveGuess() {
    const input = document.getElementById('detectiveGuessInput');
    const guess = Number(input.value.trim());
    const fb = document.getElementById('detectiveFeedback');
    const secret = this.detectiveState.secretNum;

    if (guess === secret) {
      AudioManager.playFanfare();
      if (typeof App !== 'undefined' && App.spawnConfetti) {
        App.spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 35);
      }
      fb.innerHTML = `
        <div class="feedback-toast success anim-snap-success">
          🎉 ¡CASO RESUELTO! El número misterioso era efectivamente <strong>${secret}</strong>. ¡Gran trabajo de detective!
        </div>
      `;
      setTimeout(() => this.finishGame('Detective Matemático', 120, 'detective'), 1400);
    } else {
      AudioManager.playTryAgain();
      fb.innerHTML = `
        <div class="feedback-toast warning anim-stamp-lock">
          🧐 Ese no es el código. Lee las pistas cuidadosamente e intenta otro número.
        </div>
      `;
    }
  },

  // ==========================================
  // FINALIZACIÓN COMÚN DE JUEGOS
  // ==========================================
  finishGame(gameName, pointsEarned, badgeId = null) {
    if (this.speedTimer) clearInterval(this.speedTimer);

    StorageManager.addPoints(pointsEarned);
    StorageManager.addStars(2);
    if (badgeId) StorageManager.unlockBadge(badgeId);

    AudioManager.playFanfare();
    if (typeof App !== 'undefined' && App.spawnConfetti) {
      App.spawnConfetti(window.innerWidth / 2, window.innerHeight / 3, 38);
    }

    const container = document.getElementById('gamesModuleContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="game-win-card anim-pop-bounce">
        <div class="win-trophy anim-trophy-wobble">🏆</div>
        <h2>¡Desafío Superado en ${gameName}!</h2>
        <p>Demostraste tu gran habilidad matemática y razonamiento lógico.</p>
        
        <div class="reward-pill">
          <span>+${pointsEarned} Puntos</span> • <span>+2 Estrellas</span>
        </div>

        <div class="win-actions">
          <button class="btn-primary" onclick="GamesModule.launchGame('${this.activeGame}')">
            🔄 Jugar otra ronda
          </button>
          <button class="btn-secondary" onclick="GamesModule.renderGamesMenu()">
            🎮 Volver al menú de juegos
          </button>
          <button class="btn-accent" onclick="App.showView('menu')">
            🏠 Menú Principal
          </button>
        </div>
      </div>
    `;

    App.updateHeaderStats();
  }
};
