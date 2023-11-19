import {
    ConfigurationFile,
    Node,
} from "../../../data/configuration-file.interface"

const getDependentNodes = (
    workflow: ConfigurationFile,
    nodeId: string,
    includeCurrentNode: boolean,
): Node[] => {
    const dependentNodes: Node[] = []

    if (includeCurrentNode) {
        const currentNode = workflow.nodes.find((node) => node.id === nodeId)
        if (currentNode) {
            dependentNodes.push(currentNode)
        }
    }

    const edges = workflow.edges.filter((edge) => edge.source === nodeId)

    edges.forEach((edge) => {
        const targetNode = workflow.nodes.find(
            (node) => node.id === edge.target,
        )
        if (targetNode) {
            dependentNodes.push(targetNode)

            const nestedDependentNodes = getDependentNodes(
                workflow,
                targetNode.id,
                false,
            )
            dependentNodes.push(...nestedDependentNodes)
        }
    })

    return dependentNodes
}

export { getDependentNodes }
