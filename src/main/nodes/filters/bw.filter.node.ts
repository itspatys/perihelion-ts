import { cv } from "opencv-wasm"

import { Operation } from "../../../data/operation.interface"
import { loadImg, saveImg } from "../../utils/img.util"

const bw = async (filePath: string) => {
    const mat = await loadImg(filePath)
    await cv.cvtColor(mat, mat, cv.COLOR_BGR2GRAY)
    const savePath =
        "C:\\Users\\filip\\Desktop\\perihelion_workflow\\img_out.jpg"
    saveImg(mat, savePath)
}

const filter: Operation = {
    init: (filePath: string) => bw(filePath),
    name: "bw",
    label: "Black and White",
    type: "filter",
    subtype: "color change",
    description: "Image to B/W",
    parameters: [
        {
            label: "Input",
            type: "input",
            name: "input",
            description: "input",
            default: 0,
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
