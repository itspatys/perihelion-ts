import fs from "fs/promises"
import path from "path"

export async function nodesLoader() {
    let nodesJSON = {}
    try {
        const files = await fs.readdir(path.join(process.cwd(), ".vite/build"))
        const filters = []
        for (const file of files) {
            if (file.endsWith(".node.js")) {
                const module = await require(
                    path.join(process.cwd(), ".vite/build", file),
                )
                filters.push(module)    
            }
        }
        fs.writeFile("nodes.json", JSON.stringify(filters))

        nodesJSON = filters
    } catch (error) {
        console.log('Error loading nodes: ', error)
    }

    return JSON.stringify(nodesJSON)
}
