import {
    Node,
    NodeBaseFunctionParameters,
    NodeParameterTypesEnum,
    NodeTypesEnum,
} from "../../../data/node.interface"
import { evaluateExpression } from "../../utils/evaluateExpression"
import { loadImgJimp, saveImgJimp } from "../../utils/img.util"

const convolution = async (args: ConvolutionArgs) => {
    console.log(args)
    const img = await loadImgJimp(args.inputFilePath[0])
    const evaluatedMatrix = args.matrix.map((r) =>
        r.map((c) => evaluateExpression(c)),
    )
    img.convolution(evaluatedMatrix)
    return saveImgJimp(img, args.outputFilePath[0])
}

interface ConvolutionArgs extends NodeBaseFunctionParameters {
    cols: number
    rows: number
    matrix: string[][]
}

const node: Node<ConvolutionArgs> = {
    init: (args: ConvolutionArgs) => convolution(args),
    name: "convolution",
    label: "Matrix",
    type: NodeTypesEnum.FILTER,
    subtype: "matrix",
    description: "Convolute image with matrix",
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
            label: "Cols",
            name: "cols",
            type: NodeParameterTypesEnum.NUMBER,
            description: "Cols",
            default: 3,
            range: [3, 9],
            step: 2,
        },
        {
            label: "Rows",
            name: "rows",
            type: NodeParameterTypesEnum.NUMBER,
            description: "Rows",
            default: 3,
            range: [3, 9],
            step: 2,
        },
        {
            label: "Matrix",
            name: "matrix",
            type: NodeParameterTypesEnum.ARRAY,
            description: "Sigma X",
            default: [
                ["0", "0", "0"],
                ["0", "0", "0"],
                ["0", "0", "0"],
            ],
            range: [0, 100],
            step: 1,
        },
    ],
}

module.exports = node
