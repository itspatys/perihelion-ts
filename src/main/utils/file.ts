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

export const showOpenNodeFileDialog = async (browserWindow: BrowserWindow) => {
    const result = await dialog.showOpenDialog(browserWindow, {
        properties: ["openFile"],
        filters: [
            {
                name: "Nodes",
                extensions: ["ts"],
            },
        ],
    })

    if (result.canceled) {
        return
    }

    const [filePath] = result.filePaths

    return filePath
}

export const showCreateFileDialog = async (filePath: string) => {
    const saveDialogOptions = {
        title: 'Save File',
        defaultPath: filePath
    };
    
    const savePath = await dialog.showSaveDialog(saveDialogOptions);

    if (savePath) {
        console.log('Selected path to save file:', savePath);
    } else {
        console.log('User canceled save dialog.');
    }
    return savePath.filePath;
}