import { BrowserWindow, dialog } from "electron"

import { CONFIG_FILE_NAME } from "../../data/consts"
import { StoreValues, store } from "../store"

export const workspaceOpen = async (browserWindow: BrowserWindow) => {
    const result = await dialog.showOpenDialog(browserWindow, {
        properties: ["openFile"],
        filters: [
            {
                name: "Config File",
                extensions: ["json"],
            },
        ],
    })

    if (!result) {
        return
    }

    const workspacePath = result.filePaths[0].split(CONFIG_FILE_NAME)[0]

    store.set(StoreValues.workspacePath, workspacePath)

    return workspacePath
}
