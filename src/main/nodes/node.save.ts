import esbuild from 'esbuild';
import fs from 'fs/promises'

export const transpile = async (filePath: string) => {
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
        outfile: `./.vite/build/${jsPath}`
    });
}