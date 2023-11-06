import { cv } from "opencv-wasm"

import { Filter } from "../../../data/filter.interface"
import { loadImg, saveImg } from "../../utils/img.util"

const gaussian = async (filePath: string, args: GaussianArgs) => {
    const mat = await loadImg(filePath)
    const size = new cv.Size(args.kernelX, args.kernelY)
    await cv.GaussianBlur(
        mat,
        mat,
        size,
        args.sigmaX,
        args.sigmaY,
        cv.BORDER_DEFAULT,
    )
    const savePath =
        "C:\\Users\\filip\\Desktop\\perihelion_workflow\\img_out.jpg"
    saveImg(mat, savePath)
}

interface GaussianArgs {
    sigmaX: number
    sigmaY: number
    kernelX: number
    kernelY: number
}

const filter: Filter<GaussianArgs> = {
    init: (filePath: string, args: GaussianArgs) => gaussian(filePath, args),
    label: "Gaussian",
    type: "filter",
    subtype: "gaussian",
    description: "Applies gaussian blur to image",
    parameters: [
        {
            label: "Sigma X",
            type: "number",
            description: "Sigma X",
            default: 0,
            range: [0, 100],
            step: 1,
        },
        {
            label: "Sigma Y",
            type: "number",
            description: "Sigma Y",
            default: 0,
            range: [0, 100],
            step: 1,
        },
        {
            label: "Kernel X",
            type: "number",
            description: "Kernel X",
            default: 1,
            range: [1, 100],
            step: 1,
        },
        {
            label: "Kernel Y",
            type: "number",
            description: "Kernel Y",
            default: 1,
            range: [1, 100],
            step: 1,
        },
    ],
}

module.exports = filter
