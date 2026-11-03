const { app, BrowserWindow, shell, ipcMain, session } = require('electron');
const path = require('path');

// Certains flux exigent un User-Agent / Referer précis (lus dans la liste). On les applique aux requêtes vers le serveur de la chaîne en cours.
// shortcut: seul l'hôte de la playlist est concerné; si les segments vidéo viennent d'un autre hôte, ils partent sans ces en-têtes.
let rule = null;
ipcMain.on('headers', (_, url, ua, ref) => { try { rule = (ua || ref) ? { host: new URL(url).host, ua, ref } : null; } catch { rule = null; } });

app.whenReady().then(() => {
  session.defaultSession.webRequest.onBeforeSendHeaders({ urls: ['http://*/*', 'https://*/*'] }, (d, cb) => {
    const h = d.requestHeaders;
    try { if (rule && new URL(d.url).host === rule.host) { if (rule.ua) h['User-Agent'] = rule.ua; if (rule.ref) h['Referer'] = rule.ref; } } catch {}
    cb({ requestHeaders: h });
  });
  const w = new BrowserWindow({
    width: 1280, height: 800, backgroundColor: '#0d0b09',
    // webSecurity off: sans lui, le lecteur est bloqué par le CORS de nombreux flux. La page n'ouvre que le fichier local.
    webPreferences: { preload: path.join(__dirname, 'preload.js'), webSecurity: false, autoplayPolicy: 'no-user-gesture-required' },
  });
  // les liens (GitHub) s'ouvrent dans le navigateur, pas dans une fenêtre de l'app
  w.webContents.setWindowOpenHandler(({ url }) => { if (/^https:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  w.loadFile('index.html');
});
app.on('window-all-closed', () => app.quit());
