import esbuild from 'esbuild';
import fs from 'fs/promises'
import path from "path"

export const transpile = async (code: string, name: string) => {
    const fileName = name + '.node'
    const filePath = path.join('./src/main/nodes/filters', fileName)
    await fs.writeFile(filePath+'.ts', code)


    const tsPath = filePath + '.ts'
    const jsPath = filePath + '.js'
    const res = esbuild.transformSync(await fs.readFile(tsPath, 'utf8'), {loader: 'ts', format: 'cjs'})
    await fs.writeFile(jsPath, res.code)
    

    await esbuild.build({
        entryPoints: [jsPath],
        bundle: false,
        platform: 'node',
        tsconfig: './tsconfig.json',
        format: 'cjs',
        minify: true,
        outfile: path.join(process.cwd(), `./.vite/build/${name}.node.js`)
    });
    await fs.unlink(jsPath)
}