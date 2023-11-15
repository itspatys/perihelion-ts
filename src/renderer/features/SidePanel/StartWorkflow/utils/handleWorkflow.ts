import { toast } from "sonner"

import {
    ConfigurationFile,
    NodeStatus,
} from "../../../../../data/configuration-file.interface"
import { sortNodes } from "./sortNodes"

type TToast = typeof toast

const handleWorkflow = async (
    workflow: ConfigurationFile,
    toast: TToast,
    setStatus: ({ id, status }: { id: string; status: NodeStatus }) => void,
) => {
    const sortedNodes = sortNodes(workflow)

    const filteredNodes = sortedNodes
        .filter((node) => node.data.status !== NodeStatus.SUCCESS)
        .filter((node) => node.id !== "start")

    console.log(filteredNodes)

    const inputNodes = filteredNodes.filter(
        (node) => node.data.operation.name === "input",
    )

    for (const inputNode of inputNodes) {
        if (inputNode.data.status !== NodeStatus.SUCCESS) {
            toast.warning(
                "There is at least one node without image attached to workflow.",
            )
            return
        }
    }

    for (const node of filteredNodes) {
        setStatus({ id: node.id, status: NodeStatus.RUNNING })

        const inputIds = node.data.operation.parameters
            .filter((param) => /^input/i.test(param.name))
            .map((param) => param.value.toString())

        const params = Object.fromEntries(
            node.data.operation.parameters.map((p) => [p.name, p.value]),
        )

        const status = await window.api.nodes.process({
            id: node.id,
            inputIds: inputIds,
            params: params,
            name: node.data.operation.name,
        })

        if (!status) {
            toast.error("Error while processing node.", {
                description: "ID: " + node.id,
            })
            setStatus({ id: node.id, status: NodeStatus.FAILED })
            return
        }

        setStatus({ id: node.id, status: NodeStatus.SUCCESS })
    }

    toast.success("Workflow finished")
}

export { handleWorkflow }
