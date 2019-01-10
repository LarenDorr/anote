'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

import db from '../localdb'
import log from 'electron-log'
log.transports.console.level = 'warn'
log.transports.file.level = 'info'
log.transports.file.file = app.getPath('userData') + '/log.txt'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true // 关闭security警告
let mainWindow // 主窗口
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  let {width, height} = db.getWindowData()
  mainWindow = new BrowserWindow({
    nodeIntegration: false,
    useContentSize: true,
    width: width,
    height: height,
    frame: false
  })

  let {x, y} = db.getWindowData()
  if (x === null && y === null) { // 第一次运行 居中
    mainWindow.center()
    db.setWindowData(mainWindow.getBounds())
  } else { // 非第一次 移动到记录位置
    if (db.getWindowIsMax()) {
      mainWindow.maximize()
    } else {
      mainWindow.setBounds(db.getWindowData())
    }
  }
  mainWindow.loadURL(winURL)
  mainWindow.setMinimumSize(590, 450)
  mainWindow.on('close', () => {
    if (!mainWindow.isMaximized()) {
      db.setWindowData(mainWindow.getBounds())
    }
  })
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-isMax', true)
  })
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-isMax', false)
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
  db.setWindowData(mainWindow.getBounds())
  mainWindow.maximize()
  db.setWindowIsMax(true)
})

ipcMain.on('minSizeWindow', () => {
  let recordWinData = db.getWindowData()
  mainWindow.setBounds(recordWinData)
  db.setWindowIsMax(false)
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
