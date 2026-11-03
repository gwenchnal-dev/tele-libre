#!/bin/bash
# Installe Télé Libre dans Applications. Un fichier téléchargé par curl n'est pas marqué "venant d'Internet",
# donc macOS ne bloque pas l'application (qui n'est pas signée par Apple).
set -euo pipefail
DEST="${DEST:-/Applications}"
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
echo "Téléchargement de Télé Libre (environ 220 Mo)…"
curl -fL --progress-bar -o "$TMP/t.zip" https://github.com/gwenchnal-dev/tele-libre/releases/latest/download/TeleLibre-Mac.zip
rm -rf "$DEST/TeleLibre.app"
ditto -x -k "$TMP/t.zip" "$DEST"
xattr -dr com.apple.quarantine "$DEST/TeleLibre.app" 2>/dev/null || true
echo "Installé dans $DEST. Lancement…"
open "$DEST/TeleLibre.app"
