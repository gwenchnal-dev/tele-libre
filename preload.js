const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('tele', { setHeaders: (url, ua, ref) => ipcRenderer.send('headers', url, ua, ref) });
