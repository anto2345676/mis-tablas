// Base de Datos Pedagógica - Tablas de Multiplicar del 2 al 10 (4° Básico)
// Enfoque COPISI: Concreto (objetos), Pictórico (matrices y saltos) y Simbólico (operaciones)

const TablesData = {
  2: {
    number: 2,
    title: 'Tabla del 2',
    name: 'El Doble Saltarín',
    color: '#3F51B5',
    emoji: '🍎',
    objectName: 'manzanas',
    pattern: 'Multiplicar por 2 es calcular EL DOBLE. Todos sus resultados son números PARES que terminan en 0, 2, 4, 6 u 8.',
    trick: '💡 Truco Mental: Suma el número consigo mismo. Por ejemplo: 2 × 7 es igual a 7 + 7 = 14.',
    contextExample: 'En una bicicleta hay 2 ruedas. En 6 bicicletas hay: 2 × 6 = 12 ruedas.',
    steps: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
    items: [
      { factor: 1, result: 2, groupDesc: '2 grupos de 1', addDesc: '1 + 1', hint: 'El doble de 1 es 2' },
      { factor: 2, result: 4, groupDesc: '2 grupos de 2', addDesc: '2 + 2', hint: 'El doble de 2 es 4' },
      { factor: 3, result: 6, groupDesc: '2 grupos de 3', addDesc: '3 + 3', hint: 'El doble de 3 es 6' },
      { factor: 4, result: 8, groupDesc: '2 grupos de 4', addDesc: '4 + 4', hint: 'El doble de 4 es 8' },
      { factor: 5, result: 10, groupDesc: '2 grupos de 5', addDesc: '5 + 5', hint: 'El doble de 5 es 10' },
      { factor: 6, result: 12, groupDesc: '2 grupos de 6', addDesc: '6 + 6', hint: 'El doble de 6 es 12' },
      { factor: 7, result: 14, groupDesc: '2 grupos de 7', addDesc: '7 + 7', hint: 'El doble de 7 es 14' },
      { factor: 8, result: 16, groupDesc: '2 grupos de 8', addDesc: '8 + 8', hint: 'El doble de 8 es 16' },
      { factor: 9, result: 18, groupDesc: '2 grupos de 9', addDesc: '9 + 9', hint: 'El doble de 9 es 18' },
      { factor: 10, result: 20, groupDesc: '2 grupos de 10', addDesc: '10 + 10', hint: 'El doble de 10 es 20' }
    ]
  },

  3: {
    number: 3,
    title: 'Tabla del 3',
    name: 'El Trío Saltarín',
    color: '#00897B',
    emoji: '🚗',
    objectName: 'autos',
    pattern: 'Avanzamos de 3 en 3. Si sumas las cifras de cualquier resultado de esta tabla, ¡siempre da 3, 6 o 9!',
    trick: '💡 Truco Mental: Es el doble más una vez más. Por ejemplo: 3 × 4 = (2 × 4) + 4 = 8 + 4 = 12.',
    contextExample: 'Un triciclo tiene 3 ruedas. En 5 triciclos hay: 3 × 5 = 15 ruedas.',
    steps: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
    items: [
      { factor: 1, result: 3, groupDesc: '3 grupos de 1', addDesc: '1 + 1 + 1', hint: 'Tres veces 1 es 3' },
      { factor: 2, result: 6, groupDesc: '3 grupos de 2', addDesc: '2 + 2 + 2', hint: 'Tres veces 2 es 6' },
      { factor: 3, result: 9, groupDesc: '3 grupos de 3', addDesc: '3 + 3 + 3', hint: 'Tres veces 3 es 9' },
      { factor: 4, result: 12, groupDesc: '3 grupos de 4', addDesc: '4 + 4 + 4', hint: 'Tres veces 4 es 12' },
      { factor: 5, result: 15, groupDesc: '3 grupos de 5', addDesc: '5 + 5 + 5', hint: 'Tres veces 5 es 15' },
      { factor: 6, result: 18, groupDesc: '3 grupos de 6', addDesc: '6 + 6 + 6', hint: 'Tres veces 6 es 18' },
      { factor: 7, result: 21, groupDesc: '3 grupos de 7', addDesc: '7 + 7 + 7', hint: 'Tres veces 7 es 21' },
      { factor: 8, result: 24, groupDesc: '3 grupos de 8', addDesc: '8 + 8 + 8', hint: 'Tres veces 8 es 24' },
      { factor: 9, result: 27, groupDesc: '3 grupos de 9', addDesc: '9 + 9 + 9', hint: 'Tres veces 9 es 27' },
      { factor: 10, result: 30, groupDesc: '3 grupos de 10', addDesc: '10 + 10 + 10', hint: 'Tres veces 10 es 30' }
    ]
  },

  4: {
    number: 4,
    title: 'Tabla del 4',
    name: 'El Doble del Doble',
    color: '#D81B60',
    emoji: '⭐',
    objectName: 'estrellas',
    pattern: 'Multiplicar por 4 es hacer el doble del doble. Todos sus resultados son siempre pares.',
    trick: '💡 Truco Mental: Para calcular 4 × 6, haz el doble de 6 (12) y luego el doble de 12 (24). ¡Magia!',
    contextExample: 'Una mesa tiene 4 patas. En un salón con 7 mesas hay: 4 × 7 = 28 patas.',
    steps: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
    items: [
      { factor: 1, result: 4, groupDesc: '4 grupos de 1', addDesc: '1 + 1 + 1 + 1', hint: 'El doble del doble de 1 es 4' },
      { factor: 2, result: 8, groupDesc: '4 grupos de 2', addDesc: '2 + 2 + 2 + 2', hint: 'El doble de 2 es 4, y el doble es 8' },
      { factor: 3, result: 12, groupDesc: '4 grupos de 3', addDesc: '3 + 3 + 3 + 3', hint: 'El doble de 3 es 6, y el doble es 12' },
      { factor: 4, result: 16, groupDesc: '4 grupos de 4', addDesc: '4 + 4 + 4 + 4', hint: 'El doble de 4 es 8, y el doble es 16' },
      { factor: 5, result: 20, groupDesc: '4 grupos de 5', addDesc: '5 + 5 + 5 + 5', hint: 'El doble de 5 es 10, y el doble es 20' },
      { factor: 6, result: 24, groupDesc: '4 grupos de 6', addDesc: '6 + 6 + 6 + 6', hint: 'El doble de 6 es 12, y el doble es 24' },
      { factor: 7, result: 28, groupDesc: '4 grupos de 7', addDesc: '7 + 7 + 7 + 7', hint: 'El doble de 7 es 14, y el doble es 28' },
      { factor: 8, result: 32, groupDesc: '4 grupos de 8', addDesc: '8 + 8 + 8 + 8', hint: 'El doble de 8 es 16, y el doble es 32' },
      { factor: 9, result: 36, groupDesc: '4 grupos de 9', addDesc: '9 + 9 + 9 + 9', hint: 'El doble de 9 es 18, y el doble es 36' },
      { factor: 10, result: 40, groupDesc: '4 grupos de 10', addDesc: '10 + 10 + 10 + 10', hint: 'El doble de 10 es 20, y el doble es 40' }
    ]
  },

  5: {
    number: 5,
    title: 'Tabla del 5',
    name: 'El Ritmo de la Mano',
    color: '#FB8C00',
    emoji: '🍪',
    objectName: 'galletas',
    pattern: '¡Fácil de recordar! Todos los resultados terminan obligatoriamente en 0 o en 5.',
    trick: '💡 Truco Mental: Es como contar los minutos de un reloj de manecillas o los dedos de las manos: 5, 10, 15, 20...',
    contextExample: 'En una mano tenemos 5 dedos. En 8 manos hay: 5 × 8 = 40 dedos.',
    steps: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
    items: [
      { factor: 1, result: 5, groupDesc: '5 grupos de 1', addDesc: '5', hint: 'Termina en 5' },
      { factor: 2, result: 10, groupDesc: '5 grupos de 2', addDesc: '5 + 5', hint: 'Termina en 0' },
      { factor: 3, result: 15, groupDesc: '5 grupos de 3', addDesc: '5 + 5 + 5', hint: 'Termina en 5' },
      { factor: 4, result: 20, groupDesc: '5 grupos de 4', addDesc: '10 + 10', hint: 'Termina en 0' },
      { factor: 5, result: 25, groupDesc: '5 grupos de 5', addDesc: '20 + 5', hint: 'Termina en 5' },
      { factor: 6, result: 30, groupDesc: '5 grupos de 6', addDesc: '15 + 15', hint: 'Termina en 0' },
      { factor: 7, result: 35, groupDesc: '5 grupos de 7', addDesc: '30 + 5', hint: 'Termina en 5' },
      { factor: 8, result: 40, groupDesc: '5 grupos de 8', addDesc: '20 + 20', hint: 'Termina en 0' },
      { factor: 9, result: 45, groupDesc: '5 grupos de 9', addDesc: '40 + 5', hint: 'Termina en 5' },
      { factor: 10, result: 50, groupDesc: '5 grupos de 10', addDesc: '25 + 25', hint: 'Termina en 0' }
    ]
  },

  6: {
    number: 6,
    title: 'Tabla del 6',
    name: 'El Doble del 3',
    color: '#8E24AA',
    emoji: '⚽',
    objectName: 'pelotas',
    pattern: 'La tabla del 6 es el doble de la tabla del 3. Todos sus productos son siempre números pares.',
    trick: '💡 Truco Mental: Multiplica por 5 y luego suma el número una vez más. Ejemplo: 6 × 7 = (5 × 7) + 7 = 35 + 7 = 42.',
    contextExample: 'Una caja de lápices trae 6 colores. En 4 cajas hay: 6 × 4 = 24 lápices.',
    steps: [0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60],
    items: [
      { factor: 1, result: 6, groupDesc: '6 grupos de 1', addDesc: '6', hint: '6 × 1 es 6' },
      { factor: 2, result: 12, groupDesc: '6 grupos de 2', addDesc: '6 + 6', hint: 'El doble de 6 es 12' },
      { factor: 3, result: 18, groupDesc: '6 grupos de 3', addDesc: '12 + 6', hint: '6 × 3 es 18' },
      { factor: 4, result: 24, groupDesc: '6 grupos de 4', addDesc: '18 + 6', hint: '24 pelotas en total' },
      { factor: 5, result: 30, groupDesc: '6 grupos de 5', addDesc: '6 × 5 es 30', hint: 'La mitad de 60 es 30' },
      { factor: 6, result: 36, groupDesc: '6 grupos de 6', addDesc: '30 + 6', hint: '6 × 6 = 36' },
      { factor: 7, result: 42, groupDesc: '6 grupos de 7', addDesc: '36 + 6', hint: '42 es un múltiplo par' },
      { factor: 8, result: 48, groupDesc: '6 grupos de 8', addDesc: '42 + 6', hint: '48 pelotas' },
      { factor: 9, result: 54, groupDesc: '6 grupos de 9', addDesc: '60 - 6', hint: 'Resta 6 a 60 = 54' },
      { factor: 10, result: 60, groupDesc: '6 grupos de 10', addDesc: '6 decenas', hint: '6 × 10 = 60' }
    ]
  },

  7: {
    number: 7,
    title: 'Tabla del 7',
    name: 'El Desafío de la Semana',
    color: '#039BE5',
    emoji: '🍭',
    objectName: 'dulces',
    pattern: 'Avanzamos de 7 en 7 como los días de la semana. ¡Aprenderla te convertirá en un experto!',
    trick: '💡 Truco Mental: Descompón en 5 y 2. Por ejemplo: 7 × 8 = (5 × 8) + (2 × 8) = 40 + 16 = 56.',
    contextExample: 'Una semana tiene 7 días. En 4 semanas completas hay: 7 × 4 = 28 días.',
    steps: [0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70],
    items: [
      { factor: 1, result: 7, groupDesc: '7 grupos de 1', addDesc: '7', hint: '7 × 1 = 7' },
      { factor: 2, result: 14, groupDesc: '7 grupos de 2', addDesc: '7 + 7', hint: 'Dos semanas son 14 días' },
      { factor: 3, result: 21, groupDesc: '7 grupos de 3', addDesc: '14 + 7', hint: 'Tres semanas son 21 días' },
      { factor: 4, result: 28, groupDesc: '7 grupos de 4', addDesc: '21 + 7', hint: 'Cuatro semanas son 28 días' },
      { factor: 5, result: 35, groupDesc: '7 grupos de 5', addDesc: '30 + 5', hint: 'Termina en 5 porque multiplicas por 5' },
      { factor: 6, result: 42, groupDesc: '7 grupos de 6', addDesc: '35 + 7', hint: '7 × 6 = 42' },
      { factor: 7, result: 49, groupDesc: '7 grupos de 7', addDesc: '42 + 7', hint: 'Siete por siete = cuarenta y nueve' },
      { factor: 8, result: 56, groupDesc: '7 grupos de 8', addDesc: '49 + 7', hint: '5, 6, 7, 8 -> ¡56 = 7 × 8!' },
      { factor: 9, result: 63, groupDesc: '7 grupos de 9', addDesc: '70 - 7', hint: 'Resta 7 a 70 = 63' },
      { factor: 10, result: 70, groupDesc: '7 grupos de 10', addDesc: '7 decenas', hint: '7 × 10 = 70' }
    ]
  },

  8: {
    number: 8,
    title: 'Tabla del 8',
    name: 'El Triple Doble',
    color: '#E53935',
    emoji: '🚀',
    objectName: 'cohetes',
    pattern: 'Multiplicar por 8 es hacer el doble del doble del doble (2 × 2 × 2 = 8). Todos sus resultados son pares.',
    trick: '💡 Truco de Dígitos: Las unidades van en cuenta regresiva par: 8, 6, 4, 2, 0, 8, 6, 4, 2, 0.',
    contextExample: 'Un pulpo tiene 8 tentáculos. En 3 pulpos hay: 8 × 3 = 24 tentáculos.',
    steps: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80],
    items: [
      { factor: 1, result: 8, groupDesc: '8 grupos de 1', addDesc: '8', hint: '8 × 1 = 8' },
      { factor: 2, result: 16, groupDesc: '8 grupos de 2', addDesc: '8 + 8', hint: 'El doble de 8 es 16' },
      { factor: 3, result: 24, groupDesc: '8 grupos de 3', addDesc: '16 + 8', hint: '8 × 3 = 24' },
      { factor: 4, result: 32, groupDesc: '8 grupos de 4', addDesc: '24 + 8', hint: '8 × 4 = 32' },
      { factor: 5, result: 40, groupDesc: '8 grupos de 5', addDesc: 'La mitad de 80', hint: '8 × 5 = 40' },
      { factor: 6, result: 48, groupDesc: '8 grupos de 6', addDesc: '40 + 8', hint: '8 × 6 = 48' },
      { factor: 7, result: 56, groupDesc: '8 grupos de 7', addDesc: '48 + 8', hint: 'Recuerda: 56 = 7 × 8' },
      { factor: 8, result: 64, groupDesc: '8 grupos de 8', addDesc: '56 + 8', hint: 'Casillas de un tablero de ajedrez (8 × 8 = 64)' },
      { factor: 9, result: 72, groupDesc: '8 grupos de 9', addDesc: '80 - 8', hint: 'Resta 8 a 80 = 72' },
      { factor: 10, result: 80, groupDesc: '8 grupos de 10', addDesc: '8 decenas', hint: '8 × 10 = 80' }
    ]
  },

  9: {
    number: 9,
    title: 'Tabla del 9',
    name: 'El Poder Mágico',
    color: '#00ACC1',
    emoji: '🌸',
    objectName: 'flores',
    pattern: '¡La tabla más mágica! La suma de los dos dígitos de sus resultados siempre es igual a 9: (1+8=9, 2+7=9, 3+6=9...)',
    trick: '💡 Truco de los Dedos o del 10: Multiplica por 10 y resta el número. Ejemplo: 9 × 6 = 60 - 6 = 54.',
    contextExample: 'En un álbum escolar caben 9 fotos por página. En 5 páginas hay: 9 × 5 = 45 fotos.',
    steps: [0, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90],
    items: [
      { factor: 1, result: 9, groupDesc: '9 grupos de 1', addDesc: '9', hint: '0 + 9 = 9' },
      { factor: 2, result: 18, groupDesc: '9 grupos de 2', addDesc: '20 - 2', hint: '1 + 8 = 9 (da 18)' },
      { factor: 3, result: 27, groupDesc: '9 grupos de 3', addDesc: '30 - 3', hint: '2 + 7 = 9 (da 27)' },
      { factor: 4, result: 36, groupDesc: '9 grupos de 4', addDesc: '40 - 4', hint: '3 + 6 = 9 (da 36)' },
      { factor: 5, result: 45, groupDesc: '9 grupos de 5', addDesc: '50 - 5', hint: '4 + 5 = 9 (da 45)' },
      { factor: 6, result: 54, groupDesc: '9 grupos de 6', addDesc: '60 - 6', hint: '5 + 4 = 9 (da 54)' },
      { factor: 7, result: 63, groupDesc: '9 grupos de 7', addDesc: '70 - 7', hint: '6 + 3 = 9 (da 63)' },
      { factor: 8, result: 72, groupDesc: '9 grupos de 8', addDesc: '80 - 8', hint: '7 + 2 = 9 (da 72)' },
      { factor: 9, result: 81, groupDesc: '9 grupos de 9', addDesc: '90 - 9', hint: '8 + 1 = 9 (da 81)' },
      { factor: 10, result: 90, groupDesc: '9 grupos de 10', addDesc: '9 decenas', hint: '9 + 0 = 9 (da 90)' }
    ]
  },

  10: {
    number: 10,
    title: 'Tabla del 10',
    name: 'El Rey del Cero',
    color: '#43A047',
    emoji: '💎',
    objectName: 'gemas',
    pattern: 'Multiplicar por 10 equivale a mover la cifra a la columna de las decenas y agregar un 0 al final.',
    trick: '💡 Regla de Oro: Solo ponle un cero a la derecha del número que estás multiplicando: 7 × 10 = 70.',
    contextExample: 'Una moneda de 10 pesos. Con 9 monedas tienes: 9 × 10 = 90 pesos.',
    steps: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    items: [
      { factor: 1, result: 10, groupDesc: '10 grupos de 1', addDesc: '1 con un cero', hint: '10 × 1 = 10' },
      { factor: 2, result: 20, groupDesc: '10 grupos de 2', addDesc: '2 con un cero', hint: '10 × 2 = 20' },
      { factor: 3, result: 30, groupDesc: '10 grupos de 3', addDesc: '3 con un cero', hint: '10 × 3 = 30' },
      { factor: 4, result: 40, groupDesc: '10 grupos de 4', addDesc: '4 con un cero', hint: '10 × 4 = 40' },
      { factor: 5, result: 50, groupDesc: '10 grupos de 5', addDesc: '5 con un cero', hint: '10 × 5 = 50' },
      { factor: 6, result: 60, groupDesc: '10 grupos de 6', addDesc: '6 con un cero', hint: '10 × 6 = 60' },
      { factor: 7, result: 70, groupDesc: '10 grupos de 7', addDesc: '7 con un cero', hint: '10 × 7 = 70' },
      { factor: 8, result: 80, groupDesc: '10 grupos de 8', addDesc: '8 con un cero', hint: '10 × 8 = 80' },
      { factor: 9, result: 90, groupDesc: '10 grupos de 9', addDesc: '9 con un cero', hint: '10 × 9 = 90' },
      { factor: 10, result: 100, groupDesc: '10 grupos de 10', addDesc: '10 con un cero', hint: '¡Una centena completa! 100' }
    ]
  }
};
