'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import db from '../datastore'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true // 关闭security警告
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

let setting
setting = db.get('setting.window').value() || {width: 600, height: 450}
let {width, height, left = 0, top = 0} = setting

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    nodeIntegration: false,
    useContentSize: true,
    width: width,
    height: height,
    x: left,
    y: top,
    frame: false
  })
  mainWindow.loadURL(winURL)
  mainWindow.setMinimumSize(590, 450)
  mainWindow.on('close', () => {
    let [width, height] = mainWindow.getSize()
    let [left, top] = mainWindow.getPosition()
    db.set('setting.window', {
      width: width,
      height: height,
      left: left,
      top: top
    }).write()
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('closeMainWindow', () => {
  mainWindow.close()
})

ipcMain.on('maxSizeWindow', () => {
  mainWindow.setSize(900, 600)
  mainWindow.center()
})

ipcMain.on('minSizeWindow', () => {
  mainWindow.setSize(590, 450)
  mainWindow.center()
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
