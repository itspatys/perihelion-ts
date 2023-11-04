import { contextBridge, ipcRenderer } from "electron"

const api = {
    openFile: () => {
        ipcRenderer.send("open-file")
    },
    dilation: (): Promise<string> => {
        return ipcRenderer.invoke("dilation")
    },
    handleCounter: (callback) => ipcRenderer.on("update-counter", callback),
    click: () => {
        ipcRenderer.send("click")
    },
} as const

contextBridge.exposeInMainWorld("api", api)

export type Api = typeof api
