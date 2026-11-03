const { app, BrowserWindow, shell } = require('electron');

app.whenReady().then(() => {
  const w = new BrowserWindow({
    width: 1280, height: 800, backgroundColor: '#0d0b09',
    // webSecurity off: sans lui, le lecteur est bloqué par le CORS de nombreux flux. La page n'ouvre que le fichier local.
    webPreferences: { webSecurity: false, autoplayPolicy: 'no-user-gesture-required' },
  });
  // les liens (GitHub) s'ouvrent dans le navigateur, pas dans une fenêtre de l'app
  w.webContents.setWindowOpenHandler(({ url }) => { if (/^https:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  w.loadFile('index.html');
});
app.on('window-all-closed', () => app.quit());
