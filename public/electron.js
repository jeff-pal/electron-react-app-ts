require('@electron/remote/main').initialize();
const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');
const isDev = require('electron-is-dev');
const url = require('url');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  })

  const fileUrl = url.pathToFileURL('../build/index.html');
  const appUrl = url.format(fileUrl);
  
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : appUrl
  );
  
  if (isDev) {
    win.webContents.openDevTools();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('browser-window-created', (_, window) => {
  require("@electron/remote/main").enable(window.webContents)
})

// In this file you can include the rest of your app's specific main process code.
// You can also put them in separate files and require them here.