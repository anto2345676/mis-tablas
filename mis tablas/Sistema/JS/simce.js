// Módulo de Ensayo Matemático Tipo SIMCE - MIS TABLAS 4° BÁSICO
// Evaluación contextualizada acorde al currículum nacional de Chile para 4° básico

const SimceModule = {
  currentQuestionIndex: 0,
  userAnswers: {}, // { 0: 'C', 1: 'B', ... }
  isSubmitted: false,

  // 10 Preguntas Contextualizadas tipo SIMCE de 4° Básico
  QUESTIONS: [
    {
      id: 1,
      context: 'Compras en la feria escolar',
      story: 'En la feria saludable de la escuela, cada manzana fresca cuesta $150. Si Joaquín decide comprar 6 manzanas para compartir con sus amigos en el recreo, ¿cuál de las siguientes operaciones permite calcular el total de dinero que debe pagar?',
      imageHint: '🍎 Manzanas a $150 c/u (Cantidad: 6)',
      options: [
        { letter: 'A', text: '150 + 6', isCorrect: false },
        { letter: 'B', text: '6 × 150', isCorrect: true },
        { letter: 'C', text: '150 - 6', isCorrect: false },
        { letter: 'D', text: '150 ÷ 6', isCorrect: false }
      ],
      explanation: 'Para calcular el costo de varios objetos de igual valor, multiplicamos el precio unitario por la cantidad comprada: 6 × $150 = $900.'
    },
    {
      id: 2,
      context: 'Organización de la sala de clases',
      story: 'En una sala de 4° básico, las mesas se ordenaron en 7 filas de bancos. Si en cada una de las filas hay exactamente 5 bancos, ¿cuántos bancos hay en total en la sala de clases?',
      imageHint: '▦ Arreglo de 7 filas × 5 columnas',
      options: [
        { letter: 'A', text: '12 bancos en total', isCorrect: false },
        { letter: 'B', text: '28 bancos en total', isCorrect: false },
        { letter: 'C', text: '35 bancos en total', isCorrect: true },
        { letter: 'D', text: '42 bancos en total', isCorrect: false }
      ],
      explanation: 'Se trata de un arreglo bidimensional o matriz: multiplicamos el número de filas por la cantidad de bancos por fila: 7 × 5 = 35 bancos.'
    },
    {
      id: 3,
      context: 'Distribución de materiales en el taller de arte',
      story: 'La profesora de Artes repartió materiales para un proyecto de pintura. Entregó a cada uno de los 8 grupos de trabajo una caja con 6 frascos de témpera. ¿Cuántos frascos de témpera repartió la profesora en total?',
      imageHint: '🎨 8 grupos × 6 frascos cada uno',
      options: [
        { letter: 'A', text: '14 frascos de témpera', isCorrect: false },
        { letter: 'B', text: '42 frascos de témpera', isCorrect: false },
        { letter: 'C', text: '48 frascos de témpera', isCorrect: true },
        { letter: 'D', text: '56 frascos de témpera', isCorrect: false }
      ],
      explanation: 'Multiplicamos los 8 grupos por los 6 frascos de cada grupo: 8 × 6 = 48 frascos de témpera repartidos en total.'
    },
    {
      id: 4,
      context: 'Lectura y biblioteca escolar',
      story: 'Matías está leyendo un entretenido libro de aventuras. Durante una semana completa (7 días seguidos), leyó exactamente 9 páginas cada día. ¿Cuántas páginas leyó Matías en total durante esa semana?',
      imageHint: '📖 9 páginas por día durante 7 días',
      options: [
        { letter: 'A', text: '16 páginas', isCorrect: false },
        { letter: 'B', text: '54 páginas', isCorrect: false },
        { letter: 'C', text: '63 páginas', isCorrect: true },
        { letter: 'D', text: '72 páginas', isCorrect: false }
      ],
      explanation: 'Calculamos 7 días multiplicados por 9 páginas diarias: 7 × 9 = 63 páginas leídas.'
    },
    {
      id: 5,
      context: 'Juegos y puntajes en educación física',
      story: 'En una kermesse deportiva de básquetbol, Sofía encestó 4 veces el balón en el aro dorado de tiro especial. Si cada enceste en ese aro otorga 8 puntos, ¿cuántos puntos acumuló Sofía en ese juego?',
      imageHint: '🏀 4 encestes × 8 puntos cada uno',
      options: [
        { letter: 'A', text: '12 puntos acumulados', isCorrect: false },
        { letter: 'B', text: '24 puntos acumulados', isCorrect: false },
        { letter: 'C', text: '32 puntos acumulados', isCorrect: true },
        { letter: 'D', text: '36 puntos acumulados', isCorrect: false }
      ],
      explanation: 'Multiplicamos la cantidad de tiros acertados por el valor de cada uno: 4 × 8 = 32 puntos.'
    },
    {
      id: 6,
      context: 'Huerto escolar y cultivo de hortalizas',
      story: 'En el huerto de la escuela, los estudiantes de 4° básico prepararon 6 bandejas para sembrar lechugas. Si en cada bandeja colocaron 7 semillas, ¿cuántas semillas de lechuga sembraron en total?',
      imageHint: '🌱 6 bandejas con 7 semillas cada una',
      options: [
        { letter: 'A', text: '13 semillas', isCorrect: false },
        { letter: 'B', text: '36 semillas', isCorrect: false },
        { letter: 'C', text: '42 semillas', isCorrect: true },
        { letter: 'D', text: '49 semillas', isCorrect: false }
      ],
      explanation: 'Para obtener el total multiplicamos 6 bandejas por 7 semillas: 6 × 7 = 42 semillas.'
    },
    {
      id: 7,
      context: 'Ahorro y valor posicional con monedas',
      story: 'Vicente guardó en su alcancía 9 monedas de $10 pesos cada una. ¿Cuánto dinero ahorró Vicente en total en esas monedas?',
      imageHint: '🪙 9 monedas de $10 pesos',
      options: [
        { letter: 'A', text: '$19 pesos', isCorrect: false },
        { letter: 'B', text: '$80 pesos', isCorrect: false },
        { letter: 'C', text: '$90 pesos', isCorrect: true },
        { letter: 'D', text: '$100 pesos', isCorrect: false }
      ],
      explanation: 'Multiplicar por 10 equivale a mover el dígito a las decenas y agregar un cero: 9 × 10 = $90 pesos.'
    },
    {
      id: 8,
      context: 'Reparto en cajas de pastelería',
      story: 'Una pastelería artesanal vende cajas que contienen exactamente 8 alfajores cada una. Para el aniversario del colegio, el centro de padres compró 8 cajas. ¿Cuántos alfajores compraron en total?',
      imageHint: '📦 8 cajas con 8 alfajores cada una',
      options: [
        { letter: 'A', text: '56 alfajores', isCorrect: false },
        { letter: 'B', text: '64 alfajores', isCorrect: true },
        { letter: 'C', text: '72 alfajores', isCorrect: false },
        { letter: 'D', text: '80 alfajores', isCorrect: false }
      ],
      explanation: 'Multiplicamos 8 cajas por 8 alfajores: 8 × 8 = 64 alfajores.'
    },
    {
      id: 9,
      context: 'Propiedades de la multiplicación',
      story: 'Camila comprobó en su cuaderno que 3 × 6 = 18. ¿Cuál de las siguientes igualdades también es correcta debido a la propiedad conmutativa de la multiplicación?',
      imageHint: '🔄 Propiedad conmutativa: el orden de los factores',
      options: [
        { letter: 'A', text: '6 + 3 = 18', isCorrect: false },
        { letter: 'B', text: '6 × 3 = 18', isCorrect: true },
        { letter: 'C', text: '3 + 3 + 3 = 18', isCorrect: false },
        { letter: 'D', text: '6 × 6 = 18', isCorrect: false }
      ],
      explanation: 'La propiedad conmutativa nos enseña que el orden de los factores no altera el producto: 3 × 6 es exactamente lo mismo que 6 × 3 = 18.'
    },
    {
      id: 10,
      context: 'Resolución de problemas contextualizados',
      story: 'Para la campaña solidaria de la escuela, un curso reunió 5 paquetes con 6 cuadernos en cada uno. Además, un profesor donó 10 cuadernos sueltos. ¿Cuántos cuadernos reunió el curso en total?',
      imageHint: '📚 5 paquetes de 6 cuadernos + 10 sueltos',
      options: [
        { letter: 'A', text: '30 cuadernos', isCorrect: false },
        { letter: 'B', text: '35 cuadernos', isCorrect: false },
        { letter: 'C', text: '40 cuadernos', isCorrect: true },
        { letter: 'D', text: '50 cuadernos', isCorrect: false }
      ],
      explanation: 'Primero calculamos los cuadernos en paquetes: 5 × 6 = 30 cuadernos. Luego sumamos los cuadernos sueltos: 30 + 10 = 40 cuadernos en total.'
    }
  ],

  // Iniciar ensayo
  init() {
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.isSubmitted = false;
    this.renderSimceView();
  },

  renderSimceView() {
    const container = document.getElementById('simceModuleContainer');
    if (!container) return;

    // Verificar si está desbloqueado
    const isUnlocked = StorageManager.isSimceUnlocked();
    const student = StorageManager.getStudent();

    if (!isUnlocked) {
      container.innerHTML = `
        <div class="simce-locked-card">
          <div class="locked-icon">🔒</div>
          <h2>Ensayo Matemático Tipo SIMCE Bloqueado</h2>
          <p>Para desbloquear el ensayo oficial de 4° básico, necesitas acumular al menos <strong>200 puntos</strong> o completar <strong>2 tablas de multiplicar</strong>.</p>
          
          <div class="locked-stats">
            <div>Tu Puntaje actual: <strong>${student.score} / 200 pts</strong></div>
            <div>Tablas completadas: <strong>${student.completedTables.length} / 2</strong></div>
          </div>

          <div class="locked-actions">
            <button class="btn-primary" onclick="App.showView('learning')">
              📚 Ir a Aprender Tablas
            </button>
            <button class="btn-secondary" onclick="App.showView('games')">
              🎮 Ir a Desafíos y Juegos
            </button>
            <button class="btn-unlock-override" onclick="SimceModule.toggleTeacherUnlock()">
              🔓 Modo Docente: Desbloquear Ensayo para Práctica Libre
            </button>
          </div>
        </div>
      `;
      return;
    }

    // Si ya fue enviado, mostrar resultados
    if (this.isSubmitted) {
      this.renderResultsView(container);
      return;
    }

    // Renderizar pantalla del ensayo: Barra lateral con preguntas 1 a 10 y área central
    const totalQ = this.QUESTIONS.length;
    const answeredCount = Object.keys(this.userAnswers).length;

    // Generar botones laterales de preguntas
    let sidebarButtons = '';
    this.QUESTIONS.forEach((q, idx) => {
      const isAnswered = this.userAnswers[idx] !== undefined;
      const isCurrent = idx === this.currentQuestionIndex;
      sidebarButtons += `
        <button class="simce-nav-btn ${isCurrent ? 'active' : ''} ${isAnswered ? 'answered' : 'pending'}" onclick="SimceModule.goToQuestion(${idx})">
          <span class="btn-num">${idx + 1}</span>
          <span class="btn-status-icon">${isAnswered ? '✔' : '○'}</span>
        </button>
      `;
    });

    const currentQ = this.QUESTIONS[this.currentQuestionIndex];
    const selectedOption = this.userAnswers[this.currentQuestionIndex];

    container.innerHTML = `
      <div class="simce-header-bar">
        <div class="simce-header-title">
          <h2>📝 Ensayo Matemático Tipo SIMCE (4° Básico)</h2>
          <span class="simce-tag-context">${currentQ.context}</span>
        </div>
        <div class="simce-header-progress">
          <span>Respondidas: <strong>${answeredCount} de ${totalQ}</strong></span>
          <div class="simce-progress-mini">
            <div class="simce-progress-mini-fill" style="width: ${(answeredCount / totalQ) * 100}%;"></div>
          </div>
        </div>
      </div>

      <div class="simce-layout">
        <!-- SECTOR LATERAL CON LAS 10 PREGUNTAS -->
        <aside class="simce-sidebar">
          <div class="sidebar-title">Preguntas (1-10)</div>
          <div class="simce-nav-grid">
            ${sidebarButtons}
          </div>
          <div class="sidebar-legend">
            <div><span class="legend-dot answered"></span> Respondida</div>
            <div><span class="legend-dot pending"></span> Pendiente</div>
          </div>
          <button class="btn-finish-test ${answeredCount === totalQ ? 'ready' : ''}" onclick="SimceModule.submitTest()">
            🏁 Finalizar Ensayo
          </button>
        </aside>

        <!-- ÁREA PRINCIPAL CON LA PREGUNTA Y ALTERNATIVAS -->
        <main class="simce-main-area">
          <div class="simce-question-container">
            <div class="question-top-info">
              <span class="q-badge">Pregunta N° ${this.currentQuestionIndex + 1}</span>
              <button class="btn-listen-q" onclick="AudioManager.speak('${currentQ.story}')">
                🔊 Escuchar Pregunta
              </button>
            </div>

            <p class="simce-story-text">${currentQ.story}</p>
            
            <div class="simce-visual-hint">
              <span class="hint-icon">💡 Contexto:</span> ${currentQ.imageHint}
            </div>

            <div class="simce-options-list">
              ${currentQ.options.map(opt => `
                <div class="simce-option-card ${selectedOption === opt.letter ? 'selected' : ''}" onclick="SimceModule.selectOption('${opt.letter}')">
                  <div class="option-letter-badge">${opt.letter}</div>
                  <div class="option-text">${opt.text}</div>
                </div>
              `).join('')}
            </div>

            <div class="simce-actions-footer">
              <button class="btn-nav-prev" ${this.currentQuestionIndex === 0 ? 'disabled' : ''} onclick="SimceModule.prevQuestion()">
                ← Anterior
              </button>
              ${this.currentQuestionIndex < totalQ - 1 ? `
                <button class="btn-nav-next" onclick="SimceModule.nextQuestion()">
                  Siguiente →
                </button>
              ` : `
                <button class="btn-nav-finish" onclick="SimceModule.submitTest()">
                  Finalizar Ensayo 🏁
                </button>
              `}
            </div>
          </div>
        </main>
      </div>
    `;
  },

  selectOption(letter) {
    this.userAnswers[this.currentQuestionIndex] = letter;
    AudioManager.playClick();
    this.renderSimceView();
  },

  goToQuestion(index) {
    this.currentQuestionIndex = index;
    AudioManager.playClick();
    this.renderSimceView();
  },

  nextQuestion() {
    if (this.currentQuestionIndex < this.QUESTIONS.length - 1) {
      this.currentQuestionIndex++;
      AudioManager.playClick();
      this.renderSimceView();
    }
  },

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      AudioManager.playClick();
      this.renderSimceView();
    }
  },

  toggleTeacherUnlock() {
    StorageManager.toggleForceSimceUnlock();
    AudioManager.playClick();
    this.renderSimceView();
  },

  // Finalizar y calcular puntaje con retroalimentación completa
  submitTest() {
    const totalQ = this.QUESTIONS.length;
    const answeredCount = Object.keys(this.userAnswers).length;

    if (answeredCount < totalQ) {
      const confirmSend = confirm(`Has respondido ${answeredCount} de las ${totalQ} preguntas. ¿Deseas finalizar de todos modos? Las no respondidas contarán como incorrectas.`);
      if (!confirmSend) return;
    }

    // Calcular puntaje
    let correctCount = 0;
    const reviewDetails = [];

    this.QUESTIONS.forEach((q, idx) => {
      const userChoice = this.userAnswers[idx] || null;
      const correctOpt = q.options.find(o => o.isCorrect);
      const isCorrect = userChoice === correctOpt.letter;

      if (isCorrect) correctCount++;

      reviewDetails.push({
        index: idx + 1,
        context: q.context,
        story: q.story,
        userChoice: userChoice,
        correctLetter: correctOpt.letter,
        correctText: correctOpt.text,
        isCorrect: isCorrect,
        explanation: q.explanation
      });
    });

    this.isSubmitted = true;

    // Guardar en Storage
    const attempt = StorageManager.saveSimceResult(correctCount, totalQ, reviewDetails);
    StorageManager.addPoints(correctCount * 30);

    AudioManager.playFanfare();
    if (typeof App !== 'undefined' && App.spawnConfetti) {
      App.spawnConfetti(window.innerWidth / 2, window.innerHeight / 3, 40);
    }

    const container = document.getElementById('simceModuleContainer');
    if (container) this.renderResultsView(container, correctCount, totalQ, reviewDetails);

    App.updateHeaderStats();
  },

  // Pantalla de resultados y retroalimentación pedagógica
  renderResultsView(container, correctCount, totalQ, reviewDetails) {
    if (!reviewDetails) {
      const student = StorageManager.getStudent();
      const last = student.simceHistory[0];
      if (last) {
        correctCount = last.score;
        totalQ = last.total;
        reviewDetails = last.details;
      } else {
        this.init();
        return;
      }
    }

    const percent = Math.round((correctCount / totalQ) * 100);
    // Escala de nivel SIMCE oficial de Chile para 4° básico
    let simceLevel = '';
    let simceColor = '';
    let simceBadge = '';
    let simceAdvice = '';

    if (percent >= 80) {
      simceLevel = 'NIVEL DE APRENDIZAJE ADECUADO';
      simceColor = '#2E7D32';
      simceBadge = '🏆 Sobresaliente';
      simceAdvice = '¡Felicitaciones! Has demostrado una comprensión sólida de la multiplicación y su aplicación en la resolución de problemas cotidianos de 4° básico.';
    } else if (percent >= 60) {
      simceLevel = 'NIVEL DE APRENDIZAJE ELEMENTAL';
      simceColor = '#F57C00';
      simceBadge = '⭐ Buen Trabajo';
      simceAdvice = '¡Muy buen esfuerzo! Lograste resolver la mayoría de los problemas. Te recomendamos repasar los patrones y trucos de las tablas en el Módulo de Aprendizaje para alcanzar el nivel adecuado.';
    } else {
      simceLevel = 'NIVEL DE APRENDIZAJE INSUFICIENTE';
      simceColor = '#C62828';
      simceBadge = '💪 Sigue Practicando';
      simceAdvice = '¡Ánimo! El ensayo te ayuda a saber qué áreas practicar. Te recomendamos jugar con el Visualizador COPISI y la recta numérica animada para afianzar las tablas.';
    }

    // Puntaje estimado SIMCE (escala 200 a 330 aprox)
    const estimatedSimcePts = Math.round(200 + (percent * 1.3));

    container.innerHTML = `
      <div class="simce-results-dashboard">
        <div class="results-header-banner" style="border-top: 6px solid ${simceColor};">
          <div class="results-trophy-icon">📊</div>
          <h2>Informe de Resultados Ensayo SIMCE</h2>
          <div class="simce-level-pill" style="background-color: ${simceColor}; color: white;">
            ${simceLevel}
          </div>
          
          <div class="results-score-row">
            <div class="score-metric">
              <span class="metric-num">${correctCount} / ${totalQ}</span>
              <span class="metric-label">Respuestas Correctas</span>
            </div>
            <div class="score-metric">
              <span class="metric-num">${percent}%</span>
              <span class="metric-label">Porcentaje de Logro</span>
            </div>
            <div class="score-metric">
              <span class="metric-num">${estimatedSimcePts}</span>
              <span class="metric-label">Puntaje SIMCE Estimado</span>
            </div>
          </div>

          <p class="results-feedback-speech">${simceAdvice}</p>

          <div class="results-top-actions">
            <button class="btn-primary" onclick="SimceModule.init()">
              🔄 Rendir Ensayo Nuevamente
            </button>
            <button class="btn-accent" onclick="App.showView('menu')">
              🏠 Volver al Menú Principal
            </button>
          </div>
        </div>

        <!-- REVISIÓN PREGUNTA POR PREGUNTA -->
        <div class="simce-review-section">
          <h3>📋 Revisión Detallada y Retroalimentación Pedagógica</h3>
          <p>Revisa cada una de tus respuestas para aprender de tus errores y reforzar tus conocimientos.</p>
          
          <div class="review-questions-list">
            ${reviewDetails.map(item => `
              <div class="review-item-card ${item.isCorrect ? 'item-correct' : 'item-wrong'}">
                <div class="review-item-header">
                  <span class="review-q-num">Pregunta ${item.index} • ${item.context}</span>
                  <span class="review-result-tag ${item.isCorrect ? 'tag-correct' : 'tag-wrong'}">
                    ${item.isCorrect ? '✔ Correcta' : '✖ Incorrecta'}
                  </span>
                </div>
                
                <p class="review-story">${item.story}</p>
                
                <div class="review-answers-compare">
                  <div class="user-answer-box">
                    Tu respuesta: <strong>${item.userChoice ? `Alternativa ${item.userChoice}` : 'No respondida'}</strong>
                  </div>
                  <div class="correct-answer-box">
                    Respuesta correcta: <strong>Alternativa ${item.correctLetter} (${item.correctText})</strong>
                  </div>
                </div>

                <div class="review-explanation-box">
                  <strong>💡 Explicación:</strong> ${item.explanation}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
};
