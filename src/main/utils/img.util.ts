import Jimp from "jimp"
import { cv } from "opencv-wasm"

export const loadImg = async (filePath: string) => {
    try {
        const img = await Jimp.read(filePath)
        const mat = cv.matFromImageData(img.bitmap)
        return mat
    } catch (error) {
        console.log(`Error loading ${filePath}:`, error)
        throw new Error("Error loading image")
    }
}

export const loadImgJimp = async (filePath: string) => {
    try {
        const img = await Jimp.read(filePath)
        return img
    } catch (error) {
        console.log(`Error loading ${filePath}:`, error)
        throw new Error("Error loading image")
    }
}

export const saveImgJimp = (img: Jimp, filePath: string): boolean => {
    try {
        img.write(filePath)
    } catch (error) {
        console.log(`Error saving ${filePath}:`, error)
        return false
    }
    return true
}

export const saveImg = (mat: any, filePath: string): boolean => {
    try {
        new Jimp({
            width: mat.cols,
            height: mat.rows,
            data: Buffer.from(mat.data),
        }).write(filePath)
    } catch (error) {
        console.log(`Error saving ${filePath}:`, error)
        return false
    }
    return true
}
