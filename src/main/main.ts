import { app, BrowserWindow, ipcMain, Menu } from "electron"
import path from "path"
import { showOpenFileDialog } from "./file"
import { dilation } from "./filters"

type File = {
    filePath?: string
}

let currentFile: File = {}

if (require("electron-squirrel-startup")) {
    app.quit()
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: "hidden",
        titleBarOverlay: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    })

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    } else {
        mainWindow.loadFile(
            path.join(
                __dirname,
                `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`,
            ),
        )
    }

    mainWindow.webContents.openDevTools({ mode: "detach" })

    return mainWindow
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on("open-file", async (event) => {
    const browserWindow = BrowserWindow.fromWebContents(event.sender)
    if (!browserWindow) return
    currentFile.filePath = await showOpenFileDialog(browserWindow)
    console.log(currentFile)
})

ipcMain.handle("dilation", (event) => {
    const browserWindow = BrowserWindow.fromWebContents(event.sender)
    if (!browserWindow) return
    if (!currentFile.filePath) return
    const result = dilation(currentFile.filePath)
    return result
})

ipcMain.on("click", async (event) => {
    const browserWindow = BrowserWindow.fromWebContents(event.sender)
    if (!browserWindow) return

    setInterval(() => {
        browserWindow.webContents.send("update-counter", Math.random())
    }, 1000)
})
