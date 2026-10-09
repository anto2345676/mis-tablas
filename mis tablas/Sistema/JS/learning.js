// Módulo de Aprendizaje Interactivo COPISI - MIS TABLAS 4° BÁSICO

const LearningModule = {
  currentTable: 2,
  currentFactor: 3,
  viewMode: 'groups', // 'groups' o 'matrix'
  activeTab: 'copisi', // 'copisi', 'pattern', 'cards', 'quiz'
  quizStep: 0,
  quizScore: 0,
  quizQuestions: [],

  // Inicializar o renderizar selector de tablas
  init() {
    this.renderTablesSelector();
  },

  // Selector de tablas del 2 al 10 en cuadrícula interactiva
  renderTablesSelector() {
    const container = document.getElementById('learningModuleContainer');
    if (!container) return;

    const student = StorageManager.getStudent();

    let cardsHtml = '';
    for (let t = 2; t <= 10; t++) {
      const data = TablesData[t];
      const prog = student.tableProgress[String(t)] || { percent: 0, stars: 0 };
      const isCompleted = prog.percent >= 100;

      cardsHtml += `
        <div class="table-select-card ${isCompleted ? 'completed' : ''}" style="--accent-color: ${data.color};" onclick="LearningModule.openTable(${t})">
          <div class="table-card-badge">${data.emoji}</div>
          <h3 class="table-card-title">${data.title}</h3>
          <p class="table-card-subtitle">${data.name}</p>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width: ${prog.percent}%; background-color: ${data.color};"></div>
          </div>
          <div class="table-card-footer">
            <span class="table-percent">${prog.percent}% Dominado</span>
            <span class="table-stars">${'★'.repeat(prog.stars)}${'☆'.repeat(3 - prog.stars)}</span>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="learning-header">
        <div class="header-titles">
          <h2>📚 Módulo de Aprendizaje Interactivo</h2>
          <p>Explora cómo funcionan las tablas con objetos reales, patrones y trucos divertidos.</p>
        </div>
      </div>
      <div class="tables-grid">
        ${cardsHtml}
      </div>
    `;
  },

  // Abrir tabla específica
  openTable(tableNum) {
    this.currentTable = tableNum;
    this.currentFactor = 3; // Iniciar en 3 por defecto para visualización rica
    this.activeTab = 'copisi';
    AudioManager.playClick();
    this.renderTableView();
  },

  // Vista detallada de una tabla seleccionada
  renderTableView() {
    const container = document.getElementById('learningModuleContainer');
    const data = TablesData[this.currentTable];
    const student = StorageManager.getStudent();
    const prog = student.tableProgress[String(this.currentTable)] || { percent: 0, stars: 0 };

    container.innerHTML = `
      <div class="table-detail-header" style="background: linear-gradient(135deg, ${data.color}, #1A237E);">
        <button class="btn-back" onclick="LearningModule.renderTablesSelector()">
          <span>←</span> Volver a Tablas
        </button>
        <div class="table-header-info">
          <h2>${data.emoji} ${data.title}: ${data.name}</h2>
          <p class="table-context">${data.contextExample}</p>
        </div>
        <div class="table-header-status">
          <span class="status-badge">${prog.percent}% completado</span>
          <button class="btn-audio-speak" onclick="AudioManager.speak('${data.pattern}. ${data.trick}')" title="Escuchar explicación con voz">
            🔊 Escuchar
          </button>
        </div>
      </div>

      <!-- Pestañas pedagógicas -->
      <div class="tabs-nav">
        <button class="tab-btn ${this.activeTab === 'copisi' ? 'active' : ''}" onclick="LearningModule.switchTab('copisi')">
          🧩 1. Concreto y Grupos
        </button>
        <button class="tab-btn ${this.activeTab === 'pattern' ? 'active' : ''}" onclick="LearningModule.switchTab('pattern')">
          📈 2. Saltos y Patrones
        </button>
        <button class="tab-btn ${this.activeTab === 'cards' ? 'active' : ''}" onclick="LearningModule.switchTab('cards')">
          🗂️ 3. Tabla Completa
        </button>
        <button class="tab-btn ${this.activeTab === 'quiz' ? 'active' : ''}" onclick="LearningModule.startTableQuiz()">
          ⭐ 4. Practica y Gana Estrellas
        </button>
      </div>

      <div class="tab-content" id="tabContentArea">
        <!-- Contenido dinámico según pestaña -->
      </div>
    `;

    this.renderCurrentTabContent();
  },

  switchTab(tabName) {
    this.activeTab = tabName;
    AudioManager.playClick();
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    this.renderTableView();
  },

  renderCurrentTabContent() {
    const area = document.getElementById('tabContentArea');
    if (!area) return;

    if (this.activeTab === 'copisi') {
      this.renderCopisiTab(area);
    } else if (this.activeTab === 'pattern') {
      this.renderPatternTab(area);
    } else if (this.activeTab === 'cards') {
      this.renderCardsTab(area);
    } else if (this.activeTab === 'quiz') {
      this.renderQuizStep(area);
    }
  },

  // 1. PESTAÑA COPISI: Grupos y Matrices
  renderCopisiTab(container) {
    const data = TablesData[this.currentTable];
    const t = this.currentTable;
    const f = this.currentFactor;
    const result = t * f;

    // Generar botones de factores 1 al 10
    let factorButtons = '';
    for (let i = 1; i <= 10; i++) {
      factorButtons += `
        <button class="factor-pill ${i === f ? 'active' : ''}" onclick="LearningModule.setFactor(${i})">
          ${t} × ${i}
        </button>
      `;
    }

    // Generar representación visual de grupos
    let visualHtml = '';
    if (this.viewMode === 'groups') {
      let groupsHtml = '';
      for (let g = 1; g <= t; g++) {
        let itemsInGroup = '';
        for (let it = 1; it <= f; it++) {
          const itemNum = (g - 1) * f + it;
          itemsInGroup += `<span class="group-item" title="Elemento #${itemNum}" onclick="LearningModule.animateItem(this)">${data.emoji}</span>`;
        }
        groupsHtml += `
          <div class="group-basket">
            <span class="basket-badge">Grupo ${g}</span>
            <div class="basket-items">${itemsInGroup}</div>
            <span class="basket-count">${f} ${data.objectName}</span>
          </div>
        `;
      }
      visualHtml = `
        <div class="groups-container">
          ${groupsHtml}
        </div>
      `;
    } else {
      // Modo matriz rectangular (filas × columnas)
      let matrixRows = '';
      for (let r = 1; r <= t; r++) {
        let cols = '';
        for (let c = 1; c <= f; c++) {
          cols += `<div class="matrix-cell" onclick="LearningModule.animateItem(this)">${data.emoji}</div>`;
        }
        matrixRows += `<div class="matrix-row"><span class="row-num">${r}</span>${cols}</div>`;
      }
      visualHtml = `
        <div class="matrix-container">
          <div class="matrix-header-cols">
            ${Array.from({ length: f }, (_, i) => `<span class="col-num">${i + 1}</span>`).join('')}
          </div>
          ${matrixRows}
        </div>
      `;
    }

    // Suma iterada format
    const additionList = Array(t).fill(f).join(' + ');

    container.innerHTML = `
      <div class="copisi-box">
        <div class="factor-selector-bar">
          <span class="selector-label">Multiplicar por:</span>
          <div class="factor-pills-row">${factorButtons}</div>
        </div>

        <div class="viewmode-toggle">
          <button class="btn-toggle ${this.viewMode === 'groups' ? 'active' : ''}" onclick="LearningModule.setViewMode('groups')">
            📦 Ver como Grupos Iguales
          </button>
          <button class="btn-toggle ${this.viewMode === 'matrix' ? 'active' : ''}" onclick="LearningModule.setViewMode('matrix')">
            ▦ Ver como Matriz (Filas × Columnas)
          </button>
        </div>

        <div class="formula-banner">
          <div class="formula-main">
            <span class="formula-op">${t} × ${f}</span>
            <span class="formula-equals">=</span>
            <span class="formula-res" id="formulaResult">${result}</span>
          </div>
          <div class="formula-expl">
            <p><strong>Significado:</strong> ${t} veces ${f} es igual a <strong>${result}</strong>.</p>
            <p><strong>Suma repetida:</strong> ${additionList} = <strong>${result}</strong></p>
          </div>
          <button class="btn-sound-small" onclick="AudioManager.speak('${t} por ${f} es igual a ${result}. Son ${t} grupos de ${f} ${data.objectName}.')">
            🔊 Escuchar
          </button>
        </div>

        <div class="visual-playground">
          ${visualHtml}
        </div>

        <div class="pedagogical-tip">
          <span class="tip-icon">💡</span>
          <p><strong>Propiedad Conmutativa:</strong> El orden de los factores no altera el producto. ¡${t} × ${f} da lo mismo que ${f} × ${t}! (Ambos dan ${result}).</p>
        </div>
      </div>
    `;
  },

  setFactor(factor) {
    this.currentFactor = factor;
    AudioManager.playClick();
    const area = document.getElementById('tabContentArea');
    if (area) this.renderCopisiTab(area);
  },

  setViewMode(mode) {
    this.viewMode = mode;
    AudioManager.playClick();
    const area = document.getElementById('tabContentArea');
    if (area) this.renderCopisiTab(area);
  },

  animateItem(el) {
    el.classList.add('pop-anim');
    AudioManager.playClick();
    setTimeout(() => el.classList.remove('pop-anim'), 300);
  },

  // 2. PESTAÑA PATRONES Y SALTOS EN LA RECTA
  renderPatternTab(container) {
    const data = TablesData[this.currentTable];
    const steps = data.steps;

    let stepsHtml = '';
    steps.forEach((stepVal, idx) => {
      stepsHtml += `
        <div class="number-line-step" id="step-${idx}">
          <div class="step-point"></div>
          <span class="step-num">${stepVal}</span>
          ${idx > 0 ? `<span class="step-label">+${this.currentTable}</span>` : ''}
        </div>
      `;
    });

    container.innerHTML = `
      <div class="pattern-box">
        <div class="pattern-card">
          <div class="pattern-header">
            <h3>🔍 Patrón de la Tabla del ${this.currentTable}</h3>
          </div>
          <p class="pattern-desc">${data.pattern}</p>
          <div class="trick-highlight">
            <span class="trick-icon">✨</span>
            <p>${data.trick}</p>
          </div>
        </div>

        <div class="number-line-wrapper">
          <h4>🐸 Saltos en la Recta Numérica (Contar de ${this.currentTable} en ${this.currentTable}):</h4>
          <div class="number-line" id="numberLineTrack">
            <div class="frog-token" id="frogToken">🐸</div>
            ${stepsHtml}
          </div>
          <div class="line-controls">
            <button class="btn-primary" onclick="LearningModule.animateLineJumps()">
              🚀 ¡Ver animación de saltos!
            </button>
          </div>
        </div>

        <div class="pattern-table-summary">
          <h4>🌟 Resumen de Saltos:</h4>
          <div class="steps-chips">
            ${steps.slice(1).map((s, i) => `<span class="chip-step">${this.currentTable}×${i+1} = <strong>${s}</strong></span>`).join('')}
          </div>
        </div>
      </div>
    `;
  },

  animateLineJumps() {
    const frog = document.getElementById('frogToken');
    const steps = TablesData[this.currentTable].steps;
    let currentStep = 0;

    frog.style.opacity = '1';

    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        AudioManager.playSuccess();
        return;
      }

      const stepEl = document.getElementById(`step-${currentStep}`);
      if (stepEl && frog) {
        const offsetLeft = stepEl.offsetLeft;
        frog.style.transform = `translateX(${offsetLeft}px) translateY(-30px)`;
        AudioManager.playClick();
        stepEl.classList.add('highlight-step');
        setTimeout(() => {
          frog.style.transform = `translateX(${offsetLeft}px) translateY(0px)`;
        }, 150);
      }

      currentStep++;
    }, 450);
  },

  // 3. PESTAÑA TABLA COMPLETA
  renderCardsTab(container) {
    const data = TablesData[this.currentTable];
    const items = data.items;

    let itemsHtml = '';
    items.forEach(item => {
      itemsHtml += `
        <div class="flip-math-card" onclick="this.classList.toggle('flipped'); AudioManager.playCardFlip();">
          <div class="flip-card-inner">
            <div class="flip-card-front" style="border-top: 5px solid ${data.color}">
              <span class="card-op">${this.currentTable} × ${item.factor}</span>
              <span class="card-prompt">Toca para voltear 👆</span>
            </div>
            <div class="flip-card-back" style="background: ${data.color}">
              <span class="card-res">${item.result}</span>
              <span class="card-hint">${item.addDesc}</span>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="cards-tab-box">
        <div class="cards-intro">
          <h3>Tarjetas de Memoria Rápida</h3>
          <p>Toca cada tarjeta para descubrir y memorizar el resultado.</p>
        </div>
        <div class="math-cards-grid">
          ${itemsHtml}
        </div>
      </div>
    `;
  },

  // 4. PESTAÑA QUIZ / PRÁCTICA RÁPIDA DE LA TABLA
  startTableQuiz() {
    this.activeTab = 'quiz';
    this.quizStep = 0;
    this.quizScore = 0;
    const t = this.currentTable;

    // Crear 5 preguntas dinámicas variadas
    const factors = [2, 3, 4, 5, 6, 7, 8, 9, 10].sort(() => 0.5 - Math.random()).slice(0, 5);
    this.quizQuestions = factors.map(f => {
      const correct = t * f;
      // Generar 3 distractores plausibles
      const options = [correct];
      while (options.length < 4) {
        const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1) * (Math.random() > 0.5 ? t : 1);
        const wrong = Math.max(1, correct + delta);
        if (!options.includes(wrong)) options.push(wrong);
      }
      return {
        table: t,
        factor: f,
        correct: correct,
        options: options.sort(() => 0.5 - Math.random()),
        hint: TablesData[t].items.find(i => i.factor === f)?.hint || `Recuerda: ${t} × ${f} es ${t} veces ${f}`
      };
    });

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const quizBtn = document.querySelectorAll('.tab-btn')[3];
    if (quizBtn) quizBtn.classList.add('active');

    const area = document.getElementById('tabContentArea');
    if (area) this.renderQuizStep(area);
  },

  renderQuizStep(container) {
    if (this.quizStep >= this.quizQuestions.length) {
      // Fin del quiz
      this.finishTableQuiz(container);
      return;
    }

    const q = this.quizQuestions[this.quizStep];
    const data = TablesData[this.currentTable];

    container.innerHTML = `
      <div class="table-quiz-box">
        <div class="quiz-progress-bar">
          <div class="quiz-bar-fill" style="width: ${(this.quizStep / this.quizQuestions.length) * 100}%"></div>
        </div>
        <div class="quiz-badge">Pregunta ${this.quizStep + 1} de ${this.quizQuestions.length}</div>
        
        <div class="quiz-question-card">
          <div class="quiz-math-op">
            ¿Cuánto es <span class="highlight-op">${q.table} × ${q.factor}</span>?
          </div>
          <p class="quiz-context-helper">${data.emoji} Imagina ${q.table} grupos de ${q.factor} ${data.objectName}</p>
          
          <div class="quiz-options-grid" id="quizOptionsGrid">
            ${q.options.map(opt => `
              <button class="btn-quiz-option" onclick="LearningModule.checkQuizAnswer(${opt}, this)">
                ${opt}
              </button>
            `).join('')}
          </div>

          <div id="quizFeedbackBox" class="quiz-feedback-box" style="display: none;"></div>
        </div>
      </div>
    `;
  },

  checkQuizAnswer(selectedVal, btnElement) {
    const q = this.quizQuestions[this.quizStep];
    const isCorrect = selectedVal === q.correct;
    const feedbackBox = document.getElementById('quizFeedbackBox');
    const allBtns = document.querySelectorAll('.btn-quiz-option');

    allBtns.forEach(b => b.disabled = true);

    if (isCorrect) {
      this.quizScore++;
      btnElement.classList.add('correct', 'anim-snap-success');
      AudioManager.playSuccess();
      const rect = btnElement.getBoundingClientRect();
      if (typeof App !== 'undefined' && App.spawnConfetti) {
        App.spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
      }
      feedbackBox.className = 'quiz-feedback-box success-feedback anim-pop-bounce';
      feedbackBox.innerHTML = `
        <span class="fb-icon">🎉</span>
        <div>
          <h4>¡Excelente! ¡Respuesta Correcta!</h4>
          <p>${q.table} × ${q.factor} = ${q.correct}. ¡Sigue así!</p>
        </div>
      `;
    } else {
      btnElement.classList.add('incorrect');
      // Marcar el correcto
      allBtns.forEach(b => {
        if (Number(b.textContent.trim()) === q.correct) b.classList.add('correct');
      });
      AudioManager.playTryAgain();
      feedbackBox.className = 'quiz-feedback-box error-feedback';
      feedbackBox.innerHTML = `
        <span class="fb-icon">💡</span>
        <div>
          <h4>¡Buen intento! Repasemos juntos:</h4>
          <p>${q.hint}. La respuesta correcta es <strong>${q.correct}</strong>.</p>
        </div>
      `;
    }

    feedbackBox.style.display = 'flex';

    setTimeout(() => {
      this.quizStep++;
      const area = document.getElementById('tabContentArea');
      if (area) this.renderQuizStep(area);
    }, 2400);
  },

  finishTableQuiz(container) {
    const total = this.quizQuestions.length;
    const score = this.quizScore;
    const percentEarned = Math.round((score / total) * 100);
    const stars = score === 5 ? 3 : score >= 3 ? 2 : 1;
    const pointsGained = score * 20;

    // Actualizar en el almacenamiento
    StorageManager.addPoints(pointsGained);
    StorageManager.addStars(stars);
    StorageManager.updateTableProgress(this.currentTable, percentEarned, stars);
    StorageManager.unlockBadge('primer_paso');

    AudioManager.playFanfare();
    if (typeof App !== 'undefined' && App.spawnConfetti) {
      App.spawnConfetti(window.innerWidth / 2, window.innerHeight / 3, 35);
    }

    container.innerHTML = `
      <div class="quiz-result-card anim-pop-bounce">
        <div class="result-trophy anim-trophy-wobble">🏆</div>
        <h2>¡Práctica de la Tabla del ${this.currentTable} Completada!</h2>
        <p class="result-score-text">Obtuviste <strong>${score} de ${total}</strong> aciertos (${percentEarned}%)</p>
        
        <div class="result-stars">
          ${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}
        </div>

        <div class="reward-pill">
          <span>+${pointsGained} Puntos de Aventura</span> • <span>+${stars} Estrellas</span>
        </div>

        <p class="result-message">
          ${score === 5 
            ? '¡Magnífico! Dominas esta tabla como un verdadero maestro matemático.' 
            : '¡Muy bien practicado! Puedes repetir esta actividad para alcanzar las 3 estrellas.'}
        </p>

        <div class="result-actions">
          <button class="btn-primary" onclick="LearningModule.startTableQuiz()">
            🔄 Intentar de nuevo para mejorar
          </button>
          <button class="btn-secondary" onclick="LearningModule.renderTablesSelector()">
            📚 Ver otras tablas
          </button>
          <button class="btn-accent" onclick="App.showView('games')">
            🎮 Ir a Juegos con esta tabla
          </button>
        </div>
      </div>
    `;

    App.updateHeaderStats();
  }
};
