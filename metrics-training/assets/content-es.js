/* ============================================================
   Matrix Project team 2 — Entrenamiento por métrica · ESPAÑOL
   Un módulo por métrica. El tutor solo ve el módulo de la
   métrica que su TL le activó en assets/tutors.js.
   ============================================================ */
window.CONTENT = {
lang: 'es',

/* ---------------- textos de interfaz ---------------- */
ui: {
  loginTitle: 'Matrix Project · team 2',
  loginSub: 'Entrenamiento por métrica. Ingresa con tu correo de trabajo para ver el módulo que tu Team Leader te activó.',
  loginBtn: 'Entrar al entrenamiento',
  loginHint: 'Usa el mismo correo con el que entras a Back Office (…@kodland.team). Tu progreso queda guardado.',
  emailPlaceholder: 'tunombre@kodland.team',
  errEmpty: 'Por favor escribe tu correo electrónico.',
  errFormat: 'Eso no parece un correo electrónico.',
  errNotFound: 'Este entrenamiento es por invitación. Si tu Team Leader te agregó a un canal de seguimiento y aún no puedes entrar, escríbele por ese mismo canal.',

  heroEyebrow: '🎯 Seguimiento por métrica · team 2',
  heroTitle: 'Tu módulo de <span class="h-pill">mejora</span>',
  heroSub: 'Este entrenamiento es solo para ti y para la métrica que estás trabajando. Lee el material y responde la evaluación al final — necesitas 70% para aprobarla.',
  homeNote: 'Tu Team Leader ve cuándo entraste y qué puntaje sacaste. Si algo del material no te queda claro, llévalo a la Open Room.',
  footer: 'Kodland · Matrix Project team 2',

  modulesLabel: 'módulos',
  completeWord: 'completos',
  allDone: '¡todo listo!',
  allDoneShort: '🏆 ¡Todo listo!',
  generalTitle: 'Entrenamiento principal',
  generalSub: 'Módulos que completan todos.',
  courseTitle: 'Tu métrica',
  courseSub: 'El módulo de la métrica que estás trabajando con tu Team Leader.',
  noCourses: 'Todavía no hay ninguna métrica activada para tu correo. <b>Escríbele a tu Team Leader</b> en el canal de seguimiento.',
  lockPrev: 'Aprueba primero el módulo anterior',
  lockGeneral: 'Termina primero los módulos principales',

  badgeDone: '✓ Listo',
  badgeStart: 'Empezar →',
  badgeLocked: '🔒 Bloqueado',
  score: 'Puntaje',
  reviewed: '✓ Revisado',
  resetProgress: 'Reiniciar mi progreso y empezar de nuevo',
  resetConfirm: '¿Reiniciar tu progreso? Se borran tus puntajes y el módulo vuelve a empezar. Esto no se puede deshacer.',
  syncButton: 'Actualizar mi progreso',
  syncConfirm: '¿Reemplazar lo que ves aquí con la última versión guardada de tu progreso?',
  syncEmpty: 'Todavía no hay progreso guardado en el servidor para tu cuenta.',
  goal: 'Objetivo',

  qType: { mcq: 'Opción múltiple', multi: 'Selecciona todas', match: 'Relacionar', open: 'Respuesta escrita' },
  multiHint: '☑️ Hay más de una respuesta correcta — selecciona todas las que apliquen.',
  matchHint: '🔗 Elige la respuesta que corresponde a cada fila.',
  openHint: '✍️ Escribe tu propia respuesta — mínimo {n} caracteres. No hay una única redacción correcta; verás una respuesta modelo para comparar.',
  openPlaceholder: 'Escribe tu respuesta aquí…',
  checkAnswer: 'Revisar mi respuesta',
  submitAnswer: 'Enviar mi respuesta',
  choose: 'Elige',
  recorded: 'Respuesta registrada.',
  modelAnswer: 'Respuesta modelo — compara con la tuya',
  markReviewed: 'Ya terminé de leer este módulo',
  moduleReviewed: 'Módulo marcado como revisado',

  devOn: 'MODO DEV — todo desbloqueado',
  devHint: 'Presiona Shift+D tres veces para apagar el modo dev y borrar este progreso.',
  devEmail: 'dev.preview@kodland.org',

  takeQuiz: '📝 Hacer la evaluación →',
  retakeQuiz: '🔁 Repetir la evaluación →',
  question: 'Pregunta',
  correct: '¡Correcto!',
  incorrect: 'Casi —',
  nextQ: 'Siguiente pregunta →',
  seeResults: 'Ver mi resultado →',
  exitQuiz: 'Salir',
  modules: 'Módulos',
  logout: 'Cerrar sesión',
  logoutConfirm: '¿Cerrar sesión? Tu progreso queda guardado.',

  passTitle: '¡Evaluación aprobada!',
  failTitle: 'Casi lo logras',
  passSub: 'Respondiste {n} de {t} correctamente. Tu Team Leader ya puede ver este resultado.',
  failSub: 'Respondiste {n} de {t} correctamente. Necesitas {p}% para aprobar — repasa el módulo e inténtalo de nuevo.',
  tryAgain: 'Intentar de nuevo',
  reviewModule: 'Repasar el módulo',
  backModules: '← Volver a los módulos',
  nextModule: 'Siguiente',
  goFinalDst: 'Ir a la evaluación final',
  seeCert: 'Ver mi constancia',

  certLabel: 'Módulo completado',
  certTitle: 'Matrix Project team 2 · Seguimiento por métrica',
  certSub: 'Completaste {n} módulo(s) con un promedio de {avg}%.',
  certNote: 'Ahora viene la parte que cuenta: aplicarlo. Tienes hasta el Día 15 para que la métrica lo refleje. Deja este material abierto como referencia.',

  finalDstTitle: 'Evaluación final del módulo',
  finalDstGo: 'Abrir la evaluación',
  finalDstLocked: 'Aprueba primero la evaluación del módulo',
  finalDstLockedNote: 'Completa la evaluación de arriba para desbloquear la final.',
  finalDstSoon: 'Enlace próximamente',
  finalDstSoonNote: 'Tu Team Leader compartirá aquí el enlace muy pronto.',

  videoFallback: 'Tu navegador no puede reproducir este video.',
  watchOnYouTube: 'Ver en YouTube ↗',
  videoMissing: 'Video próximamente — pídeselo a tu Team Leader en el canal.'
},


/* ============================================================
   Sin módulos principales: este entrenamiento es solo por métrica.
   Si algún día quieres un módulo que completen todos, agrégalo aquí.
   ============================================================ */
general: [],


/* ============================================================
   MÓDULOS POR MÉTRICA
   bit 1 = Attendance · 2 = Retentions · 4 = CW&HW · 8 = QA
   ============================================================ */
courses: [

/* ------------------------------------------------- ATTENDANCE */
{
  id: 'm-attendance', kind: 'course', bit: 1, num: 'Métrica · Attendance', emoji: '📋', color: '#2B8EF0',
  title: 'Blue attendance',
  desc: 'Cómo se mide tu asistencia, qué hacer con el estudiante que falta, y cómo recuperar lo perdido antes de que se vuelva deserción.',
  meta: '5 preguntas · 70%',
  chips: ['📊 Cómo se mide', '📞 Protocolo de ausencia', '🔴 Estado crítico'],
  objective: 'Que salgas de aquí con una rutina concreta: cuándo revisas tu asistencia, qué haces el mismo día que un estudiante falta, y cómo recuperas la lección perdida.',
  cards: [

    { type: 'h', ic: '🔍', t: 'De qué se trata esta métrica' },
    { type: 'text', p: 'La asistencia no es un dato administrativo que alguien más recoge: <strong>es tuya</strong>. Mide qué porcentaje de tus estudiantes está efectivamente en clase, lección tras lección. El mínimo esperado en team 2 es <strong>80%</strong>.' },
    { type: 'text', p: 'Estás leyendo esto porque tu cifra quedó por debajo de ese mínimo en la revisión semanal, y en la revisión manual se confirmó que no fue un error de registro. No es un llamado de atención: es un acompañamiento con fecha de inicio y de cierre.' },

    { type: 'ba',
      beforeLbl: 'Lo que suele pasar',
      before: 'El tutor se entera de que un estudiante lleva tres clases sin venir cuando ya lleva tres clases sin venir. Para entonces, el estudiante perdió el hilo del proyecto y volver le da pereza.',
      afterLbl: 'Lo que buscamos',
      after: 'El tutor detecta la primera ausencia el mismo día, contacta, y el estudiante regresa a la siguiente clase sabiendo exactamente qué se perdió y cómo lo va a recuperar.' },

    { type: 'h', ic: '📊', t: 'Cómo se mide' },
    { type: 'iclist', h: 'Tres cosas que conviene tener claras', items: [
      { ic: '🎯', t: 'El mínimo esperado es <strong>80%</strong>. Por debajo de eso entras al seguimiento.' },
      { ic: '🗓', t: 'Se mide por lección, no por mes. Una semana floja se nota.' },
      { ic: '✍️', t: 'Cuenta lo que <strong>tú registras</strong>. Una clase con asistencia perfecta que no quedó marcada, para la métrica no existió.' }
    ]},
    { type: 'warn', t: 'El error más común no es que los estudiantes falten: es marcar la asistencia tarde, en bloque, al final de la semana. Cuando se marca en bloque, se marca mal — y además pierdes la señal temprana de quién se está desconectando.' },

    { type: 'h', ic: '⏱', t: 'Tu rutina de revisión' },
    { type: 'steps', items: [
      { h: 'Al terminar cada clase', p: 'Marca la asistencia antes de cerrar la sesión. No al final del día, no mañana. Es el único momento en que recuerdas quién estuvo y quién no.' },
      { h: 'El mismo día de la ausencia', p: 'Si alguien faltó, contáctalo hoy. Un mensaje el mismo día se responde; uno de tres días después ya compite con la vergüenza de haber faltado.' },
      { h: 'Una vez por semana', p: 'Mira tus grupos completos: quién acumula ausencias, quién bajó de ritmo, quién no responde. Esa lista es tu trabajo de la semana.' }
    ]},

    { type: 'h', ic: '📞', t: 'Qué haces cuando alguien falta' },
    { type: 'text', p: 'No todas las ausencias son iguales, y responder igual a todas es lo que hace que el seguimiento se sienta como una tarea infinita. Estas son las tres situaciones y qué hace cada una:' },
    { type: 'acc', items: [
      { ic: '1️⃣', h: 'Faltó una vez y responde', open: true, body: '<p>Es el caso fácil y el que más se descuida. Escríbele el mismo día: qué se hizo en clase, qué necesita mirar antes de la próxima, y confirma que viene. <strong>Con eso normalmente se resuelve.</strong></p>' },
      { ic: '2️⃣', h: 'Falta seguido pero responde', body: '<p>Aquí hay una causa que todavía no conoces: horario, transporte, un tema del curso que se le atragantó, o algo de casa. Pregunta directamente y sin rodeos. Si la causa es de horario o de grupo, escálalo — no lo resuelves tú solo, pero sí eres quien lo detecta.</p>' },
      { ic: '3️⃣', h: 'No responde, o responde y no viene', body: '<p><strong>Esto es estado crítico.</strong> Es el escalón anterior a la deserción, y ya no es solo asistencia: es retención. Registra el caso, involucra a quien corresponda según el protocolo de tu equipo, y no lo dejes reposar esperando que aparezca solo.</p>' }
    ]},

    { type: 'h', ic: '🔴', t: 'Estado crítico' },
    { type: 'text', p: 'Llamamos estado crítico al estudiante que <strong>no responde por WhatsApp</strong>, o que <strong>responde pero no vuelve a clase</strong>. Son los dos casos que terminan en baja si nadie los toca.' },
    { type: 'check', h: 'Con un estudiante en estado crítico, revisa que hiciste esto', items: [
      'Lo contactaste directamente, no solo al grupo',
      'Intentaste por más de un canal antes de darlo por perdido',
      'Dejaste registro de cada intento y de la respuesta (o de la falta de respuesta)',
      'Escalaste el caso si después de tus intentos sigue sin volver',
      'Le dijiste concretamente qué se perdió y cómo lo recupera'
    ]},

    { type: 'h', ic: '♻️', t: 'Recuperar lo perdido' },
    { type: 'text', p: 'Un estudiante que vuelve y no entiende nada, vuelve a faltar. Por eso la recuperación es parte de la asistencia, no algo aparte.' },
    { type: 'iclist', h: 'Antes de que regrese', items: [
      { ic: '📌', t: 'Ten claro qué se perdió exactamente: no "la lección 6", sino qué hizo el grupo y en qué punto del proyecto quedaron.' },
      { ic: '🧭', t: 'Dale un camino corto para ponerse al día — lo mínimo indispensable para poder seguir la próxima clase, no todo el contenido.' },
      { ic: '👋', t: 'Recíbelo sin comentario sobre la ausencia. El objetivo es que vuelva, no que se justifique.' }
    ]},
    { type: 'good', t: 'Un estudiante que sabe que alguien notó que faltó, vuelve. Esa es, en la práctica, casi toda la métrica.' },

    { type: 'h', ic: '✅', t: 'Tu checklist de la semana' },
    { type: 'check', h: 'Si haces esto cada semana, la métrica sube sola', items: [
      'Marqué la asistencia al cerrar cada clase, sin excepción',
      'Contacté el mismo día a quien faltó',
      'Revisé mis grupos completos una vez y armé mi lista de la semana',
      'Identifiqué a mis estudiantes en estado crítico y actué sobre cada uno',
      'Cada estudiante que volvió sabía qué se perdió y cómo recuperarlo'
    ]}
  ],

  quiz: [

    { type: 'mcq',
      ctx: 'Es viernes. Al revisar tus grupos te das cuenta de que no marcaste la asistencia de las clases del martes y el miércoles.',
      q: '¿Qué haces?',
      opts: [
        'Marco todo ahora de memoria, y sigo así porque al final la cifra queda igual',
        'Marco lo que pueda reconstruir ahora, y a partir del lunes marco al cerrar cada clase',
        'Lo dejo así: marcar tarde cuenta como no marcar, así que no vale la pena',
        'Le pido a mi TL que lo marque él, que tiene acceso al sistema'
      ],
      c: 1,
      fb: 'Reconstruir lo de esta semana está bien, pero no es la solución: <strong>el problema es la rutina, no el olvido puntual</strong>. Marcar al cerrar cada clase es lo único que sostiene la métrica y, más importante, lo único que te da la señal temprana de quién se está desconectando.' },

    { type: 'mcq',
      ctx: 'Un estudiante faltó ayer por primera vez en el curso. Le escribiste y te respondió al rato: "sí profe, estaba enfermo, la próxima voy".',
      q: '¿Qué le respondes?',
      opts: [
        'Nada más, ya confirmó que viene',
        'Le recuerdo que la asistencia es importante y que trate de no faltar',
        'Le cuento qué hicimos en clase, qué necesita mirar antes de la próxima y le confirmo que lo espero',
        'Le paso la grabación completa de la lección para que la vea entera'
      ],
      c: 2,
      fb: 'Confirmar que viene no es suficiente: si llega perdido, la próxima ausencia está a la vuelta. Dale <strong>el camino corto</strong> — qué se perdió y qué necesita para poder seguir. La grabación completa suena generosa, pero pedirle 90 minutos de video a alguien que faltó por estar enfermo casi garantiza que no lo vea.' },

    { type: 'multi',
      q: 'Selecciona todas las situaciones que cuentan como estado crítico.',
      opts: [
        'Un estudiante que no responde por WhatsApp',
        'Un estudiante que faltó una vez y avisó',
        'Un estudiante que responde los mensajes pero no vuelve a clase',
        'Un estudiante que llegó 10 minutos tarde a la última clase'
      ],
      c: [0, 2],
      fb: 'Estado crítico son los dos casos que terminan en baja si nadie los toca: <strong>el que no responde</strong> y <strong>el que responde pero no vuelve</strong>. Una ausencia avisada y una llegada tarde son cosas que se manejan en la rutina normal — tratarlas como críticas te quema el tiempo que necesitas para los casos reales.' },

    { type: 'match',
      q: 'Relaciona cada situación con la acción que le corresponde.',
      pairs: [
        { l: 'Faltó una vez y responde', r: 'Mensaje el mismo día con lo que se perdió' },
        { l: 'Falta seguido pero responde', r: 'Preguntar la causa de fondo y escalar si es de horario o grupo' },
        { l: 'No responde por WhatsApp', r: 'Registrar el caso, insistir por otro canal y escalar' },
        { l: 'Vuelve después de faltar', r: 'Recibirlo sin comentario y darle el camino corto para ponerse al día' }
      ],
      fb: 'La clave es no responder igual a todas las ausencias. La primera se resuelve con un mensaje; la repetida necesita que encuentres la causa; la crítica necesita registro y escalamiento; y el regreso necesita que le allanes el camino para que no vuelva a irse.' },

    { type: 'open',
      ctx: 'Tienes un estudiante que lleva dos clases sin venir. Le escribiste después de la primera ausencia y no te respondió. Después de la segunda tampoco.',
      q: 'Escribe qué vas a hacer con este caso esta semana, paso por paso.',
      min: 180,
      model: '<ul><li><strong>Lo clasificas como estado crítico</strong> — no responde, y ya son dos.</li><li><strong>Intentas por otro canal</strong>, no solo WhatsApp: contacto del acudiente si aplica, o el canal que use tu equipo.</li><li><strong>Dejas registro</strong> de cada intento y de la fecha, para que el caso no dependa de tu memoria.</li><li><strong>Escalas</strong> si después de tus intentos sigue sin aparecer — a esta altura ya no es solo asistencia, es riesgo de baja.</li><li><strong>Preparas su regreso</strong>: qué se perdió exactamente y cuál es el camino mínimo para que pueda seguir la próxima clase.</li></ul>',
      fb: 'Lo importante no es la redacción sino que tu plan tenga las cinco piezas: clasificar, insistir por otro canal, registrar, escalar y preparar el regreso. Si te faltó alguna, esa es justo la que se te suele escapar en el día a día.' }
  ]
},

/* ------------------------------------------------- RETENTIONS */
{
  id: 'm-retentions', kind: 'course', bit: 2, num: 'Métrica · Retentions', emoji: '🤝', color: '#22C55E',
  title: 'Retención',
  desc: 'Los tres periodos del curso, qué significa perder un estudiante en cada uno, y cuáles bajas no te penalizan.',
  meta: '5 preguntas · 70%',
  chips: ['📆 Los 3 periodos', '⚖️ Qué cuenta y qué no', '🔮 Trabajo preventivo'],
  objective: 'Que entiendas cómo se corta tu retención, que sepas leer en qué periodo se te van los estudiantes y qué significa eso, y que empieces a trabajar los cortes antes de que lleguen.',
  cards: [

    { type: 'h', ic: '🔍', t: 'De qué se trata esta métrica' },
    { type: 'text', p: 'Retención mide algo muy simple: de los estudiantes que empiezan un tramo del curso contigo, <strong>cuántos siguen ahí al final de ese tramo</strong>. Cada estudiante que llega al corte vale 1 (se quedó) o 0 (se fue), y tu porcentaje es el promedio.' },
    { type: 'text', p: 'Es la métrica más importante del rating: funciona como <strong>portero</strong>. Puedes tener QA excelente y asistencia perfecta, pero si un periodo queda en Bad, el rating final queda en Bad. Por eso vale la pena entenderla bien y no solo mirarla al final del mes.' },

    { type: 'h', ic: '📆', t: 'El curso se corta en tres periodos' },
    { type: 'text', p: 'No es un solo corte al final: son tres, y dependen de cuántas lecciones tiene el curso. Cada periodo tiene además una <strong>ventana</strong> — el tramo donde la salida de un estudiante se cuenta como pérdida de ese periodo.' },
    { type: 'table', head: ['Curso', 'Periodo 1', 'Periodo 2', 'Periodo 3'], rows: [
      ['32 lecciones', 'Lecciones 1–10 (ventana hasta la 6)', 'Lecciones 11–18 (ventana hasta la 13)', 'Lecciones 19–32 (ventana hasta la 25)'],
      ['40 lecciones', 'Lecciones 1–13 (ventana hasta la 8)', 'Lecciones 14–25 (ventana hasta la 18)', 'Lecciones 26–40 (ventana hasta la 34)'],
      ['64 lecciones', 'Lecciones 1–20 (ventana hasta la 11)', 'Lecciones 21–40 (ventana hasta la 31)', 'Lecciones 41–64 (ventana hasta la 52)'],
      ['80 lecciones', 'Lecciones 1–26 (ventana hasta la 14)', 'Lecciones 27–60 (ventana hasta la 40)', 'Lecciones 61–80 (ventana hasta la 70)']
    ]},
    { type: 'tip', t: 'Un estudiante también necesita un mínimo de lecciones contigo para entrar en la cuenta: 3 en un curso de 32 lecciones, 4 en uno de 40, 7 en uno de 64 y 8 en uno de 80. Por debajo de eso, ni suma ni resta.' },

    { type: 'h', ic: '🎯', t: 'Las metas en LatAm' },
    { type: 'text', p: 'Los umbrales son distintos por región y se recalculan cada trimestre. Estos son los de LatAm para este trimestre:' },
    { type: 'table', head: ['Periodo', 'Increíble', 'Bueno', 'OK'], rows: [
      ['Periodo 1', '≥ 86%', '≥ 77%', '≥ 71.5%'],
      ['Periodo 2', '≥ 91%', '≥ 85%', '≥ 80.3%'],
      ['Periodo 3', '≥ 95%', '≥ 89%', '≥ 85%']
    ]},
    { type: 'text', p: 'Por debajo del OK es Malo. Fíjate en algo: <strong>la exigencia sube en cada periodo</strong>. Se espera menos retención al principio, cuando el estudiante todavía está decidiendo si esto le gusta, y mucha más al final, cuando ya lleva medio curso contigo.' },
    { type: 'good', t: 'El sistema redondea hacia arriba: un 89.5% se cuenta como 90%. No pierdas el sueño por un decimal.' },

    { type: 'h', ic: '🩺', t: 'Dónde se te van dice por qué se te van' },
    { type: 'text', p: 'Esta es la parte más útil de la métrica: <strong>el periodo en el que pierdes estudiantes es un diagnóstico</strong>. No es lo mismo perder en el primero que en el tercero.' },
    { type: 'acc', items: [
      { ic: '1️⃣', h: 'Se van en el Periodo 1 — es adaptación', open: true, body: '<p>El estudiante llegó, probó y no se quedó. Casi siempre apunta a la <strong>primera lección (M1L1)</strong>: no hubo enganche, la clase no dejó ganas de volver, o el estudiante quedó mal ubicado en edad o nivel para ese grupo.</p><p>Qué hacer: cuida la M1L1 como si fuera la única clase del curso. Y si notas que un estudiante quedó fuera de nivel, dilo pronto en vez de esperar a que se aburra.</p>' },
      { ic: '2️⃣', h: 'Se van en el Periodo 2 — es hábito', open: false, body: '<p>Aquí el estudiante ya te conoció y aun así se fue. Eso apunta a <strong>monotonía</strong>: las clases se volvieron predecibles, faltó dinamismo, o hubo demora en revisarle el classwork y el homework y dejó de sentir que su trabajo importaba.</p><p>Qué hacer: rompe la rutina cada tanto, y ponte al día con las revisiones. La conexión entre CW/HW atrasado y bajas en el Periodo 2 es directa.</p>' },
      { ic: '3️⃣', h: 'Se van en el Periodo 3 — es lealtad', open: false, body: '<p>Ya llevan medio curso contigo y se van al final. Eso es <strong>desgaste de la relación</strong> o falta de manejo de expectativas sobre qué sigue después del curso.</p><p>Qué hacer: en el último tramo, habla del futuro. Que el estudiante sepa qué viene, qué va a poder hacer, por qué vale la pena terminar y seguir.</p>' }
    ]},

    { type: 'h', ic: '⚖️', t: 'Qué te penaliza y qué no' },
    { type: 'text', p: 'Mucha gente asume que toda salida cuenta en contra. No es así, y saberlo cambia cómo lees tu número.' },
    { type: 'table', head: ['Situación', 'Cómo se cuenta'], rows: [
      ['El estudiante abandonó el curso', '0 — cuenta en contra'],
      ['Pidió reembolso', '0 — cuenta en contra'],
      ['Se puso en pausa por razones que no son vacaciones ni salud', '0 — cuenta en contra'],
      ['Se puso en pausa por salud', '1 — cuenta como retenido'],
      ['Lo transfirieron porque Kodland cerró o reorganizó el grupo', '1 — cuenta como retenido'],
      ['Volvió después de una pausa', '1 — cuenta como retenido'],
      ['Se graduó', '1 — cuenta como retenido'],
      ['Se puso en pausa por vacaciones o un viaje', 'No cuenta — sale del cálculo'],
      ['Hubo cambio de tutor', 'No cuenta — sale del cálculo'],
      ['No alcanzó el mínimo de lecciones contigo', 'No cuenta — sale del cálculo']
    ]},
    { type: 'warn', t: 'Que un caso deba salir del cálculo no significa que salga solo. Si un estudiante tuyo se fue de vacaciones o lo movieron por una razón interna, dilo — es la diferencia entre un 0 que no te correspondía y un caso neutro.' },

    { type: 'h', ic: '🔮', t: 'Trabajar el corte antes de que llegue' },
    { type: 'ba',
      beforeLbl: 'Lo que suele pasar',
      before: 'El tutor se entera de su retención cuando el periodo ya cerró. Para ese momento los estudiantes que se iban a ir ya se fueron, y no hay nada que hacer hasta el siguiente corte.',
      afterLbl: 'Lo que buscamos',
      after: 'El tutor sabe qué grupos cierran periodo en las próximas semanas, identifica quién está en riesgo dentro de esos grupos, y trabaja esos casos antes de que el corte llegue.' },
    { type: 'steps', items: [
      { h: 'Mira qué grupos están por cerrar periodo', p: 'Los cortes se ven venir con semanas de anticipación. Tu TL los revisa con 14 a 30 días de margen — pídele esa lista o llévala tú.' },
      { h: 'Dentro de esos grupos, identifica el riesgo', p: 'Quién viene faltando, quién dejó de entregar, quién ya no participa. Esos son los que se van a caer en el corte.' },
      { h: 'Trabaja esos casos primero', p: 'No repartas tu energía por igual. Un estudiante en riesgo a tres clases del corte vale más de tu atención que uno estable a mitad de periodo.' }
    ]},

    { type: 'h', ic: '✅', t: 'Tu checklist' },
    { type: 'check', h: 'Si haces esto, la retención deja de ser una sorpresa', items: [
      'Sé en qué periodo está cada uno de mis grupos',
      'Sé cuáles cierran periodo en las próximas semanas',
      'Tengo identificados los estudiantes en riesgo dentro de esos grupos',
      'Cuido la M1L1 como la clase más importante del curso',
      'Reviso CW y HW a tiempo, porque el atraso se paga en el Periodo 2',
      'Reporto los casos que no deberían contarme en contra (vacaciones, traslados internos, cambio de tutor)'
    ]}
  ],

  quiz: [

    { type: 'mcq',
      ctx: 'Revisas tu retención y ves que estás bien en Periodo 1 y Periodo 3, pero en Periodo 2 estás por debajo del umbral.',
      q: '¿Qué te está diciendo ese patrón?',
      opts: [
        'Que tu primera lección no engancha a los estudiantes',
        'Que las clases se volvieron monótonas o que vas atrasado revisando CW y HW',
        'Que no estás manejando las expectativas sobre qué sigue después del curso',
        'Que los estudiantes te fueron asignados con la edad o el nivel equivocado'
      ],
      c: 1,
      fb: 'Cada periodo diagnostica algo distinto. El <strong>Periodo 2 es formación de hábito</strong>: si un estudiante ya te conoció y aun así se fue a mitad de camino, apunta a monotonía en clase o a demoras en revisarle el trabajo. Los problemas de M1L1 y de encaje de nivel se ven en el Periodo 1; los de expectativas, en el Periodo 3.' },

    { type: 'multi',
      q: 'Selecciona todas las situaciones que NO cuentan en contra de tu retención.',
      opts: [
        'Un estudiante se puso en pausa porque se fue de viaje con la familia',
        'Un estudiante pidió reembolso',
        'Un estudiante fue transferido porque Kodland reorganizó el grupo',
        'Un estudiante dejó de venir sin dar explicación'
      ],
      c: [0, 2],
      fb: 'La pausa por vacaciones o viaje <strong>sale del cálculo</strong> (ni suma ni resta), y una transferencia por reorganización interna de Kodland <strong>cuenta como retenido</strong>. El reembolso y el abandono sí cuentan como pérdida. Vale la pena saberlo: si no reportas los casos neutros, terminas cargando ceros que no te corresponden.' },

    { type: 'mcq',
      ctx: 'Estás en LatAm. Tu retención del Periodo 3 cerró en 89.5%.',
      q: '¿En qué banda quedas?',
      opts: [
        'Malo, porque estás por debajo de 95%',
        'OK, porque pasas 85% pero no llegas a 89%',
        'Bueno, porque el sistema redondea hacia arriba y 89.5% se cuenta como 90%',
        'Increíble, porque el Periodo 3 tiene el umbral más bajo'
      ],
      c: 2,
      fb: 'En LatAm el Periodo 3 pide ≥95% para Increíble, ≥89% para Bueno y ≥85% para OK. Con 89.5% pasas el umbral de Bueno — y además el sistema <strong>redondea hacia arriba</strong>, precisamente para que nadie pierda una banda por decimales. Ojo con la última opción: el Periodo 3 es el más exigente, no el más suave.' },

    { type: 'match',
      q: 'Relaciona cada periodo con lo que su caída suele significar.',
      pairs: [
        { l: 'Caídas en Periodo 1', r: 'Adaptación: falló el enganche de la primera lección o el encaje de nivel' },
        { l: 'Caídas en Periodo 2', r: 'Hábito: monotonía en clase o atraso revisando CW y HW' },
        { l: 'Caídas en Periodo 3', r: 'Lealtad: desgaste de la relación o expectativas mal manejadas' },
        { l: 'Retención sin datos suficientes', r: 'El sistema pasa a mirar tu asistencia como indicador principal' }
      ],
      fb: 'Leer el periodo es leer la causa. Y el último caso importa: si tienes pocos estudiantes llegando a un corte, el sistema <strong>no te penaliza con una retención mal calculada</strong> — cambia a asistencia como indicador principal.' },

    { type: 'open',
      ctx: 'Tu TL te avisa que dos de tus grupos cierran Periodo 2 en tres semanas.',
      q: 'Escribe qué vas a hacer en esas tres semanas con esos dos grupos.',
      min: 180,
      model: '<ul><li><strong>Identificar el riesgo dentro de esos grupos</strong>: quién viene faltando, quién dejó de entregar, quién ya no participa.</li><li><strong>Priorizar</strong>: concentrar el esfuerzo en esos estudiantes, no repartirlo por igual entre todos.</li><li><strong>Atacar las causas típicas del Periodo 2</strong>: ponerse al día con las revisiones de CW y HW, y meterle variedad a las clases para romper la monotonía.</li><li><strong>Contactar a los que están en riesgo</strong> antes del corte, no después.</li><li><strong>Reportar los casos neutros</strong> (vacaciones, traslados internos) para que no cuenten como pérdida.</li></ul>',
      fb: 'La idea es que el corte deje de ser una fecha en la que te enteras del resultado, y pase a ser una fecha para la que te preparas. Si tu plan tiene identificación de riesgo, priorización y acción antes del corte, vas bien.' }
  ]
},

/* ------------------------------------------------------- CW&HW */
{
  id: 'm-cwhw', kind: 'course', bit: 4, num: 'Métrica · CW & HW', emoji: '📝', color: '#F59E0B',
  title: 'Classwork y Homework',
  desc: 'La ventana de subida en el LMS, por qué el sistema te da tres semanas de margen, y por qué esta métrica pesa más de lo que parece.',
  meta: '5 preguntas · 70%',
  chips: ['🗓 La ventana', '⏳ El margen de 3 semanas', '⚠️ Señal de responsabilidad'],
  objective: 'Que entiendas exactamente cuándo hay que subir las tareas, por qué el sistema no te está midiendo lo de esta semana, y por qué un atraso repetido acá pesa más que un mal puntaje aislado en otra métrica.',
  cards: [

    { type: 'h', ic: '🔍', t: 'De qué se trata esta métrica' },
    { type: 'text', p: 'Esta métrica revisa que el <strong>classwork y el homework estén subidos al LMS</strong>. No mide qué tan bonita es la tarea ni cuánto se demora el estudiante: mide que tú hayas hecho tu parte, a tiempo.' },
    { type: 'text', p: 'De todas las métricas del rating, esta es la más fácil de arreglar — y por eso mismo es la que peor se ve cuando está mal. No requiere mejorar como docente ni convencer a nadie de nada. Requiere una rutina.' },

    { type: 'h', ic: '🗓', t: 'La ventana: entre 3 y 8 semanas antes' },
    { type: 'text', p: 'Las tareas deben estar cargadas <strong>entre 3 y 8 semanas antes</strong> de la lección. No es un plazo de entrega después de la clase: es preparación por adelantado.' },
    { type: 'flow', steps: [
      { ic: '📤', t: '8 semanas antes: se abre la ventana para cargar' },
      { ic: '✅', t: '3 semanas antes: debería estar cargado' },
      { ic: '🎓', t: 'Día de la lección' }
    ]},

    { type: 'h', ic: '⏳', t: 'Por qué el sistema ignora las últimas 3 semanas' },
    { type: 'text', p: 'Esto es lo que casi nadie sabe y conviene que sepas: el sistema revisa una ventana de 8 semanas, pero <strong>ignora deliberadamente las 3 semanas más recientes</strong>.' },
    { type: 'text', p: 'Ese margen existe para que a nadie lo marquen como incumplido por algo que todavía está dentro de un plazo razonable — el estudiante todavía puede entregar y tú todavía puedes revisar. Es un colchón a tu favor.' },
    { type: 'warn', t: 'La consecuencia práctica: lo que ves reflejado en tu métrica hoy es lo que pasó hace más de tres semanas. Si corriges tu rutina esta semana, el número tarda en moverse. No es que no esté funcionando — es el diseño de la ventana.' },

    { type: 'h', ic: '⚠️', t: 'Por qué esta métrica pesa más de lo que parece' },
    { type: 'text', p: 'Un puntaje bajo aislado en cualquier métrica se trabaja con acompañamiento. Pero <strong>el incumplimiento repetido en CW y HW no se lee como un problema técnico: se lee como falta de responsabilidad</strong>.' },
    { type: 'text', p: 'Y eso importa porque la falta de responsabilidad es, por sí sola, uno de los criterios que puede llevar a un tutor a periodo de prueba — incluso cuando su calidad de enseñanza está bien y ninguna otra métrica ha caído a Malo.' },
    { type: 'ba',
      beforeLbl: 'Cómo se ve desde afuera',
      before: 'Un tutor al que le recuerdan tres veces que suba las tareas y sigue sin subirlas. No es que no sepa cómo: es que no lo está priorizando. Eso es lo que queda documentado.',
      afterLbl: 'Cómo se ve cuando está resuelto',
      after: 'Un tutor que dedica un bloque fijo de la semana a dejar cargado lo del siguiente mes. Nadie tiene que recordarle nada, y su métrica no vuelve a aparecer en la revisión.' },

    { type: 'h', ic: '🔗', t: 'La conexión con retención' },
    { type: 'text', p: 'Esto no es solo administrativo. El atraso en revisar classwork y homework es <strong>una de las causas típicas de las bajas en el Periodo 2</strong> de retención.' },
    { type: 'text', p: 'Tiene sentido si lo miras desde el estudiante: hizo el trabajo, lo entregó, y nadie lo miró. La próxima vez lo hace con menos ganas. A la tercera, deja de hacerlo. Y poco después deja de venir.' },
    { type: 'good', t: 'Ponerte al día con las revisiones te arregla dos métricas al tiempo. Es el mejor rendimiento por esfuerzo de todo el rating.' },

    { type: 'h', ic: '⏱', t: 'La rutina que lo resuelve' },
    { type: 'steps', items: [
      { h: 'Un bloque fijo a la semana', p: 'Escoge un día y una hora — el mismo siempre. Media hora suele bastar. Lo que no tiene hora asignada, no se hace.' },
      { h: 'Trabaja con un mes de adelanto', p: 'No cargues lo de la próxima semana: carga lo del mes que viene. Así un imprevisto no te tumba la métrica.' },
      { h: 'Revisa lo entregado en el mismo bloque', p: 'Aprovecha que ya estás en el LMS. Revisar y dejar retroalimentación es lo que hace que el estudiante siga entregando.' }
    ]},

    { type: 'h', ic: '✅', t: 'Tu checklist' },
    { type: 'check', h: 'Semana a semana', items: [
      'Tengo un bloque fijo en la semana para el LMS',
      'Lo del próximo mes ya está cargado, no solo lo de la próxima clase',
      'Reviso lo que los estudiantes entregaron y les dejo retroalimentación',
      'No dependo de que me recuerden: la rutina va sola',
      'Entiendo que lo que arregle hoy se va a ver reflejado en unas semanas, no mañana'
    ]}
  ],

  quiz: [

    { type: 'mcq',
      ctx: 'Llevas dos semanas poniéndote al día: cargaste todo lo pendiente y revisaste las entregas atrasadas. Revisas tu métrica y sigue igual de baja.',
      q: '¿Qué está pasando?',
      opts: [
        'El sistema no registró lo que subiste, hay que reportarlo como error',
        'El sistema ignora las últimas 3 semanas, así que lo que arreglaste todavía no se refleja',
        'Los cambios solo se ven al final del trimestre',
        'Ponerse al día no sirve: lo que ya está incumplido no se puede recuperar'
      ],
      c: 1,
      fb: 'El sistema revisa una ventana de 8 semanas pero <strong>ignora deliberadamente las 3 más recientes</strong>, como margen para que estudiantes entreguen y tutores revisen. Lo que estás viendo hoy es la foto de hace más de tres semanas. Tu trabajo sí cuenta; solo tarda en aparecer.' },

    { type: 'mcq',
      ctx: 'Un tutor tiene QA en Bueno, asistencia en Bueno y retención en OK. Pero lleva un mes sin subir CW y HW, y su TL ya se lo recordó dos veces.',
      q: '¿Cómo se lee esta situación?',
      opts: [
        'No pasa nada mientras las otras métricas estén bien: CW y HW es solo administrativo',
        'Se lee como falta de responsabilidad, que por sí sola puede llevar a periodo de prueba aunque ninguna métrica esté en Malo',
        'Se le baja automáticamente el rating a Malo por el incumplimiento',
        'Hay que esperar a que otra métrica caiga antes de tomar cualquier acción'
      ],
      c: 1,
      fb: 'El incumplimiento repetido pese a los recordatorios <strong>no se lee como un problema técnico sino como falta de compromiso</strong>, y eso es un criterio de periodo de prueba por sí solo — independiente de que las demás métricas estén bien. No baja el rating de forma automática, pero cambia por completo cómo se lee el caso.' },

    { type: 'multi',
      q: 'Selecciona todo lo que es cierto sobre la ventana de CW y HW.',
      opts: [
        'Las tareas deben estar cargadas entre 3 y 8 semanas antes de la lección',
        'El sistema ignora las 3 semanas más recientes',
        'Es un plazo para subir la tarea después de dictar la clase',
        'El margen de 3 semanas existe para dar tiempo a entregar y revisar'
      ],
      c: [0, 1, 3],
      fb: 'La única falsa es la tercera: <strong>no es un plazo posterior a la clase, es preparación por adelantado</strong>. Todo lo demás es correcto — la ventana de 3 a 8 semanas antes, el margen que ignora lo más reciente, y la razón de ese margen.' },

    { type: 'match',
      q: 'Relaciona cada hábito con lo que produce.',
      pairs: [
        { l: 'Cargar con un mes de adelanto', r: 'Un imprevisto no te tumba la métrica' },
        { l: 'Revisar las entregas y dar retroalimentación', r: 'El estudiante sigue entregando y no se desconecta' },
        { l: 'Dejar el LMS para cuando haya tiempo', r: 'Se acumula y termina documentado como incumplimiento' },
        { l: 'Un bloque fijo semanal para el LMS', r: 'La rutina va sola, sin depender de recordatorios' }
      ],
      fb: 'Esta métrica no se arregla con voluntad sino con calendario. Todo lo que funciona tiene una hora asignada; todo lo que falla es lo que se dejó para cuando hubiera tiempo.' },

    { type: 'open',
      ctx: 'Vas a armar tu rutina de LMS desde cero para no volver a caer en esta métrica.',
      q: 'Escribe cuál va a ser tu rutina: cuándo, qué haces exactamente y con cuánta anticipación.',
      min: 180,
      model: '<ul><li><strong>Un día y una hora fijos</strong> cada semana, siempre los mismos — lo que no tiene hora asignada no se hace.</li><li><strong>Cargar con un mes de adelanto</strong>, no solo lo de la próxima clase, para que un imprevisto no tumbe la métrica.</li><li><strong>Revisar en ese mismo bloque</strong> lo que los estudiantes entregaron, y dejar retroalimentación.</li><li><strong>Verificar que todo lo del mes siguiente esté cargado</strong> antes de cerrar el bloque.</li><li>Tener claro que <strong>los cambios tardan unas semanas</strong> en verse reflejados, por el margen de 3 semanas del sistema.</li></ul>',
      fb: 'Lo importante es que tu rutina tenga hora fija y anticipación de al menos un mes. Si tu plan depende de "cuando tenga un rato", es el mismo plan que te trajo hasta acá.' }
  ]
},

/* ---------------------------------------------------------- QA */
{
  id: 'm-qa', kind: 'course', bit: 8, num: 'Métrica · QA', emoji: '🎓', color: '#A855F7',
  title: 'Calidad pedagógica (AutoQA)',
  desc: 'Qué evalúa AutoQA, cómo se leen las bandas, y por qué esta es la única métrica que puede hundir tu rating por sí sola.',
  meta: '5 preguntas · 70%',
  chips: ['🤖 Cómo evalúa', '📉 La regla del Bad', '🎬 Grabaciones reales'],
  objective: 'Que sepas qué se está evaluando en cada una de tus clases, qué significa cada banda, y por qué esta métrica merece más atención que cualquier otra cuando está en riesgo.',
  cards: [

    { type: 'h', ic: '🔍', t: 'De qué se trata esta métrica' },
    { type: 'text', p: 'AutoQA evalúa la <strong>calidad pedagógica de tus lecciones</strong> de forma automática. No es una muestra ni una visita sorpresa: revisa <strong>todas tus lecciones de los últimos 90 días</strong> y saca un promedio.' },
    { type: 'text', p: 'Eso tiene dos caras. La buena: una clase floja aislada no te hunde, porque se promedia con todas las demás. La otra: <strong>una buena clase esta semana tampoco borra un mes malo</strong>. Esta métrica se mueve despacio, en las dos direcciones.' },

    { type: 'h', ic: '📊', t: 'Las bandas' },
    { type: 'table', head: ['Banda', 'Promedio'], rows: [
      ['Increíble (Amazing)', '≥ 90%'],
      ['Bueno (Good)', '65% – 89%'],
      ['OK', '35% – 64%'],
      ['Malo (Bad)', '15% – 34%'],
      ['Terrible', '< 14%']
    ]},
    { type: 'text', p: 'Fíjate en el ancho de la banda de Bueno: va de 65 a 89. Es un rango amplio a propósito — no se espera perfección en cada clase, se espera consistencia.' },

    { type: 'h', ic: '📉', t: 'La regla que hay que conocer' },
    { type: 'warn', t: 'QA es la única métrica que puede hundir tu rating final por sí sola. Si tu QA queda en Malo, tu rating final queda en Malo — aunque tu retención, tu asistencia y tus tareas estén perfectas.' },
    { type: 'text', p: 'Ninguna otra métrica funciona así. En las demás, un mal resultado se compensa o se lee en conjunto. En QA no: entra directo al resultado final.' },
    { type: 'text', p: 'Por eso, si estás en este módulo, esto es lo más urgente de tu rating aunque el resto se vea bien. No es alarmismo — es cómo está construida la fórmula.' },

    { type: 'h', ic: '🎬', t: 'Qué pasa cuando tu QA baja' },
    { type: 'text', p: 'Cuando un QA queda en OK, el TL no se queda con el número: <strong>ve una o dos de tus grabaciones completas</strong>. La idea no es auditarte sino encontrar el punto débil concreto, porque un promedio no dice qué arreglar.' },
    { type: 'iclist', h: 'Lo que suele encontrarse en esas revisiones', items: [
      { ic: '⏱', t: '<strong>Pacing</strong> — la clase va demasiado lenta y sobra tiempo, o demasiado rápida y la mitad del grupo se queda atrás.' },
      { ic: '🙋', t: '<strong>Engagement</strong> — el tutor explica bien pero el grupo está en silencio, sin participar ni preguntar.' },
      { ic: '🎛', t: '<strong>Manejo del aula</strong> — se pierde el control del ritmo, o un par de estudiantes acaparan toda la clase.' }
    ]},
    { type: 'tip', t: 'Casi siempre es un punto débil recurrente, no muchos a la vez. Encontrar cuál es tuyo vale más que intentar mejorar todo al mismo tiempo.' },

    { type: 'h', ic: '🔗', t: 'La conexión con la primera lección' },
    { type: 'text', p: 'Cuando se pierden estudiantes en el Periodo 1 de retención, lo primero que se revisa son <strong>las notas de AutoQA de las primeras clases</strong>. Ahí es donde suele estar la explicación.' },
    { type: 'text', p: 'La M1L1 es la clase que decide si el estudiante quiere volver. Tiene el peso más alto de todo el curso y es donde más rinde el esfuerzo: una M1L1 bien hecha te mejora QA y retención al tiempo.' },

    { type: 'h', ic: '📈', t: 'Cómo se sube una métrica que se mueve despacio' },
    { type: 'steps', items: [
      { h: 'Encuentra tu punto débil, no todos', p: 'Pide la revisión de una grabación con tu TL y sal de ahí con un solo punto concreto para trabajar. Uno bien trabajado mueve el promedio más que cinco a medias.' },
      { h: 'Aplícalo en todas las clases, no en una', p: 'Como es un promedio de 90 días, lo que cuenta es el cambio sostenido. Una clase excelente no mueve la aguja.' },
      { h: 'Cuida especialmente las M1L1', p: 'Son las que más pesan en el resultado real: en QA y en la retención del Periodo 1.' },
      { h: 'Ten paciencia con el número', p: 'El promedio de 90 días tarda en reflejar la mejora. Lo que vas a notar primero es el aula, no el tablero.' }
    ]},

    { type: 'h', ic: '✅', t: 'Tu checklist' },
    { type: 'check', h: 'Para trabajar tu QA', items: [
      'Sé cuál es mi punto débil concreto, no una idea general de "mejorar"',
      'Vi al menos una grabación mía con mi TL y salí con una acción específica',
      'Estoy aplicando ese cambio en todas las clases, no solo cuando me acuerdo',
      'Preparo la M1L1 con más cuidado que cualquier otra lección',
      'Entiendo que el número tarda en moverse porque promedia 90 días'
    ]}
  ],

  quiz: [

    { type: 'mcq',
      ctx: 'Un tutor tiene retención Increíble en los tres periodos, asistencia Increíble y sus tareas al día. Su QA quedó en Malo.',
      q: '¿En qué queda su rating final?',
      opts: [
        'Increíble, porque tres de cuatro métricas están en el máximo',
        'Bueno, porque las otras métricas compensan el QA',
        'Malo, porque un QA en Malo hunde el rating final por sí solo',
        'OK, porque se promedian las cuatro métricas'
      ],
      c: 2,
      fb: 'Esta es la regla que hay que tener presente: <strong>un QA en Malo lleva el rating final a Malo</strong>, sin importar qué tan bien esté todo lo demás. Es la única métrica que funciona así, y por eso merece atención prioritaria cuando está en riesgo.' },

    { type: 'mcq',
      ctx: 'Después de una conversación con tu TL diste una clase excelente el martes. El miércoles revisas tu QA y no cambió.',
      q: '¿Por qué?',
      opts: [
        'AutoQA solo evalúa una muestra de clases y la tuya no entró',
        'Porque AutoQA promedia todas las lecciones de los últimos 90 días, así que una clase sola casi no mueve el promedio',
        'Porque las mejoras solo se cargan al cierre del mes',
        'Porque AutoQA no evalúa clases individuales sino la opinión de los estudiantes'
      ],
      c: 1,
      fb: 'AutoQA <strong>evalúa todas tus lecciones de los últimos 90 días</strong> y saca el promedio. Eso te protege de que una clase floja te hunda, pero también significa que una buena clase aislada no te levanta. Lo que mueve el número es el cambio sostenido en todas las clases.' },

    { type: 'multi',
      q: 'Selecciona todo lo que es cierto sobre AutoQA.',
      opts: [
        'Evalúa todas las lecciones de los últimos 90 días, no una muestra',
        'Un QA en Malo puede llevar el rating final a Malo por sí solo',
        'La banda de Bueno va de 65% a 89%',
        'Se necesita 90% o más en cada clase para no bajar de banda'
      ],
      c: [0, 1, 2],
      fb: 'La falsa es la última: el 90% es el umbral de <strong>Increíble sobre el promedio</strong>, no un mínimo por clase. La banda de Bueno es deliberadamente ancha (65–89) porque lo que se busca es consistencia, no perfección clase a clase.' },

    { type: 'match',
      q: 'Relaciona cada situación con lo que suele indicar.',
      pairs: [
        { l: 'Sobra tiempo al final o la mitad del grupo se queda atrás', r: 'Problema de pacing' },
        { l: 'Explicas bien pero nadie participa ni pregunta', r: 'Problema de engagement' },
        { l: 'Dos estudiantes acaparan toda la clase', r: 'Problema de manejo del aula' },
        { l: 'Pierdes estudiantes en el Periodo 1 de retención', r: 'Se revisa el AutoQA de tus primeras clases, sobre todo la M1L1' }
      ],
      fb: 'Casi siempre hay un punto débil recurrente, no varios a la vez. Identificar cuál es el tuyo es más útil que proponerte "mejorar la clase" en general — y el último caso muestra por qué QA y retención se leen juntas.' },

    { type: 'open',
      ctx: 'Tu TL vio una grabación tuya y el punto débil que encontró fue el engagement: explicas bien, pero el grupo casi no participa.',
      q: 'Escribe tu plan para las próximas semanas.',
      min: 180,
      model: '<ul><li><strong>Un cambio concreto, no varios</strong>: por ejemplo, abrir cada bloque con una pregunta al grupo en vez de con la explicación.</li><li><strong>Aplicarlo en todas las clases</strong>, no solo cuando me acuerde — como es un promedio de 90 días, lo que cuenta es la consistencia.</li><li><strong>Cuidar especialmente las M1L1</strong>, que son las que más pesan en QA y en la retención del Periodo 1.</li><li><strong>Volver a revisar una grabación con el TL</strong> después de unas semanas, para confirmar que el cambio se nota en el aula.</li><li><strong>No esperar que el número se mueva rápido</strong>: lo primero que cambia es la clase, el promedio viene después.</li></ul>',
      fb: 'Un buen plan acá tiene una sola acción concreta, aplicada de forma sostenida, con una revisión de seguimiento. Si tu plan tiene cinco cosas para mejorar al tiempo, probablemente no vas a sostener ninguna.' }
  ]
}

]
};
