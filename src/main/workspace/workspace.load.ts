import { readFile } from "fs/promises"

import { CONFIG_FILE_NAME } from "../../data/consts"
import { StoreValues, store } from "../store"

export const workspaceLoad = async () => {
    const configFilePath =
        store.get(StoreValues.workspacePath) + CONFIG_FILE_NAME

    const configFile = (await readFile(configFilePath)).toString()

    return configFile
}
