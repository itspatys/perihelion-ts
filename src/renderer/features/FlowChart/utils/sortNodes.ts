import {
    ConfigurationFile,
    Node,
} from "../../../../data/configuration-file.interface"

const sortNodes = (workflow: ConfigurationFile): Node[] => {
    const visited: { [key: string]: boolean } = {}
    const result: Node[] = []

    const dfs = (nodeId: string) => {
        visited[nodeId] = true

        const edges = workflow.edges.filter((edge) => edge.source === nodeId)

        edges.forEach((edge) => {
            const targetNodeId = edge.target

            if (!visited[targetNodeId]) {
                dfs(targetNodeId)
            }
        })

        const node = workflow.nodes.find((n) => n.id === nodeId)
        if (node) {
            result.unshift(node)
        }
    }

    const startNode = workflow.nodes.find((node) => node.id === "start")
    if (startNode) {
        dfs(startNode.id)
    }

    return result
}

export { sortNodes }
