/* eslint-disable @typescript-eslint/no-var-requires */
import { config } from "dotenv"
import { BrowserWindow, app, ipcMain, screen, session } from "electron"
import path from "path"

import { PreloadChannels } from "../data/preload.channels"
import { nodesLoader } from "./nodes/nodes.loader"
import { workflowRunner } from "./workflow/workflow-runner"
import { workspaceCreate } from "./workspace/workspace.create"
import { workspaceLoad } from "./workspace/workspace.load"
import { workspaceOpen } from "./workspace/workspace.open"
import { workspaceSave } from "./workspace/workspace.save"

config()
if (require("electron-squirrel-startup")) {
    app.quit()
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 1280,
        minHeight: 720,
        titleBarStyle: "hidden",
        titleBarOverlay:
            process.platform === "win32"
                ? {
                      color: "transparent",
                      symbolColor: "white",
                  }
                : true,
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

    if (process.env.DEVTOOLS === "true" ? true : false) {
        if (
            !["right", "bottom", "undocked", "detach"].includes(
                process.env.DEVTOOLS_POSITION,
            )
        )
            return
        mainWindow.webContents.openDevTools({
            mode: process.env.DEVTOOLS_POSITION as
                | "right"
                | "bottom"
                | "undocked"
                | "detach",
        })
    }

    return mainWindow
}

app.on("ready", async () => {
    createWindow()
})

app.whenReady().then(async () => {
    const reactDevToolsPath = process.env.REACT_DEVTOOLS_PATH as string
    const reduxDevToolsPath = process.env.REDUX_DEVTOOLS_PATH as string
    console.log("Redux Devtools:", reduxDevToolsPath)
    console.log("React Devtools:", reactDevToolsPath)
    if (reactDevToolsPath) {
        await session.defaultSession.loadExtension(reactDevToolsPath)
    }
    if (reduxDevToolsPath) {
        await session.defaultSession.loadExtension(reduxDevToolsPath)
    }
})

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

ipcMain.on("click", async (event) => {
    const browserWindow = BrowserWindow.fromWebContents(event.sender)
    if (!browserWindow) return

    workflowRunner(browserWindow)
})

ipcMain.handle(PreloadChannels.nodesLoad, async (event) => {
    const browserWindow = BrowserWindow.fromWebContents(event.sender)
    if (!browserWindow) return
    return nodesLoader(browserWindow)
})

ipcMain.on(PreloadChannels.workspaceCreate, async () => {
    workspaceCreate()
})

ipcMain.handle(PreloadChannels.workspaceOpen, async (event) => {
    const browserWindow = BrowserWindow.fromWebContents(event.sender)
    if (!browserWindow) return
    return await workspaceOpen(browserWindow)
})

ipcMain.handle(PreloadChannels.workspaceLoad, async (event) => {
    return await workspaceLoad()
})

ipcMain.on(PreloadChannels.workspaceSave, async (event, args) => {
    workspaceSave(args)
})
