#!/usr/bin/env python3
"""
Regenera assets/tutors.js a partir de la lista de tutores en seguimiento.

Uso:
    python3 tools/generate_tutors.py tutors.csv > assets/tutors.js

El CSV necesita una fila de encabezado con estas dos columnas:

    email      -> el correo con el que el tutor entra
    metrica    -> una o varias métricas separadas por ; (punto y coma)

Valores aceptados en la columna metrica (no importan mayúsculas ni tildes):

    attendance   asistencia
    retentions   retencion   retention
    cwhw         cw&hw       cw   hw
    qa           evaluacion

Ejemplo de CSV:

    email,metrica
    ana.perez@kodland.team,attendance
    luis.gomez@kodland.team,attendance;qa
    c.bermudez@kodland.team,attendance;retentions;cwhw;qa

Usa punto y coma para varias métricas, nunca coma: la coma es el separador
de columnas del CSV y partiría la fila en dos.

Los correos se guardan como hash djb2 en base 16, para que la lista de
direcciones no se pueda copiar de la página publicada. Las métricas se
guardan como bitmask:

    1 = Attendance   2 = Retentions   4 = CW&HW   8 = QA

Así que 5 = Attendance + CW&HW, y 15 = las cuatro.
"""
import csv, sys, json, unicodedata

BITS = {
    "attendance": 1, "asistencia": 1, "blue": 1, "blueattendance": 1,
    "retentions": 2, "retention": 2, "retencion": 2, "retenciones": 2,
    "cwhw": 4, "cw": 4, "hw": 4, "cwyhw": 4, "hwcw": 4,
    "qa": 8, "evaluacion": 8, "evaluationhabit": 8, "evaluation": 8,
}


def norm(s):
    """minúsculas, sin tildes y sin separadores, para comparar sin sorpresas"""
    s = unicodedata.normalize("NFKD", s or "")
    s = "".join(c for c in s if not unicodedata.combining(c))
    return "".join(c for c in s.lower() if c.isalnum())


def h(s):
    x = 5381
    for ch in s:
        x = ((x << 5) + x + ord(ch)) & 0xFFFFFFFF
    return x


def pick(row, *names):
    """encuentra una columna sin importar cómo esté escrito el encabezado"""
    for k, v in row.items():
        if norm(k) in {norm(n) for n in names}:
            return v
    return ""


def main(path):
    out, skipped = {}, []
    with open(path, newline="", encoding="utf-8-sig") as f:
        for i, row in enumerate(csv.DictReader(f), start=2):
            email = (pick(row, "email", "e-mail", "correo") or "").strip().lower()
            if "@" not in email:
                continue
            mask = 0
            raw = pick(row, "metrica", "métrica", "metric", "metricas", "métricas")
            for token in str(raw).replace(",", ";").split(";"):
                bit = BITS.get(norm(token))
                if bit:
                    mask |= bit
                elif norm(token):
                    skipped.append((i, email, token.strip()))
            if mask:
                out[format(h(email), "x")] = mask
            else:
                skipped.append((i, email, "sin métrica válida"))

    for line, email, what in skipped:
        sys.stderr.write("  aviso · fila %d · %s · no reconocido: %s\n" % (line, email, what))

    sys.stdout.write("// GENERADO por tools/generate_tutors.py — no editar a mano.\n")
    sys.stdout.write("// %d tutores. Bitmask: 1=Attendance, 2=Retentions, 4=CW&HW, 8=QA\n" % len(out))
    sys.stdout.write("window.TUTORS=" + json.dumps(out, separators=(",", ":")) + ";\n")
    sys.stderr.write("\n  %d tutores escritos.\n" % len(out))


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("Uso: python3 tools/generate_tutors.py tutors.csv > assets/tutors.js")
    main(sys.argv[1])
