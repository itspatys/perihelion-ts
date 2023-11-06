/* eslint-disable @typescript-eslint/no-var-requires */
import { config } from "dotenv"
import { BrowserWindow, app, ipcMain, screen, session } from "electron"
import fs from "fs"
import path from "path"

import { PreloadChannels } from "../data/preload.channels"
import { workflowRunner } from "./workflow/workflow-runner"
import { workspaceCreate } from "./workspace/workspace.create"
import { workspaceLoad } from "./workspace/workspace.load"

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
    console.log("Devtools:", reactDevToolsPath)
    if (!reactDevToolsPath) return
    session.defaultSession.loadExtension(reactDevToolsPath)
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

ipcMain.on("loadFilters", async (event) => {
    const browserWindow = BrowserWindow.fromWebContents(event.sender)
    if (!browserWindow) return
    const filters = fs.readdir(
        path.join(process.cwd(), ".vite/build"),
        async (err, files) => {
            if (err) {
                console.log(err)
                return
            }
            const filters = []
            for (const file of files) {
                if (file.endsWith(".filter.js")) {
                    const module = await require(
                        path.join(process.cwd(), ".vite/build", file),
                    )
                    filters.push(module)
                }
            }
            console.log(filters)
            return filters
        },
    )
    browserWindow.webContents.send("loadFilters", filters)
})

ipcMain.on(PreloadChannels.workspaceCreate, async () => {
    workspaceCreate()
})

ipcMain.handle(PreloadChannels.workspaceLoad, async (event) => {
    const browserWindow = BrowserWindow.fromWebContents(event.sender)
    if (!browserWindow) return

    return workspaceLoad(browserWindow)
})
