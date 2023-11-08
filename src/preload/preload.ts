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

    handleLoadNodes: (callback: any) =>
        ipcRenderer.on(PreloadChannels.nodesHandleLoad, callback),

    operations: {
        load: (): Promise<string> =>
            ipcRenderer.invoke(PreloadChannels.nodesLoad),
    },

    workspace: {
        create: () => ipcRenderer.send(PreloadChannels.workspaceCreate),
        open: (): Promise<string> =>
            ipcRenderer.invoke(PreloadChannels.workspaceOpen),
        load: (): Promise<string> =>
            ipcRenderer.invoke(PreloadChannels.workspaceLoad),
        save: (args: ConfigurationFile) =>
            ipcRenderer.send(PreloadChannels.workspaceSave, args),
    },
} as const

contextBridge.exposeInMainWorld("api", api)

export type Api = typeof api
