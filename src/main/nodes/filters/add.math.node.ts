import { cv } from "opencv-wasm";



import { Node, NodeBaseFunctionParameters, NodeParameterTypesEnum, NodeTypesEnum } from "../../../data/node.interface";
import { loadImg, saveImg } from "../../utils/img.util";


const add = async (args: AddArgs) => {
    const mat = await loadImg(args.inputFilePath[0])
    const mat2 = await loadImg(args.inputFilePath[1])
    cv.add(mat, mat2, mat)
    return saveImg(mat, args.outputFilePath[0])
}

type AddArgs = NodeBaseFunctionParameters

const node: Node<AddArgs> = {
    init: (args: AddArgs) => add(args),
    name: "add",
    label: "Add",
    type: NodeTypesEnum.MATH,
    subtype: "arithmetic",
    description: "Add",
    parameters: [
        {
            label: "Input 1",
            type: NodeParameterTypesEnum.INPUT,
            name: "input-1",
            description: "input first image",
        },
        {
            label: "Output",
            type: NodeParameterTypesEnum.OUTPUT,
            name: "output",
            description: "Output",
        },
        {
            label: "Input 2",
            type: NodeParameterTypesEnum.INPUT,
            name: "input-2",
            description: "input second image",
        },
    ],
}

module.exports = node