import { BrowserWindow } from "electron"
import fs from "fs/promises"
import path from "path"

import { StoreValues, store } from "../store"

export interface NodeProcessArgs {
    id: string // name of output file
    inputIds?: string[]
    params: object
    name: string
}

export const nodeProcess = async (
    args: NodeProcessArgs,
    browserWindow: BrowserWindow,
) => {
    const workspacePath = store.get(StoreValues.workspacePath)
    const inputPaths = args.inputIds?.map((id) =>
        path.join(workspacePath, id + ".png"),
    )
    const outputPath = path.join(workspacePath, args.id + ".png")

    const initFunctionParameters = {
        inputFilePath: inputPaths,
        outputFilePath: [outputPath],
        ...args.params,
    }

    const files = await fs.readdir(path.join(process.cwd(), ".vite/build"))
    for (const file of files) {
        if (file.endsWith(".node.js") && file.startsWith(args.name)) {
            const module = await require(
                path.join(process.cwd(), ".vite/build", file),
            )
            console.log(`Initializing <${args.name.toUpperCase()}> node`)
            // we need to pass the browserWindows as we want to show the file dialog on input file
            return module.init(initFunctionParameters, browserWindow)
        }
    }
}
