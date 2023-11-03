import { contextBridge } from "electron"

const api = {} as const

contextBridge.exposeInMainWorld("api", api)

export type Api = typeof api
