/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from "electron"
import { PreloadChannels } from "../data/preload.channels"

const api = {
    openFile: () => {
        ipcRenderer.send("open-file")
    },
    handleCounter: (callback: any) =>
        ipcRenderer.on("update-counter", callback),
    click: () => {
        ipcRenderer.send("click")
    },

    loadFilters: () => {
        ipcRenderer.send("loadFilters")
    },

    workspace: {
        create: () => ipcRenderer.send(PreloadChannels.workspaceCreate),
        load: () => ipcRenderer.send(PreloadChannels.workspaceLoad),
        handleLoad: (callback: any) =>
            ipcRenderer.on(PreloadChannels.workspaceHandleLoad, callback),
    },
} as const

contextBridge.exposeInMainWorld("api", api)

export type Api = typeof api
