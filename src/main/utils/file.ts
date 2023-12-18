import { BrowserWindow, dialog } from "electron";


export const showOpenFileDialog = async (browserWindow: BrowserWindow) => {
    const result = await dialog.showOpenDialog(browserWindow, {
        properties: ["openFile"],
        filters: [
            {
                name: "Images",
                extensions: ["png", "jpg", "jpeg", "gif", "tiff", "bmp"],
            },
        ],
    })

    if (result.canceled) {
        return
    }

    const [filePath] = result.filePaths

    return filePath
}