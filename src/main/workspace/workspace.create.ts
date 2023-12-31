import { dialog } from "electron";
import * as fs from "fs";
import * as path from "path";



import { ConfigurationFile } from "../../data/configuration-file.interface"
import { CONFIG_FILE_NAME, NODE_START } from "../../data/consts"

export const workspaceCreate = () => {
    const workspaceDirectoryPath = dialog.showOpenDialogSync({
        properties: ["openDirectory"],
    })[0]
    const configurationFile: ConfigurationFile = {
        nodes: [NODE_START],
        edges: [],
        workspacePath: workspaceDirectoryPath,
    }

    const configFilePath = path.join(workspaceDirectoryPath, CONFIG_FILE_NAME)
    fs.writeFile(
        configFilePath,
        JSON.stringify(configurationFile),
        (err: NodeJS.ErrnoException | null) => {
            if (err) {
                console.error(err)
                return
            }
            console.log("Created new workspace")
        },
    )
}