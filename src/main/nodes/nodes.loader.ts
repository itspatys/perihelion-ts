import importModules from "import-modules"
import path from "path"

export async function nodesLoader() {
    /* const files = await fs.readdir("./src/main/nodes/filters")
    console.log(files)
    for (const file of files) {
        const filter = await import(`${file}`)
        console.log(filter)
    } */
    //console.log(__dirname)
    const filters = importModules(path.join(process.cwd(), ".vite/build"))
    //const filters = importCwd(path.join(process.cwd(), ".vite/build"))
    console.log(path.join(process.cwd(), ".vite/build"), filters)
}

// Call nodesLoader() to import and execute all filters.
