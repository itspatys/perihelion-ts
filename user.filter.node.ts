import { cv } from "opencv-wasm";
import { Node, NodeBaseFunctionParameters, NodeParameterTypesEnum, NodeTypesEnum } from "./src/data/node.interface";
import { loadImg, saveImg } from "./src/main/utils/img.util"

const gaussian = async (args: GaussianArgs) => {
    const mat = await loadImg(args.inputFilePath[0])
    const size = new cv.Size(args.kernelX, args.kernelY)
    await cv.GaussianBlur(
        mat,
        mat,
        size,
        args.sigmaX,
        args.sigmaY,
        cv.BORDER_DEFAULT,
    )

    saveImg(mat, args.outputFilePath[0])
}

interface GaussianArgs extends NodeBaseFunctionParameters {
    sigmaX: number
    sigmaY: number
    kernelX: number
    kernelY: number
}

const node: Node<GaussianArgs> = {
    init: (args: GaussianArgs) => gaussian(args),
    name: "TEST",
    label: "TEST",
    type: NodeTypesEnum.FILTER,
    subtype: "TEST",
    description: "TEST",
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
        {
            label: "Sigma X",
            name: "sigma-x",
            type: NodeParameterTypesEnum.NUMBER,
            description: "Sigma X",
            default: 0,
            range: [0, 100],
            step: 1,
        },
        {
            label: "Sigma Y",
            name: "sigma-y",
            type: NodeParameterTypesEnum.NUMBER,
            description: "Sigma Y",
            default: 0,
            range: [0, 100],
            step: 1,
        },
        {
            label: "Kernel X",
            name: "kernel-x",
            type: NodeParameterTypesEnum.NUMBER,
            description: "Kernel X",
            default: 1,
            range: [1, 100],
            step: 1,
        },
        {
            label: "Kernel Y",
            name: "kernel-y",
            type: NodeParameterTypesEnum.NUMBER,
            description: "Kernel Y",
            default: 1,
            range: [1, 100],
            step: 1,
        },
    ],
}

module.exports = node