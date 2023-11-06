import { cv } from "opencv-wasm"
import { loadImg, saveImg } from "../../utils/img.util"
import { Filter } from "../../../data/filter.interface"

const bw = async (filePath: string) => {
    const mat = await loadImg(filePath)
    await cv.cvtColor(mat, mat, cv.COLOR_BGR2GRAY)
    const savePath =
        "C:\\Users\\filip\\Desktop\\perihelion_workflow\\img_out.jpg"
    saveImg(mat, savePath)
}

const filter: Filter = {
    init: (filePath: string) => bw(filePath),
    label: "Black and White",
    type: "filter",
    subtype: "color change",
    description: "Converts image to black and white",
}
module.exports = filter;