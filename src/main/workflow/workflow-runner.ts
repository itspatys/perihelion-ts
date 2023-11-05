import { BrowserWindow } from "electron"

export async function workflowRunner(browserWindow: BrowserWindow) {
    for (let i = 1; i <= 10; i++) {
        const interval = 1000

        // Use a Promise to delay execution
        await new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Text after ${i} seconds.`)
                browserWindow.webContents.send(
                    "update-counter",
                    `Text after ${i} seconds.`,
                )
                resolve(0)
            }, interval)
        })
    }
    return "All intervals completed!"
}
