import Jimp from "jimp"
import { cv } from "opencv-wasm"

export const dilation = async (filePath: string) => {
    const img = await Jimp.read(filePath)
    const mat = cv.matFromImageData(img.bitmap)

    let dst = new cv.Mat()
    let M = cv.Mat.ones(5, 5, cv.CV_8U)
    let anchor = new cv.Point(-1, -1)

    cv.Canny(mat, dst, 100, 200)

    // cv.dilate(
    //     mat,
    //     dst,
    //     M,
    //     anchor,
    //     1,
    //     cv.BORDER_CONSTANT,
    //     cv.morphologyDefaultBorderValue(),
    // )

    const result = new Jimp({
        width: dst.cols,
        height: dst.rows,
        data: Buffer.from(dst.data),
    })

    const mime = await result.getBase64Async(Jimp.MIME_PNG)

    return mime
}
