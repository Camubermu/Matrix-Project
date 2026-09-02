# Matrix Project team 2 — Entrenamiento por métrica

Sitio estático de entrenamiento para el proyecto matriz del team 2. Un módulo por
métrica; el tutor entra con su correo y **solo ve el módulo de la métrica que le
activaste**.

Reutiliza el motor de `New-Educational-Training-Course` (mismo diseño, mismo
sistema de tarjetas y de evaluaciones), con una diferencia: aquí no hay módulos
principales obligatorios. El tutor entra y va directo a su métrica.

```
index.html              el entrenamiento (español)
assets/
  styles.css            diseño Kodland
  app.js                motor: login, tablero, evaluaciones
  content-es.js         TODO el texto, los módulos y las preguntas
  tutors.js             GENERADO — correos (hasheados) → métricas activadas
tools/
  generate_tutors.py    regenera tutors.js desde tutors.csv
  progress-api.gs       Apps Script para registrar quién completó y cuándo
tutors.csv              tu lista de tutores en seguimiento
images/  video/         material que agregues
```

Sin build, sin framework, sin backend. Va a GitHub Pages tal cual.

---

## El flujo del día a día

Esto es lo que haces cada vez que un tutor entra a un track:

1. Abres `tutors.csv` y agregas una fila: `correo,metrica`
2. Corres el generador
   ```bash
   python3 tools/generate_tutors.py tutors.csv > assets/tutors.js
   ```
3. Haces commit y push. En un minuto el sitio ya lo deja entrar.
4. Compartes el enlace en el canal de Slack de esa métrica.

Cuando el tutor sale del track, borras su fila y vuelves a correr el generador.
Deja de tener acceso.

### El CSV

```csv
email,metrica
ana.perez@kodland.team,attendance
luis.gomez@kodland.team,attendance;qa
c.bermudez@kodland.team,attendance;retentions;cwhw;qa
```

Valores aceptados en `metrica` (sin importar mayúsculas ni tildes):
`attendance` · `retentions` · `cwhw` · `qa`. Para varias métricas sepáralas con
**punto y coma**, nunca con coma — la coma es el separador de columnas del CSV y
partiría la fila en dos. Si escribes algo que no reconoce, te avisa en la
terminal en vez de ignorarlo en silencio.

Los correos se guardan como hash, no como texto, así que la lista de direcciones
no se puede copiar de la página publicada.

---

## Registrar quién completó y cuándo

Esta es la pieza que le da sentido al deadline del Día 3. Sin ella, el progreso
vive solo en el navegador del tutor y tú no ves nada.

`tools/progress-api.gs` es un Apps Script que guarda todo en una hoja de cálculo
tuya: una pestaña con el estado actual de cada tutor y otra con el historial
(fecha, correo, módulo, aprobado, puntaje). El archivo tiene las instrucciones
paso a paso arriba; son unos 10 minutos, una sola vez.

Cuando tengas la URL, pégala en `assets/app.js`:

```js
var PROGRESS_API = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE';
```

Mientras esa línea siga con el texto `PASTE_`, el sitio funciona igual pero sin
registro en servidor.

---

## Lo que este login sí es y lo que no es

**Sí es** un filtro de proceso: nadie que no esté en tu lista entra, y cada
correo ve exactamente la métrica que le pusiste. Eso es lo que sostiene el
principio de la matriz — que estar adentro significa haber pasado por el proceso.

**No es** autenticación. Un tutor que sepa el correo de otro puede entrar como
él. No hay contraseña ni verificación. Para el acompañamiento está bien; si en
algún momento el resultado va a pesar en una decisión formal sobre alguien,
conviene subirle el nivel (código de acceso, o magic link al correo).

---

## Los cuatro módulos

| Métrica | `id` | `bit` | Valor en el CSV |
|---|---|---|---|
| Attendance | `m-attendance` | `1` | `attendance` |
| Retentions | `m-retentions` | `2` | `retentions` |
| CW & HW | `m-cwhw` | `4` | `cwhw` |
| QA | `m-qa` | `8` | `qa` |

Los cuatro viven en `content-es.js`, dentro de `courses: [ ]`. Para agregar uno
nuevo, copia cualquiera de los bloques y cámbiale `id`, `bit`, título y
contenido — el `bit` siguiente sería `16`, y habría que agregarlo también al
diccionario `BITS` de `tools/generate_tutors.py`.

Los datos técnicos de cada módulo (umbrales, ventanas, periodos) salen del
*Global Tutor Rating & Retention Framework* y del *Rating Calculation Logic
(Technical)*. Si esos documentos cambian, hay que actualizar aquí:

- **Retentions** — la tabla de umbrales LatAm por periodo y la tabla de periodos
  por duración de curso. Los umbrales se recalculan cada trimestre.
- **QA** — las bandas de porcentaje.
- **CW & HW** — la ventana de 3 a 8 semanas y el margen de 3 semanas.
- **Attendance** — el umbral de entrada al track.

