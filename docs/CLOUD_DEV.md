# Cloud-Entwicklung (Cursor) — Browser-Zugriff

**Wichtig:** Die App läuft **nur auf der Cursor Cloud VM**, nicht auf deinem PC.  
`localhost:3000` im Browser = Port-Forwarding von Cursor Desktop zur Cloud.

## Wenn `ERR_CONNECTION_REFUSED`

### 1. Server auf der Cloud (Agent prüft das)

Auf der VM muss laufen:

```bash
next dev -H 0.0.0.0 -p 3000
```

Status: Terminal **dev-server** in der Agent-Session → `✓ Ready`.

### 2. Port in Cursor Desktop manuell forwarden (häufigste Lösung)

Bekannter Bug: Ports aus `environment.json` → `terminals` werden **nicht immer** automatisch weitergeleitet.

1. **Cursor Desktop** öffnen (nicht nur cursor.com im Browser)
2. **Agents**-Fenster → diesen Agent öffnen / aktivieren
3. Oben rechts: **Stecker-Icon** (Ports) klicken
4. **Forward a Port** → `3000` eingeben → Enter
5. Status muss **Forwarded** sein
6. Dann: http://localhost:3000/coiffeur-blum

### 3. Auto-Forward prüfen

In den Ports-Einstellungen: **Auto Forward Ports** = an.

### 4. Lokaler Konflikt auf deinem PC

Falls auf deinem Mac/PC schon etwas auf Port 3000 läuft, zeigt das Ports-Panel ggf. einen **anderen** lokalen Port (z. B. 3001). Die **angezeigte URL** im Ports-Panel verwenden.

### 5. Agent neu starten

Nach Änderung an `.cursor/environment.json`:

- Neuen Cloud-Agent-Lauf auf Branch `cursor/prototype-design-2514` starten
- Oder Snapshot/Environment im Cursor-Dashboard neu aufsetzen

## Demo-URLs (nach erfolgreichem Forward)

| Studio | URL |
|---|---|
| Coiffeur Blum | http://localhost:3000/coiffeur-blum |
| Buchung | http://localhost:3000/coiffeur-blum/buchung |

Admin: http://localhost:3000/admin/login — `admin@coiffeur-blum.ch` / `demo1234`

## Technisch

```
Dein Browser → localhost:3000 → Cursor Desktop Tunnel → Cloud VM :3000 → Next.js
```

Ohne aktiven Tunnel in Cursor Desktop gibt es **keine** Verbindung — auch wenn der Server auf der Cloud läuft.
