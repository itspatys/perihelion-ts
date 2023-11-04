import { BrowserWindow, dialog } from "electron";
import * as fs from "fs";
import { PreloadChannels } from "../../data/preload.channels";
import { StoreValues, store } from "../store";
import { CONFIG_FILE_NAME } from "../../data/consts";

export const workspaceLoad = (browserWindow: BrowserWindow) => {

    const configFilePath = dialog.showOpenDialogSync({properties: ["openFile"],
        filters: [
            {
                name: "Config File",
                extensions: ["json"]
            }
        ]
    })[0]

    store.set(StoreValues.workspacePath, configFilePath.split(CONFIG_FILE_NAME)[0])

    fs.readFile(configFilePath, (err: any, data: any)=>{
        if(err) {
            console.log(err)
        }
        console.log("Loaded file: " + configFilePath)
        const configFile = JSON.parse(data)
        browserWindow.webContents.send(PreloadChannels.workspaceHandleLoad, configFile)
    })
}