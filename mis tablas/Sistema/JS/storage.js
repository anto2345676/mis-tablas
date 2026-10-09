// Gestión de Estado y Progreso del Estudiante - MIS TABLAS 4° BÁSICO

const StorageManager = {
  STORAGE_KEY: 'misTablas_student',

  // Definición de avatares disponibles
  AVATARS: {
    buho: { name: 'Búho Sabio', file: 'avatar_buho.svg', trait: 'Estratega y curioso' },
    zorro: { name: 'Zorro Veloz', file: 'avatar_zorro.svg', trait: 'Rápido y ágil' },
    astronauta: { name: 'Astronauta Pepo', file: 'avatar_astronauta.svg', trait: 'Explorador estelar' },
    robot: { name: 'Robot Chispa', file: 'avatar_robot.svg', trait: 'Preciso y lógico' },
    leon: { name: 'León Campeón', file: 'avatar_leon.svg', trait: 'Valiente y perseverante' },
    gatita: { name: 'Gatita Genia', file: 'avatar_gatita.svg', trait: 'Creativa y brillante' }
  },

  // Niveles de avance escolar
  LEVELS: [
    { level: 1, title: 'Aprendiz de Números', minScore: 0, icon: '🌱' },
    { level: 2, title: 'Explorador de Factores', minScore: 150, icon: '🔍' },
    { level: 3, title: 'Aventurero del Cálculo', minScore: 400, icon: '⚡' },
    { level: 4, title: 'Capitán Multiplicador', minScore: 800, icon: '🚀' },
    { level: 5, title: 'Maestro de las Tablas', minScore: 1400, icon: '🌟' },
    { level: 6, title: 'Gran Sabio Matemático', minScore: 2200, icon: '👑' }
  ],

  // Catálogo completo de medallas / logros
  BADGES: {
    primer_paso: { id: 'primer_paso', title: 'Primer Paso', desc: '¡Completaste tu primera actividad interactiva!', icon: '🎯' },
    maestro_del_2: { id: 'maestro_del_2', title: 'Doble Poder', desc: 'Completaste con éxito la tabla del 2.', icon: '✌️' },
    maestro_del_5: { id: 'maestro_del_5', title: 'Choca Esos Cinco', desc: 'Dominaste los patrones de la tabla del 5.', icon: '🖐️' },
    maestro_del_10: { id: 'maestro_del_10', title: 'Rey de las Decenas', desc: 'Conquistaste la tabla del 10 con facilidad.', icon: '🔟' },
    todas_las_tablas: { id: 'todas_las_tablas', title: 'Gran Conquistador', desc: 'Completaste las tablas del 2 al 10.', icon: '🏆' },
    memoria_brillante: { id: 'memoria_brillante', title: 'Memoria de Elefante', desc: 'Encontraste todas las parejas en el juego de memoria.', icon: '🧠' },
    relampago: { id: 'relampago', title: 'Cálculo Relámpago', desc: 'Lograste una racha de 5 aciertos en Desafío contra el Tiempo.', icon: '⚡' },
    arquitecto: { id: 'arquitecto', title: 'Arquitecto COPISI', desc: 'Construiste correctamente grupos y matrices de multiplicación.', icon: '🧱' },
    detective: { id: 'detective', title: 'Super Detective', desc: 'Descubriste el número secreto usando pistas matemáticas.', icon: '🕵️' },
    estrella_simce: { id: 'estrella_simce', title: 'Estrella SIMCE', desc: 'Rendiste el Ensayo SIMCE de 4° básico con Nivel Adecuado.', icon: '⭐' },
    simce_perfecto: { id: 'simce_perfecto', title: 'Puntaje Nacional', desc: '¡10 de 10 respuestas correctas en el ensayo SIMCE!', icon: '🥇' }
  },

  // Verificar si hay un estudiante registrado válidamente
  hasRegisteredStudent() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return Boolean(data && data.name && data.avatar);
      }
    } catch (e) {}
    return false;
  },

  // Obtener perfil actual o crear invitado por defecto
  getStudent() {
    let data = null;
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        data = JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error al leer perfil:", e);
    }

    if (!data || !data.name) {
      data = {
        name: 'Estudiante',
        avatar: 'buho',
        score: 0,
        stars: 0,
        level: 1,
        completedTables: [],
        badges: [],
        tableProgress: {}, // { '2': { percent: 100, stars: 3 }, ... }
        simceHistory: [],
        simceScore: null,
        forceSimceUnlocked: false
      };
    }

    // Inicializar estructura de tablas si falta
    if (!data.tableProgress) data.tableProgress = {};
    if (!data.completedTables) data.completedTables = [];
    if (!data.badges) data.badges = [];
    if (!data.simceHistory) data.simceHistory = [];

    return data;
  },

  // Guardar perfil
  saveStudent(student) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(student));
    } catch (e) {
      console.error("Error al guardar perfil:", e);
    }
  },

  // Calcular nivel en base al puntaje
  calculateLevel(score) {
    let current = this.LEVELS[0];
    for (let lvl of this.LEVELS) {
      if (score >= lvl.minScore) {
        current = lvl;
      }
    }
    return current;
  },

  // Sumar puntaje y chequear si subió de nivel
  addPoints(amount) {
    const student = this.getStudent();
    const oldLevel = this.calculateLevel(student.score).level;
    student.score = Math.max(0, (student.score || 0) + amount);
    const newLevelObj = this.calculateLevel(student.score);
    student.level = newLevelObj.level;
    this.saveStudent(student);

    const leveledUp = newLevelObj.level > oldLevel;
    return {
      totalScore: student.score,
      leveledUp: leveledUp,
      levelObj: newLevelObj
    };
  },

  // Sumar estrellas
  addStars(amount) {
    const student = this.getStudent();
    student.stars = (student.stars || 0) + amount;
    this.saveStudent(student);
    return student.stars;
  },

  // Actualizar avance de una tabla específica (del 2 al 10)
  updateTableProgress(tableNum, percent, starsEarned = 1) {
    const student = this.getStudent();
    const key = String(tableNum);
    const current = student.tableProgress[key] || { percent: 0, stars: 0 };

    current.percent = Math.max(current.percent, Math.min(100, percent));
    current.stars = Math.max(current.stars, starsEarned);
    student.tableProgress[key] = current;

    if (current.percent >= 100 && !student.completedTables.includes(tableNum)) {
      student.completedTables.push(tableNum);

      // Medallas especiales por tabla
      if (tableNum === 2) this.unlockBadge('maestro_del_2');
      if (tableNum === 5) this.unlockBadge('maestro_del_5');
      if (tableNum === 10) this.unlockBadge('maestro_del_10');

      // Verificar si completó del 2 al 10
      const allDone = [2, 3, 4, 5, 6, 7, 8, 9, 10].every(t => student.completedTables.includes(t));
      if (allDone) {
        this.unlockBadge('todas_las_tablas');
      }
    }

    this.saveStudent(student);
    return current;
  },

  // Desbloquear medalla/logro
  unlockBadge(badgeId) {
    if (!this.BADGES[badgeId]) return null;
    const student = this.getStudent();
    if (!student.badges.includes(badgeId)) {
      student.badges.push(badgeId);
      this.saveStudent(student);
      return this.BADGES[badgeId]; // Retorna para lanzar notificación
    }
    return null;
  },

  // Guardar resultado de ensayo SIMCE
  saveSimceResult(score, total, details) {
    const student = this.getStudent();
    const percent = Math.round((score / total) * 100);
    const attempt = {
      date: new Date().toLocaleDateString('es-CL'),
      score: score,
      total: total,
      percent: percent,
      details: details
    };
    student.simceHistory.unshift(attempt);
    student.simceScore = percent;

    if (percent >= 70) {
      this.unlockBadge('estrella_simce');
    }
    if (score === total) {
      this.unlockBadge('simce_perfecto');
    }

    this.saveStudent(student);
    return attempt;
  },

  // Verificar si el Ensayo SIMCE está desbloqueado
  isSimceUnlocked() {
    const student = this.getStudent();
    if (student.forceSimceUnlocked) return true;
    // Condición didáctica: haber obtenido al menos 200 puntos o 2 tablas completadas
    const tablesCount = student.completedTables ? student.completedTables.length : 0;
    return (student.score >= 200 || tablesCount >= 2);
  },

  // Alternar desbloqueo libre para práctica docente
  toggleForceSimceUnlock() {
    const student = this.getStudent();
    student.forceSimceUnlocked = !student.forceSimceUnlocked;
    this.saveStudent(student);
    return student.forceSimceUnlocked;
  },

  // Porcentaje global de dominio de las 9 tablas (2 al 10)
  getOverallProgress() {
    const student = this.getStudent();
    const tables = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    let total = 0;
    tables.forEach(t => {
      const p = student.tableProgress[String(t)];
      if (p && p.percent) total += p.percent;
    });
    return Math.round(total / tables.length);
  }
};
