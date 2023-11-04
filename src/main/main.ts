import { app, BrowserWindow, ipcMain, screen } from "electron"
import path from "path"
import { showOpenFileDialog } from "./file"
import { dilation } from "./filters"
import { workflowRunner } from "./workflow-runner"
import { config } from "dotenv"
config()

type File = {
    filePath?: string
}

const currentFile: File = {}

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
    //move window to second screen 
    
    if (process.env.MULTIPLE_SCREENS === "true" ? true : false) {
        const displays = screen.getAllDisplays()
        const externalDisplay = displays.find((display) => {
            return display.bounds.x !== 0 || display.bounds.y !== 0
        })
        if (externalDisplay) {
            mainWindow.setBounds(externalDisplay.bounds)
        }
    }

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

    if(process.env.DEVTOOLS === "true" ? true : false) {
        if (!["right", "bottom", "undocked", "detach"].includes(process.env.DEVTOOLS_POSITION)) return
        mainWindow.webContents.openDevTools({ mode: process.env.DEVTOOLS_POSITION as "right" | "bottom" |"undocked" |"detach" })
    }

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

    workflowRunner(browserWindow)
})
