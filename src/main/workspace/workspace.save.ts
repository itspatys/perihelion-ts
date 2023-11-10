import fs from "fs"

import { ConfigurationFile } from "../../data/configuration-file.interface"
import { CONFIG_FILE_NAME } from "../../data/consts"
import { StoreValues, store } from "../store"

export const workspaceSave = (args: ConfigurationFile) => {
    //const configFilePath = store.get(StoreValues.workspacePath)
    args.workspacePath = store.get(StoreValues.workspacePath)
    // console.log("workspaceSave", args)

    fs.writeFile(
        args.workspacePath + CONFIG_FILE_NAME,
        JSON.stringify(args),
        (err: any) => {
            if (err) {
                console.error(err)
                return
            }
            // console.log("Workspace saved!")
        },
    )
}
