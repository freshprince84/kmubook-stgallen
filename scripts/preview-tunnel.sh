#!/bin/bash
# Öffentlicher Preview-Tunnel (Workaround wenn Cursor Port-Forwarding nicht greift)
CF=/tmp/cloudflared
if [ ! -x "$CF" ]; then
  curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o "$CF"
  chmod +x "$CF"
fi
LOG=/workspace/.preview-tunnel.log
URL_FILE=/workspace/.preview-url.txt
rm -f "$LOG" "$URL_FILE"
"$CF" tunnel --url http://127.0.0.1:3000 --no-autoupdate 2>&1 | tee "$LOG" | while IFS= read -r line; do
  echo "$line"
  url=$(echo "$line" | grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' | head -1)
  if [ -n "$url" ]; then
    echo "$url" > "$URL_FILE"
    echo "PREVIEW_URL=$url" >> /workspace/.env.preview
  fi
done
