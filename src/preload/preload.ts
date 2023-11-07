/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from "electron"

import { ConfigurationFile } from "../data/configuration-file.interface"
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

    loadNodes: () => ipcRenderer.send(PreloadChannels.nodesLoad),
    handleLoadNodes: (callback: any) =>
        ipcRenderer.on(PreloadChannels.nodesHandleLoad, callback),

    workspace: {
        create: () => ipcRenderer.send(PreloadChannels.workspaceCreate),
        load: (): Promise<string> =>
            ipcRenderer.invoke(PreloadChannels.workspaceLoad),
        handleLoad: (callback: any) =>
            ipcRenderer.invoke(PreloadChannels.workspaceHandleLoad, callback),
        save: (args: ConfigurationFile) =>
            ipcRenderer.send(PreloadChannels.workspaceSave, args),
    },
} as const

contextBridge.exposeInMainWorld("api", api)

export type Api = typeof api