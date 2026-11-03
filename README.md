# Télé Libre

Lecteur de chaînes de télévision gratuites, libre et open source (MIT).
Il affiche la liste publique du projet [iptv-org](https://github.com/iptv-org/iptv) avec recherche, catégories et pays en français, favoris, chaînes récentes, plein écran et fenêtre flottante.

Télé Libre ne diffuse aucun contenu: les flux sont lus depuis leurs diffuseurs d'origine. Beaucoup sont limités à un pays ou hors ligne.

## Utiliser

- **Application Mac**: télécharger `TeleLibre-Mac.zip` dans l'onglet *Releases*, dézipper, glisser **TeleLibre** dans Applications. L'app n'est pas signée par Apple, donc macOS la bloque au premier lancement:
  1. cliquer sur **Terminé** (pas sur « Placer dans la corbeille »);
  2. ouvrir *Réglages Système → Confidentialité et sécurité*, descendre jusqu'à « TeleLibre a été bloqué » et cliquer sur **Ouvrir quand même** (mot de passe du Mac demandé);
  3. ou, dans le Terminal: `xattr -dr com.apple.quarantine /Applications/TeleLibre.app`.
- **Dans un navigateur**: ouvrir `index.html` (certains flux seront bloqués par le navigateur).

## Développer

```bash
npm install
npx electron .      # lancer l'app
npm run build       # fabriquer dist/TeleLibre-Mac.zip (Mac)
```

Le code tient dans `index.html` (interface) et `main.js` (fenêtre Electron).
À chaque version: ajouter une entrée en tête de `CHANGELOG` dans `index.html` et changer `version` dans `package.json`.

## Licences tierces

[hls.js](https://github.com/video-dev/hls.js) (Apache-2.0), inclus sous le nom `hls.min.js`. [Electron](https://www.electronjs.org/) (MIT).
