import { cv } from "opencv-wasm"
import { loadImg, saveImg } from "../utils/img.util"


export const gaussian = async (filePath: string) => {
    const mat = await loadImg(filePath)
    await cv.GaussianBlur(mat, mat, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT)

    saveImg(mat, filePath)
}