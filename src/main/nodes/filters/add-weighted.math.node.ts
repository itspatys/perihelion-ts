import { cv } from "opencv-wasm"

import {
    Node,
    NodeBaseFunctionParameters,
    NodeParameterTypesEnum,
    NodeTypesEnum,
} from "../../../data/node.interface"
import { loadImg, saveImg } from "../../utils/img.util"

const addWeighted = async (args: AddWeightedArgs) => {
    console.log(args)
    const alpha = args.weight / 100
    const beta = 1 - alpha
    const mat1 = await loadImg(args.inputFilePath[0])
    const mat2 = await loadImg(args.inputFilePath[1])
    const dst = new cv.Mat()
    cv.addWeighted(mat1, alpha, mat2, beta, 0.0, dst, -1)
    return saveImg(dst, args.outputFilePath[0])
}

interface AddWeightedArgs extends NodeBaseFunctionParameters {
    weight: number
}

const node: Node<AddWeightedArgs> = {
    init: (args: AddWeightedArgs) => addWeighted(args),
    name: "add-weighted",
    label: "Add Weighted",
    type: NodeTypesEnum.MATH,
    subtype: "arithmetic",
    description: "Add Weighted",
    parameters: [
        {
            label: "Input 1",
            type: NodeParameterTypesEnum.INPUT,
            name: "input-1",
            description: "input first image",
        },
        {
            label: "Weights balance",
            name: "weight",
            type: NodeParameterTypesEnum.NUMBER,
            default: 0,
            range: [0, 100],
            step: 1,
            description: "weights balance",
        },
        {
            label: "Input 2",
            type: NodeParameterTypesEnum.INPUT,
            name: "input-2",
            description: "input second image",
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
