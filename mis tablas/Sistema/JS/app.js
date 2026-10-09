// Controlador Principal de la Aplicación - MIS TABLAS 4° BÁSICO

const App = {
  currentView: 'menu',

  init() {
    // 1. Validar si el estudiante ingresó correctamente
    if (!StorageManager.hasRegisteredStudent()) {
      // Redirigir al inicio de sesión si no hay datos
      window.location.href = '../index.html';
      return;
    }

    // 2. Inicializar sistema de audio
    AudioManager.init();

    // 3. Renderizar barra superior con datos del estudiante
    this.updateHeaderStats();

    // 4. Mostrar vista por defecto (Menú Principal)
    this.showView('menu');

    // 5. Soporte para eventos táctiles / responsive
    this.setupListeners();
  },

  setupListeners() {
    // Escuchador global de interacción para activar AudioContext en navegadores
    document.addEventListener('click', () => {
      AudioManager.ensureContext();
    }, { once: true });
  },

  // Sistema de partículas y confeti festivo para animaciones
  spawnConfetti(x = null, y = null, count = 28) {
    const originX = (x !== null) ? x : (window.innerWidth / 2);
    const originY = (y !== null) ? y : (window.innerHeight / 3);
    const colors = ['#FFD54F', '#FF5252', '#40C4FF', '#69F0AE', '#E040FB', '#FFAB00', '#7C4DFF'];
    const emojis = ['⭐', '✨', '🎉', '🌟', '💎', '★', '🍎', '🎈'];

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-particle';
      const isEmoji = Math.random() > 0.65;
      if (isEmoji) {
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.fontSize = (Math.random() * 14 + 14) + 'px';
      } else {
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.width = (Math.random() * 10 + 6) + 'px';
        p.style.height = (Math.random() * 10 + 6) + 'px';
        p.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
      }

      p.style.left = originX + 'px';
      p.style.top = originY + 'px';

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 190 + 80;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 70; // Impulso hacia arriba

      p.style.setProperty('--vx', `${vx}px`);
      p.style.setProperty('--vy', `${vy}px`);
      p.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);

      document.body.appendChild(p);
      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 1400);
    }
  },

  // Actualizar datos del estudiante en el Header
  updateHeaderStats() {
    const student = StorageManager.getStudent();
    const avatarInfo = StorageManager.AVATARS[student.avatar] || StorageManager.AVATARS.buho;
    const levelInfo = StorageManager.calculateLevel(student.score);
    const overallProgress = StorageManager.getOverallProgress();

    // Header elements
    const studentNameEl = document.getElementById('headerStudentName');
    const studentAvatarEl = document.getElementById('headerStudentAvatar');
    const studentLevelEl = document.getElementById('headerStudentLevel');
    const studentScoreEl = document.getElementById('headerStudentScore');
    const studentStarsEl = document.getElementById('headerStudentStars');
    const overallBarEl = document.getElementById('headerOverallProgress');
    const overallTextEl = document.getElementById('headerOverallText');

    if (studentNameEl) studentNameEl.textContent = student.name;
    if (studentAvatarEl) studentAvatarEl.src = `IMAGEN/${avatarInfo.file}`;
    if (studentLevelEl) studentLevelEl.innerHTML = `${levelInfo.icon} Nivel ${levelInfo.level}: ${levelInfo.title}`;
    if (studentScoreEl) studentScoreEl.textContent = student.score;
    if (studentStarsEl) studentStarsEl.textContent = student.stars;
    if (overallBarEl) overallBarEl.style.width = `${overallProgress}%`;
    if (overallTextEl) overallTextEl.textContent = `${overallProgress}%`;
  },

  // Cambiar entre vistas de la plataforma
  showView(viewName, extraParam = null) {
    this.currentView = viewName;
    AudioManager.playClick();

    // Ocultar todas las secciones
    const views = ['menu', 'learning', 'games', 'progress', 'badges', 'simce'];
    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) el.style.display = (v === viewName) ? 'block' : 'none';
    });

    // Actualizar botones de navegación activos
    document.querySelectorAll('.nav-link, .bottom-nav-item').forEach(btn => {
      if (btn.getAttribute('data-view') === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Cargar lógica específica de la vista
    if (viewName === 'menu') {
      this.renderMainMenu();
    } else if (viewName === 'learning') {
      if (extraParam) {
        LearningModule.openTable(extraParam);
      } else {
        LearningModule.init();
      }
    } else if (viewName === 'games') {
      if (extraParam) {
        GamesModule.launchGame(extraParam);
      } else {
        GamesModule.renderGamesMenu();
      }
    } else if (viewName === 'progress') {
      this.renderProgressView();
    } else if (viewName === 'badges') {
      this.renderBadgesView();
    } else if (viewName === 'simce') {
      SimceModule.init();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.updateHeaderStats();
  },

  // ==========================================
  // ETAPA 2: MENÚ PRINCIPAL ATRACTIVO
  // ==========================================
  renderMainMenu() {
    const student = StorageManager.getStudent();
    const avatarInfo = StorageManager.AVATARS[student.avatar] || StorageManager.AVATARS.buho;
    const isSimceReady = StorageManager.isSimceUnlocked();
    const overallProgress = StorageManager.getOverallProgress();
    const completedCount = student.completedTables ? student.completedTables.length : 0;

    const container = document.getElementById('mainMenuContent');
    if (!container) return;

    // Renderizar Camino de Avance de las Tablas (2 al 10)
    let pathNodesHtml = '';
    const tablesList = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    tablesList.forEach((t, idx) => {
      const data = TablesData[t];
      const prog = student.tableProgress[String(t)] || { percent: 0, stars: 0 };
      const isDone = prog.percent >= 100;
      const isCurrent = !isDone && (idx === 0 || (student.tableProgress[String(tablesList[idx - 1])]?.percent >= 50));

      pathNodesHtml += `
        <div class="path-node ${isDone ? 'done' : isCurrent ? 'current' : 'locked'}" onclick="App.showView('learning', ${t});">
          <div class="node-circle" style="border-color: ${data.color};">
            <span class="node-emoji">${data.emoji}</span>
            <span class="node-num">${t}</span>
          </div>
          <span class="node-label">Tabla del ${t}</span>
          <span class="node-status">${isDone ? '★ Dominada' : prog.percent > 0 ? `${prog.percent}%` : 'Por explorar'}</span>
        </div>
      `;
    });

    container.innerHTML = `
      <!-- HERO BANNER DE BIENVENIDA -->
      <section class="menu-hero-card">
        <div class="hero-avatar-wrap">
          <img src="IMAGEN/${avatarInfo.file}" alt="${avatarInfo.name}" class="hero-avatar-img">
          <div class="hero-avatar-bubble">
            <span>¡Hola, <strong>${student.name}</strong>!</span>
            <small>¿Qué aventura matemática resolveremos hoy?</small>
          </div>
        </div>

        <div class="hero-summary-stats">
          <div class="summary-stat-box">
            <span class="stat-icon">🏆</span>
            <div class="stat-meta">
              <span class="stat-value">${student.score}</span>
              <span class="stat-name">Puntos Totales</span>
            </div>
          </div>

          <div class="summary-stat-box">
            <span class="stat-icon">⭐</span>
            <div class="stat-meta">
              <span class="stat-value">${student.stars}</span>
              <span class="stat-name">Estrellas</span>
            </div>
          </div>

          <div class="summary-stat-box">
            <span class="stat-icon">🎯</span>
            <div class="stat-meta">
              <span class="stat-value">${completedCount} / 9</span>
              <span class="stat-name">Tablas Maestras</span>
            </div>
          </div>
        </div>
      </section>

      <!-- CAMINO DE AVANCE DE LAS TABLAS (ROADMAP) -->
      <section class="roadmap-section">
        <div class="section-title-row">
          <h3>🗺️ Tu Camino de Aventura (Tablas del 2 al 10)</h3>
          <span class="roadmap-hint">Haz clic en cualquier isla para explorarla</span>
        </div>
        <div class="roadmap-trail-container">
          <div class="trail-line"></div>
          <div class="trail-nodes-row">
            ${pathNodesHtml}
          </div>
        </div>
      </section>

      <!-- TARJETAS PRINCIPALES DE ACCESO DIRECTO -->
      <section class="menu-cards-grid">
        
        <!-- Tarjeta 1: Aprender Tablas -->
        <div class="menu-action-card card-learning" onclick="App.showView('learning')">
          <div class="card-icon-bubble">📚</div>
          <div class="card-body">
            <h3>Aprender Tablas</h3>
            <p>Descubre patrones, visualiza grupos concretos (COPISI), matrices y trucos para no olvidar.</p>
            <span class="card-badge-pill">9 Módulos Interactivos</span>
          </div>
          <div class="card-arrow">➜</div>
        </div>

        <!-- Tarjeta 2: Juegos y Desafíos -->
        <div class="menu-action-card card-games" onclick="App.showView('games')">
          <div class="card-icon-bubble">🎮</div>
          <div class="card-body">
            <h3>Juegos y Desafíos</h3>
            <p>Memoria matemática, Atrapa el resultado, Detective secreto y más juegos sin monotonía.</p>
            <span class="card-badge-pill">7 Juegos Dinámicos</span>
          </div>
          <div class="card-arrow">➜</div>
        </div>

        <!-- Tarjeta 3: Progreso y Estadísticas -->
        <div class="menu-action-card card-progress" onclick="App.showView('progress')">
          <div class="card-icon-bubble">📊</div>
          <div class="card-body">
            <h3>Progreso y Puntaje</h3>
            <p>Revisa el porcentaje de dominio de cada tabla, historial de actividades y estadísticas.</p>
            <span class="card-badge-pill">${overallProgress}% Completado</span>
          </div>
          <div class="card-arrow">➜</div>
        </div>

        <!-- Tarjeta 4: Logros y Recompensas -->
        <div class="menu-action-card card-badges" onclick="App.showView('badges')">
          <div class="card-icon-bubble">🏆</div>
          <div class="card-body">
            <h3>Logros y Medallas</h3>
            <p>Desbloquea insignias especiales al superar desafíos y dominar las operaciones.</p>
            <span class="card-badge-pill">${student.badges.length} Desbloqueadas</span>
          </div>
          <div class="card-arrow">➜</div>
        </div>

      </section>

      <!-- TARJETA DESTACADA DEL ENSAYO SIMCE -->
      <section class="menu-simce-banner ${isSimceReady ? 'unlocked' : 'locked'}" onclick="App.showView('simce')">
        <div class="simce-banner-icon">
          ${isSimceReady ? '📝' : '🔒'}
        </div>
        <div class="simce-banner-text">
          <div class="simce-badge-tag">${isSimceReady ? '¡LISTO PARA RENDIR!' : 'MÓDULO DE EVALUACIÓN'}</div>
          <h3>Ensayo Matemático Tipo SIMCE (4° Básico)</h3>
          <p>
            ${isSimceReady 
              ? '10 preguntas contextualizadas en ferias, compras, salas de clases y situaciones de la vida real.' 
              : 'Acumula al menos 200 puntos o domina 2 tablas para habilitar este ensayo oficial.'}
          </p>
        </div>
        <button class="btn-banner-action">
          ${isSimceReady ? 'Comenzar Ensayo ▶' : 'Ver Requisitos 🔍'}
        </button>
      </section>
    `;
  },

  // ==========================================
  // VISTA: PROGRESO Y ESTADÍSTICAS
  // ==========================================
  renderProgressView() {
    const student = StorageManager.getStudent();
    const overallProgress = StorageManager.getOverallProgress();
    const container = document.getElementById('progressModuleContainer');
    if (!container) return;

    let tableRowsHtml = '';
    for (let t = 2; t <= 10; t++) {
      const data = TablesData[t];
      const prog = student.tableProgress[String(t)] || { percent: 0, stars: 0 };
      tableRowsHtml += `
        <div class="progress-table-item">
          <div class="p-item-left">
            <span class="p-emoji">${data.emoji}</span>
            <div>
              <strong>${data.title}</strong>
              <small>${data.name}</small>
            </div>
          </div>
          <div class="p-item-center">
            <div class="bar-shell">
              <div class="bar-fill" style="width: ${prog.percent}%; background-color: ${data.color};"></div>
            </div>
            <span class="p-percent">${prog.percent}%</span>
          </div>
          <div class="p-item-right">
            <span class="p-stars">${'★'.repeat(prog.stars)}${'☆'.repeat(3 - prog.stars)}</span>
            <button class="btn-p-practice" onclick="App.showView('learning', ${t});">Practicar</button>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="progress-view-header">
        <h2>📊 Tu Progreso Matemático General</h2>
        <p>Observa cómo avanzas hacia el dominio total de las multiplicaciones.</p>
      </div>

      <div class="overall-progress-card">
        <div class="radial-progress-box">
          <div class="radial-value">${overallProgress}%</div>
          <span class="radial-sub">Dominio Global</span>
        </div>
        <div class="overall-meta">
          <h3>Progreso del Estudiante</h3>
          <p>Puntaje acumulado: <strong>${student.score} puntos</strong></p>
          <p>Estrellas obtenidas: <strong>${student.stars} de 27 estrellas</strong></p>
          <p>Tablas completamente dominadas: <strong>${student.completedTables.length} de 9 tablas</strong></p>
          ${student.simceScore !== null ? `<p>Último resultado Ensayo SIMCE: <strong>${student.simceScore}% de logro</strong></p>` : ''}
        </div>
      </div>

      <div class="tables-progress-list">
        <h3>Detalle por cada Tabla de Multiplicar:</h3>
        ${tableRowsHtml}
      </div>
    `;
  },

  // ==========================================
  // VISTA: LOGROS Y MEDALLAS
  // ==========================================
  renderBadgesView() {
    const student = StorageManager.getStudent();
    const container = document.getElementById('badgesModuleContainer');
    if (!container) return;

    const allBadges = Object.values(StorageManager.BADGES);

    let badgesHtml = '';
    allBadges.forEach(b => {
      const isUnlocked = student.badges.includes(b.id);
      badgesHtml += `
        <div class="badge-item-card ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="badge-icon-wrap">
            <span class="badge-main-icon">${b.icon}</span>
            ${isUnlocked ? '<span class="badge-check">✔</span>' : '<span class="badge-lock">🔒</span>'}
          </div>
          <h4 class="badge-title">${b.title}</h4>
          <p class="badge-desc">${b.desc}</p>
          <span class="badge-status-tag">${isUnlocked ? '¡Desbloqueada!' : 'Por conseguir'}</span>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="badges-view-header">
        <h2>🏆 Vitrina de Trofeos y Medallas de Honor</h2>
        <p>Recompensas ganadas por tu esfuerzo, curiosidad y perseverancia matemática.</p>
      </div>

      <div class="badges-summary-banner">
        <span>Has conseguido <strong>${student.badges.length} de ${allBadges.length}</strong> medallas de la plataforma.</span>
      </div>

      <div class="badges-grid-layout">
        ${badgesHtml}
      </div>
    `;
  },

  // Cambiar usuario / Volver al login
  logout() {
    if (confirm('¿Deseas cambiar de estudiante o regresar a la pantalla de bienvenida?')) {
      window.location.href = '../index.html';
    }
  }
};

// Iniciar al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
