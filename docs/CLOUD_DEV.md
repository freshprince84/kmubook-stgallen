# Cloud-Entwicklung (Cursor) — Browser-Zugriff

**Wichtig:** Die App läuft **nur auf der Cursor Cloud VM**, nicht auf deinem PC.

## Zwei Wege zum Browser

| Weg | URL | Wann |
|---|---|---|
| **A) Preview-Tunnel (empfohlen)** | Siehe `.preview-url.txt` oder Terminal `preview-tunnel` | Ports-Panel leer / `ERR_CONNECTION_REFUSED` |
| **B) Port-Forwarding** | `http://localhost:3000/...` | Nur wenn Cursor Desktop Port 3000 forwarded |

---

## A) Preview-Tunnel (Agent richtet ein)

Wenn `localhost:3000` **ERR_CONNECTION_REFUSED** zeigt, liegt das fast immer am **fehlenden Cursor-Tunnel** — nicht am Server.

Der Agent startet `cloudflared` auf der Cloud-VM → öffentliche HTTPS-URL:

**Aktuell (Beispiel):** URL in `.preview-url.txt` im Repo-Root oder im Terminal **preview-tunnel** nach Zeile `https://….trycloudflare.com`.

| Studio | Pfad |
|---|---|
| Coiffeur Blum | `/coiffeur-blum` |
| Buchung | `/coiffeur-blum/buchung` |
| Admin | `/admin/login` |

Diese URL im **normalen Browser** öffnen (Chrome/Safari) — **kein** Port-Forwarding nötig.

---

## B) localhost:3000 (Cursor Port-Forwarding)

```
Dein Browser → localhost:3000 → Cursor Desktop Tunnel → Cloud VM :3000
```

**Der Agent kann diesen Tunnel nicht selbst aktivieren** — das macht nur Cursor Desktop (Ports-Panel / Auto-Forward).

Wenn das Ports-Panel **leer** ist: bekannter Cursor-Bug bei Cloud Agents → **Tunnel (A) nutzen**.

---

## Diagnose: „Browser error to investigate“

| Check | Auf der VM | Bedeutung |
|---|---|---|
| `curl http://127.0.0.1:3000` | 200 | Server OK |
| `localhost:3000` im Desktop-Browser | REFUSED | Tunnel fehlt → Preview-URL nutzen |

---

## Nach Agent-Neustart

1. Terminal `dev-server` → `✓ Ready`
2. Terminal `preview-tunnel` → neue `trycloudflare.com`-URL abwarten
3. URL + `/coiffeur-blum` im Browser öffnen

