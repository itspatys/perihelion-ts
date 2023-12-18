import { BrowserWindow } from "electron";
import fs from "fs/promises";
import path from "path";



import { StoreValues, store } from "../store";


export interface NodeProcessArgs {
    id: string // name of output file
    inputIds?: string[]
    params: object
    name: string
}

const getSourceFileExtension = async (nodeId: string) => {
    const workspacePath = store.get(StoreValues.workspacePath)
    const dir = await fs.readdir(workspacePath)
    const files = dir.filter((file) => file.startsWith(nodeId))
    return files[0].split(".").pop()
}

export const nodeProcess = async (
    args: NodeProcessArgs,
    browserWindow: BrowserWindow,
) => {
    const workspacePath = store.get(StoreValues.workspacePath)
    const inputPaths = await Promise.all(
        args.inputIds?.map(async (id) =>
            path.join(
                workspacePath,
                id + `.${await getSourceFileExtension(id)}`,
            ),
        ),
    )
    const outputPath = path.join(
        workspacePath,
        args.id + `.${await getSourceFileExtension(args.inputIds[0])}`,
    )

    const initFunctionParameters = {
        inputFilePath: inputPaths,
        outputFilePath: [outputPath],
        ...args.params,
    }

    console.log("Paths:", inputPaths, outputPath)

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