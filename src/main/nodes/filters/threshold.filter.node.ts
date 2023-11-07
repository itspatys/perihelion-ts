import { cv } from "opencv-wasm"

import { Filter } from "../../../data/filter.interface"
import { loadImg, saveImg } from "../../utils/img.util"

const threshold = async (filePath: string, args: ThresholdArgs) => {
    const mat = await loadImg(filePath)

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

    const savePath =
        "C:\\Users\\filip\\Desktop\\perihelion_workflow\\img_out.jpg"
    saveImg(mat, savePath)
}

interface ThresholdTypes {
    BINARY: 0
    BINARY_INV: 1
    TRUNC: 2
    TOZERO: 3
    OTSU: 4
    TRIANGLE: 5
}

interface ThresholdArgs {
    threshold: number
    maxVal: number
    type: ThresholdTypes[keyof ThresholdTypes]
}

const filter: Filter<ThresholdArgs> = {
    init: (filePath: string, args: ThresholdArgs) => threshold(filePath, args),
    label: "Threshold",
    type: "filter",
    subtype: "threshold",
    description: "Applies threshold to image",
    parameters: [
        {
            label: "Threshold",
            type: "number",
            description: "Threshold",
            default: 0,
            range: [0, 255],
            step: 1,
        },
        {
            label: "Max Value",
            type: "number",
            description: "Max Value",
            default: 255,
            range: [0, 255],
            step: 1,
        },
        {
            label: "Type",
            type: "enum",
            description: "Type",
            default: 0,
            options: [
                { label: "Binary", value: 0 },
                { label: "Binary Inverted", value: 1 },
                { label: "Truncated", value: 2 },
                { label: "To Zero", value: 3 },
                { label: "Otsu", value: 4 },
                { label: "Triangle", value: 5 },
            ],
        },
    ],
}

module.exports = filter
