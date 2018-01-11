const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 880, height: 600})

  mainWindow.loadURL('http://localhost:9999/index.html');
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'dist/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
