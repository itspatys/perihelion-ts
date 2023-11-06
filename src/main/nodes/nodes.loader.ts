import { BrowserWindow } from "electron"
import fs from "fs"
import path from "path"
import { PreloadChannels } from "../../data/preload.channels"

export async function nodesLoader(browserWindow: BrowserWindow) {
    fs.readdir(
        path.join(process.cwd(), ".vite/build"),
        async (err, files) => {
            if (err) {
                console.log(err)
                return
            }
            const filters = []
            for (const file of files) {
                if (file.endsWith(".node.js")) {
                    const module = await require(
                        path.join(process.cwd(), ".vite/build", file),
                    )
                    filters.push(module)
                }
            }
            fs.writeFileSync("nodes.json", JSON.stringify(filters))
            return filters
        },
    )

    const nodesJson = fs.readFileSync("nodes.json", "utf8")
    browserWindow.webContents.send(PreloadChannels.nodesHandleLoad, nodesJson)
    return nodesJson
}

