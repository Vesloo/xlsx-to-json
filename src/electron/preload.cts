const { contextBridge, ipcRenderer, electron } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  send: (channel: any, data: any) => {
    ipcRenderer.send(channel, data);
  },
  invoke: (channel: any, data: any) => {
    return ipcRenderer.invoke(channel, data);
  }
});