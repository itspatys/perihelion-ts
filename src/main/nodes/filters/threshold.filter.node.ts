import { cv } from "opencv-wasm"

import {
    Node,
    NodeBaseFunctionParameters,
    NodeParameterTypesEnum,
    NodeTypesEnum,
} from "../../../data/node.interface"
import { loadImg, saveImg } from "../../utils/img.util"

const threshold = async (args: ThresholdArgs) => {
    const mat = await loadImg(args.inputFilePath[0])

    switch (args.type) {
        case 0:
            cv.threshold(
                mat,
                mat,
                args.threshold,
                args.maxVal,
                cv.THRESH_BINARY,
            )
            break
        case 1:
            cv.threshold(
                mat,
                mat,
                args.threshold,
                args.maxVal,
                cv.THRESH_BINARY_INV,
            )
            break
        case 2:
            cv.threshold(mat, mat, args.threshold, args.maxVal, cv.THRESH_TRUNC)
            break
        case 3:
            cv.threshold(
                mat,
                mat,
                args.threshold,
                args.maxVal,
                cv.THRESH_TOZERO,
            )
            break
        case 4:
            cv.threshold(mat, mat, args.threshold, args.maxVal, cv.THRESH_OTSU)
            break
        case 5:
            cv.threshold(
                mat,
                mat,
                args.threshold,
                args.maxVal,
                cv.THRESH_TRIANGLE,
            )
            break
        default:
            cv.threshold(
                mat,
                mat,
                args.threshold,
                args.maxVal,
                cv.THRESH_BINARY,
            )
            break
    }

    saveImg(mat, args.outputFilePath[0])
}

interface ThresholdTypes {
    BINARY: 0
    BINARY_INV: 1
    TRUNC: 2
    TOZERO: 3
    OTSU: 4
    TRIANGLE: 5
}

interface ThresholdArgs extends NodeBaseFunctionParameters {
    threshold: number
    maxVal: number
    type: ThresholdTypes[keyof ThresholdTypes]
}

const node: Node<ThresholdArgs> = {
    init: (args: ThresholdArgs) => threshold(args),
    label: "Threshold",
    name: "threshold",
    type: NodeTypesEnum.FILTER,
    subtype: "threshold",
    description: "Applies threshold to image",
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
            label: "Threshold",
            type: NodeParameterTypesEnum.NUMBER,
            name: "threshold",
            description: "Threshold",
            default: 0,
            range: [0, 255],
            step: 1,
        },
        {
            label: "Max Value",
            type: NodeParameterTypesEnum.NUMBER,
            name: "max-value",
            description: "Max Value",
            default: 255,
            range: [0, 255],
            step: 1,
        },
        {
            label: "Type",
            name: "type",
            type: NodeParameterTypesEnum.ENUM,
            description: "Type",
            default: 0,
            options: [
                { name: "binary", value: 0, label: "Binary" },
                { name: "binary-inverted", value: 1, label: "Binary Inverted" },
                { name: "truncated", value: 2, label: "Truncated" },
                { name: "to-zero", value: 3, label: "To Zero" },
                { name: "otsu", value: 4, label: "Otsu" },
                { name: "triangle", value: 5, label: "Triangle" },
            ],
        },
    ],
}

module.exports = node
