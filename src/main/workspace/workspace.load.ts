import { BrowserWindow, dialog } from "electron";
import * as fs from "fs";
import { PreloadChannels } from "../../data/preload.channels";

export const workspaceLoad = (browserWindow: BrowserWindow) => {

    const configFilePath = dialog.showOpenDialogSync({properties: ["openFile"],
        filters: [
            {
                name: "Config File",
                extensions: ["json"]
            }
        ]
    })[0]

    fs.readFile(configFilePath, (err: any, data: any)=>{
        if(err) {
            console.log(err)
        }
        console.log("Loaded file: " + configFilePath)
        const configFile = JSON.parse(data)
        browserWindow.webContents.send(PreloadChannels.workspaceHandleLoad, configFile)
    })
}