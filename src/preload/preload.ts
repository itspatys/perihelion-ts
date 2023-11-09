/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from "electron"

import { ConfigurationFile } from "../data/configuration-file.interface"
import { PreloadChannels } from "../data/preload.channels"

const api = {
    // handleLoadNodes: (callback: any) =>
    //     ipcRenderer.on(PreloadChannels.nodesHandleLoad, callback),

    operations: {
        /**
         *
         * @returns JSON string of available operations
         */
        load: (): Promise<string> =>
            ipcRenderer.invoke(PreloadChannels.nodesLoad),
    },

    workspace: {
        create: () => ipcRenderer.send(PreloadChannels.workspaceCreate),
        open: (): Promise<string> =>
            ipcRenderer.invoke(PreloadChannels.workspaceOpen),
        /**
         *
         * @returns JSON string of saved workflow from config file
         */
        load: (): Promise<string> =>
            ipcRenderer.invoke(PreloadChannels.workspaceLoad),
        save: (args: ConfigurationFile) =>
            ipcRenderer.send(PreloadChannels.workspaceSave, args),
    },
} as const

contextBridge.exposeInMainWorld("api", api)

export type Api = typeof api
