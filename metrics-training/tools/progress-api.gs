/**
 * Registro de progreso para el entrenamiento por métrica (Matrix Project team 2).
 *
 * Guarda en una hoja de cálculo quién entró, qué módulo completó, con qué
 * puntaje y cuándo. Es lo que te permite saber si el tutor cumplió el deadline.
 *
 * ── Cómo montarlo (10 minutos, una sola vez) ─────────────────────────────
 *
 *  1. Crea una hoja de cálculo nueva en Google Drive. Llámala como quieras.
 *  2. Extensiones → Apps Script.
 *  3. Borra lo que haya y pega este archivo completo.
 *  4. Implementar → Nueva implementación → tipo "Aplicación web".
 *       Ejecutar como:        Yo
 *       Quién tiene acceso:   Cualquier usuario
 *  5. Copia la URL que termina en /exec.
 *  6. Pégala en assets/app.js, en la línea:
 *       var PROGRESS_API = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE';
 *
 * Cada vez que edites este script tienes que volver a implementar
 * (Implementar → Administrar implementaciones → editar → Nueva versión),
 * si no, la URL sigue sirviendo la versión vieja.
 *
 * ── Qué vas a ver en la hoja ─────────────────────────────────────────────
 *
 *  Hoja "progress" — una fila por tutor, el estado actual:
 *      email · progreso (JSON) · última actualización
 *
 *  Hoja "log" — una fila por evento, el historial completo:
 *      fecha · email · módulo · aprobado · puntaje
 *
 *  La hoja "log" es la que usas para el seguimiento: ordena por fecha y ves
 *  quién completó qué y cuándo, contra el Día 3 de tu timeline.
 */

var SHEET_STATE = 'progress';
var SHEET_LOG = 'log';

/* ---------- lectura: el sitio pide el progreso guardado de un correo ---------- */
function doGet(e) {
  var email = String((e.parameter.email || '')).trim().toLowerCase();
  var cb = e.parameter.callback;
  var payload = { progress: email ? readProgress_(email) : null };
  var body = JSON.stringify(payload);

  if (cb) {
    return ContentService
      .createTextOutput(cb + '(' + body + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}

/* ---------- escritura: el sitio guarda el progreso tras aprobar ---------- */
function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput('{"ok":false}').setMimeType(ContentService.MimeType.JSON);
  }

  var email = String(data.email || '').trim().toLowerCase();
  var progress = data.progress || {};
  if (!email) {
    return ContentService.createTextOutput('{"ok":false}').setMimeType(ContentService.MimeType.JSON);
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var previous = readProgress_(email) || {};
    writeProgress_(email, progress);
    logChanges_(email, previous, progress);
  } finally {
    lock.releaseLock();
  }

  return ContentService.createTextOutput('{"ok":true}').setMimeType(ContentService.MimeType.JSON);
}

/* ---------- helpers ---------- */
function sheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
  }
  return sh;
}

function readProgress_(email) {
  var sh = sheet_(SHEET_STATE, ['email', 'progreso', 'actualizado']);
  var values = sh.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]).toLowerCase() === email) {
      try { return JSON.parse(values[i][1]); } catch (err) { return null; }
    }
  }
  return null;
}

function writeProgress_(email, progress) {
  var sh = sheet_(SHEET_STATE, ['email', 'progreso', 'actualizado']);
  var values = sh.getDataRange().getValues();
  var row = [email, JSON.stringify(progress), new Date()];
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]).toLowerCase() === email) {
      sh.getRange(i + 1, 1, 1, 3).setValues([row]);
      return;
    }
  }
  sh.appendRow(row);
}

/* solo registra en el log lo que cambió: un módulo recién aprobado o un puntaje que subió */
function logChanges_(email, previous, current) {
  var sh = sheet_(SHEET_LOG, ['fecha', 'email', 'modulo', 'aprobado', 'puntaje']);
  var now = new Date();
  for (var id in current) {
    var before = previous[id] || {};
    var after = current[id] || {};
    var newlyPassed = after.passed === true && before.passed !== true;
    var betterScore = (after.score || 0) > (before.score || 0);
    if (newlyPassed || betterScore) {
      sh.appendRow([now, email, id, after.passed === true ? 'sí' : 'no', after.score || '']);
    }
  }
}
