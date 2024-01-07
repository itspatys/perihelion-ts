/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from "electron"

import { ConfigurationFile } from "../data/configuration-file.interface"
import { PreloadChannels } from "../data/preload.channels"
import { NodeProcessArgs } from "../main/nodes/node.process"

const api = {
    // handleLoadNodes: (callback: any) =>
    //     ipcRenderer.on(PreloadChannels.nodesHandleLoad, callback),

    nodes: {
        /**
         *
         * @returns JSON string of available nodes
         */
        load: async (): Promise<string> =>
            ipcRenderer.invoke(PreloadChannels.nodesLoad),
        /**
         * Invokes file dialog to select image
         * @returns file name
         */
        loadImage: async (inputName: string): Promise<string> =>
            ipcRenderer.invoke(PreloadChannels.nodesLoadImage, inputName),
        /**
         *
         * @returns Promise<boolean> whether the process was successful
         */
        process: async (args: NodeProcessArgs): Promise<boolean> =>
            ipcRenderer.invoke(PreloadChannels.nodesProcess, args),
        /**
         *
         * @param file file name
         * @returns base64 encoded image
         */
        getImage: async (file: string): Promise<string> => {
            return ipcRenderer.invoke(PreloadChannels.getImage, file)
        },

        exportImage: async (id: string): Promise<string> => {
            //todo: implement using nodeId, export this image to provided path, or to file dialog
            return ipcRenderer.invoke(PreloadChannels.nodesExportImage, id)
        },

        save: async (code: string, name: string) => {
            //todo: implement, save node from text as file
            return ipcRenderer.invoke(PreloadChannels.nodesSave, code, name)
        },

        saveFromFile: async () => {
            //todo: implement save node from file as file
            return ipcRenderer.invoke(PreloadChannels.nodesSaveFromFile)
        },

        saveBulk: async () => {
            //todo implement save nodes from archive
            return ipcRenderer.invoke(PreloadChannels.nodesSaveBulk)
        }
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
