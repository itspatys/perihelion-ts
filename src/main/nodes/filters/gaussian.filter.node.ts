import { cv } from "opencv-wasm"

import { Operation } from "../../../data/operation.interface"
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

const filter: Operation<GaussianArgs> = {
    init: (filePath: string, args: GaussianArgs) => gaussian(filePath, args),
    name: "gaussian",
    label: "Gaussian",
    type: "filter",
    subtype: "gaussian",
    description: "Applies gaussian blur to image",
    parameters: [
        {
            label: "Input",
            type: "input",
            name: "input",
            description: "input",
            default: 0,
        },
        {
            label: "Sigma X",
            name: "sigma-x",
            type: "number",
            description: "Sigma X",
            default: 0,
            range: [0, 100],
            step: 1,
        },
        {
            label: "Sigma Y",
            name: "sigma-y",
            type: "number",
            description: "Sigma Y",
            default: 0,
            range: [0, 100],
            step: 1,
        },
        {
            label: "Kernel X",
            name: "kernel-x",
            type: "number",
            description: "Kernel X",
            default: 1,
            range: [1, 100],
            step: 1,
        },
        {
            label: "Kernel Y",
            name: "kernel-y",
            type: "number",
            description: "Kernel Y",
            default: 1,
            range: [1, 100],
            step: 1,
        },
        {
            label: "Output",
            type: "output",
            name: "output",
            description: "Output",
            default: 0,
        },
    ],
}

module.exports = filter
