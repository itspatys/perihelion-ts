import { BrowserWindow } from "electron"

import {
    Node,
    NodeBaseFunctionParameters,
    NodeParameterTypesEnum,
    NodeTypesEnum,
} from "../../../data/node.interface"
import { showOpenFileDialog } from "../../utils/file"
import { loadImg, saveImg } from "../../utils/img.util"

const input = async (args: InputArgs) => {
    const mat = await loadImg(await showOpenFileDialog(args.browserWindow))

    saveImg(mat, args.outputFilePath[0])
}

interface InputArgs extends NodeBaseFunctionParameters {
    browserWindow: BrowserWindow
}
const node: Node<InputArgs> = {
    init: (args: InputArgs) => input(args),
    name: "input",
    label: "Input",
    type: NodeTypesEnum.IO,
    description: "Input",
    parameters: [
        {
            label: "Output",
            type: NodeParameterTypesEnum.OUTPUT,
            name: "output",
            description: "Output",
        },
    ],
}

module.exports = node
