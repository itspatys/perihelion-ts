import { contextBridge, ipcRenderer } from "electron"

const api = {
    openFile: () => {
        ipcRenderer.send("open-file")
    },
    dilation: (): Promise<string> => {
        return ipcRenderer.invoke("dilation")
    },
} as const

contextBridge.exposeInMainWorld("api", api)

export type Api = typeof api
