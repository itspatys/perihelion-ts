import { ColorActionName } from "@jimp/plugin-color"
import { cv } from "opencv-wasm"

import {
    Node,
    NodeBaseFunctionParameters,
    NodeParameterTypesEnum,
    NodeTypesEnum,
} from "../../../data/node.interface"
import {
    loadImg,
    loadImgJimp,
    saveImg,
    saveImgJimp,
} from "../../utils/img.util"

const bw = async (args: BwArgs) => {
    // const mat = await loadImg(args.inputFilePath[0])
    // await cv.cvtColor(mat, mat, cv.COLOR_BGR2GRAY)
    // return saveImg(mat, args.outputFilePath[0])
    const img = await loadImgJimp(args.inputFilePath[0])
    img.color([{ apply: ColorActionName.GREYSCALE, params: [100] }])
    return saveImgJimp(img, args.outputFilePath[0])
}

type BwArgs = NodeBaseFunctionParameters

const node: Node<BwArgs> = {
    init: (args: BwArgs) => bw(args),
    name: "bw",
    label: "Black and White",
    type: NodeTypesEnum.FILTER,
    subtype: "color change",
    description: "Image to B/W",
    parameters: [
        {
            label: "Input",
            type: NodeParameterTypesEnum.INPUT,
            name: "input",
            description: "input",
        },
        {
            label: "Output",
            type: NodeParameterTypesEnum.OUTPUT,
            name: "output",
            description: "Output",
        },
    ],
}
module.exports = node
