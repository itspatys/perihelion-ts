/* eslint-disable @typescript-eslint/no-var-requires */
import { config } from "dotenv"
import { BrowserWindow, app, ipcMain, screen, session } from "electron"
import Jimp from "jimp"
import path from "path"
import fs from "fs/promises";


import { PreloadChannels } from "../data/preload.channels"
import { NodeProcessArgs, nodeProcess } from "./nodes/node.process"
import { nodesLoader } from "./nodes/nodes.loader"
import { StoreValues, store } from "./store"
import { showCreateFileDialog, showOpenFileDialog } from "./utils/file"
import { loadImg, saveImg } from "./utils/img.util"
import { workspaceCreate } from "./workspace/workspace.create"
import { workspaceLoad } from "./workspace/workspace.load"
import { workspaceOpen } from "./workspace/workspace.open"
import { workspaceSave } from "./workspace/workspace.save"
import { transpile } from "./nodes/node.save";

config()
if (require("electron-squirrel-startup")) {
    app.quit()
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 720,
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
        backgroundColor: "black",
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

/*
  _   _  ____  _____  ______  _____ 
 | \ | |/ __ \|  __ \|  ____|/ ____|
 |  \| | |  | | |  | | |__  | (___  
 | . ` | |  | | |  | |  __|  \___ \ 
 | |\  | |__| | |__| | |____ ____) |
 |_| \_|\____/|_____/|______|_____/ 
*/

ipcMain.handle(PreloadChannels.nodesLoad, async () => {
    return nodesLoader()
})

ipcMain.handle(
    PreloadChannels.nodesProcess,
    async (event, args: NodeProcessArgs) => {
        const browserWindow = BrowserWindow.fromWebContents(event.sender)
        if (!browserWindow) return
        return nodeProcess(args, browserWindow)
    },
)

ipcMain.handle(PreloadChannels.nodesLoadImage, async (event, inputName) => {
    const browserWindow = BrowserWindow.fromWebContents(event.sender)
    if (!browserWindow) return
    const img = await showOpenFileDialog(browserWindow)
    if (!img) {
        return
    }
    const mat = await loadImg(img)
    const workspacePath = store.get(StoreValues.workspacePath)
    const fileName = inputName + '.' + img.split(".").pop()
    const imgPath = path.join(workspacePath, fileName)
    saveImg(mat, imgPath)
    return fileName
})

ipcMain.handle(PreloadChannels.getImage, async (_, file: string) => {
    const workspacePath = store.get(StoreValues.workspacePath)
    const imgPath = path.join(workspacePath, file)
    const img = await Jimp.read(imgPath)
    const mime = await img.getBase64Async(Jimp.AUTO)
    return mime
})


ipcMain.handle(PreloadChannels.nodesExportImage, async (_, id: string) => {
    const workspacePath = store.get(StoreValues.workspacePath)
    const dir = await fs.readdir(workspacePath)
    const files = dir.filter((file) => file.startsWith(id))
    const pathToSave = await showCreateFileDialog(files[0])
    if (!pathToSave) {
        return
    }
    const imgPath = path.join(workspacePath, files[0])
    await fs.copyFile(imgPath, pathToSave)
})

ipcMain.handle(PreloadChannels.nodesSave, async (_, code: string, name: string) => {
    await transpile(code, name)
})
/*
 __          ______  _____  _  __ _____ _____        _____ ______ 
 \ \        / / __ \|  __ \| |/ // ____|  __ \ /\   / ____|  ____|
  \ \  /\  / / |  | | |__) | ' /| (___ | |__) /  \ | |    | |__   
   \ \/  \/ /| |  | |  _  /|  <  \___ \|  ___/ /\ \| |    |  __|  
    \  /\  / | |__| | | \ \| . \ ____) | |  / ____ \ |____| |____ 
     \/  \/   \____/|_|  \_\_|\_\_____/|_| /_/    \_\_____|______|
*/
ipcMain.on(PreloadChannels.workspaceCreate, async () => {
    workspaceCreate()
})

ipcMain.handle(PreloadChannels.workspaceOpen, async (event) => {
    const browserWindow = BrowserWindow.fromWebContents(event.sender)
    if (!browserWindow) return
    return await workspaceOpen(browserWindow)
})

ipcMain.handle(PreloadChannels.workspaceLoad, async () => {
    return await workspaceLoad()
})

ipcMain.on(PreloadChannels.workspaceSave, async (event, args) => {
    workspaceSave(args)
})

// while adding new section add https://patorjk.com/software/taag/#p=display&f=Big&t=WORKSPACE
