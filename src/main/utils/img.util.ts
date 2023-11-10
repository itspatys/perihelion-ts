import Jimp from "jimp"
import { cv } from "opencv-wasm"

export const loadImg = async (filePath: string) => {
    try{
        const img = await Jimp.read(filePath)
        const mat = cv.matFromImageData(img.bitmap)
        return mat
    } catch (error) {
        console.log(error)
        throw new Error("Error loading image")
    }
}

export const saveImg = (mat: any, filePath: string): boolean => {
    try {
        new Jimp({
            width: mat.cols,
            height: mat.rows,
            data: Buffer.from(mat.data),
        }).write(filePath)
    } catch (error) {
        console.log(error)
        return false
    }
    return true
}