### Los tipos de tarjeta disponibles

```js
{ type: 'h',      ic: '🔍', t: 'Título de sección' }
{ type: 'text',   h: 'Encabezado', ic: '🎯', p: 'Un párrafo con <strong>HTML</strong>.' }
{ type: 'list',   h: 'Encabezado', items: ['uno', 'dos'], ordered: true }
{ type: 'iclist', h: 'Encabezado', items: [{ ic: '⏱', t: 'Con ícono.' }] }
{ type: 'steps',  items: [{ h: 'Paso', p: 'Qué hacer.' }] }
{ type: 'acc',    items: [{ ic: '📚', h: 'Sección', body: '<p>HTML</p>', open: true }] }
{ type: 'tabs',   tabs: [{ label: '1 · Nombre', cards: [ /* tarjetas anidadas */ ] }] }
{ type: 'ba',     beforeLbl: 'Antes', before: '…', afterLbl: 'Ahora', after: '…' }
{ type: 'table',  head: [...], rows: [[...]] }
{ type: 'check',  h: 'Checklist', items: ['…'] }
{ type: 'flow',   steps: [{ ic: '🎯', t: 'Objetivo' }] }
{ type: 'tip',    t: 'Un consejo.' }
{ type: 'warn',   t: 'Algo a tener cuidado.' }
{ type: 'good',   t: 'Algo tranquilizador.' }
{ type: 'quote',  t: '"…"', src: 'Atribución' }
{ type: 'link',   ic: '📘', href: '…', t: 'Título', d: 'Descripción' }
{ type: 'img',    src: 'images/x.png', alt: '…', cap: 'Pie de foto' }
{ type: 'video',  h: '…', src: 'video/x.mp4' }      // o { yt: 'ID_DE_YOUTUBE' }
{ type: 'divider' }
```

### Imágenes y videos

- **Imágenes**: ponlas en `images/` y referéncialas con
  `{ type: 'img', src: 'images/mi-captura.png', alt: 'Qué se ve', cap: 'Pie de foto' }`.
  Se ajustan solas al ancho.
- **Video de YouTube**: `{ type: 'video', h: 'Título', yt: 'ABC123xyz' }` — carga
  una miniatura liviana y solo reproduce si el tutor le da clic.
- **Video propio**: sube el `.mp4` a `video/` y usa
  `{ type: 'video', h: 'Título', src: 'video/mi-video.mp4' }`. Ojo con el peso:
  GitHub no es buen host para archivos grandes, arriba de ~25 MB mejor YouTube.

### Los cuatro formatos de pregunta

```js
// una sola correcta; c es el índice de la respuesta buena
{ type: 'mcq', ctx: 'Un tutor te dice…', q: '¿Qué respondes?',
  opts: ['A', 'B', 'C', 'D'], c: 1, fb: 'Por qué es la B.' }

// varias correctas; c es un arreglo de índices, tiene que acertarlas todas
{ type: 'multi', q: 'Selecciona todas las que apliquen.',
  opts: ['A', 'B', 'C', 'D'], c: [0, 2], fb: 'Por qué A y C.' }

// relacionar; cada fila tiene un desplegable con todas las opciones, barajadas
{ type: 'match', q: 'Relaciona cada caso con su acción.',
  pairs: [{ l: 'Faltó una vez', r: 'Mensaje el mismo día' }], fb: 'Explicación.' }

// respuesta escrita; mínimo de caracteres y después se revela la respuesta modelo
{ type: 'open', q: 'Escribe qué harías.', min: 180,
  model: '<ul><li>Una buena respuesta cubre…</li></ul>', fb: 'Compara con la tuya.' }
```

`ctx` es opcional en todas y muestra el escenario en un recuadro arriba de la
pregunta — es lo que convierte el test en casos reales y no en preguntas de
memoria. Las preguntas escritas siempre suman punto: existen para que el tutor
piense, no para calificarlo.

El orden de preguntas y de opciones se baraja en cada intento, así que repetir
la evaluación no es repetir de memoria. El puntaje nunca baja: un reintento
puede subirlo, nunca bajarlo. Se aprueba con **70%**.

---

## Publicar

Settings → Pages → Source: *Deploy from a branch*, rama `main`, carpeta `/ (root)`.
El sitio queda en `https://<usuario>.github.io/<repo>/`.

`.nojekyll` ya está, que es lo que suele romper un sitio estático en el primer
despliegue.

**Modo dev:** presiona `Shift+D` tres veces seguidas en cualquier pantalla. Entra
con las cuatro métricas desbloqueadas para que revises el contenido sin hacer las
evaluaciones. Tres veces más lo apaga y borra ese progreso de prueba.

---

## Editar el texto de la interfaz

Todo lo que el tutor lee — incluidos los mensajes de error del login, los textos
del tablero y los del resultado — está en el bloque `ui:` al principio de
`content-es.js`. `app.js` no contiene ni una línea de copy.
