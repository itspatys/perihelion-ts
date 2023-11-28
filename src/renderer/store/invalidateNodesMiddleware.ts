import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import type { Action, TypedStartListening } from "@reduxjs/toolkit"

import { NodeStatus } from "../../data/configuration-file.interface"
import type { Dispatch, RootState } from "./store"
import { getDependentNodes } from "./utils/getDependentNodes"
import {
    addEdge,
    deleteEdge,
    deleteNode,
    invalidateNode,
    setFile,
    setStatus,
    updateNodeParameter,
} from "./workflowSlice"

const listenerMiddleware = createListenerMiddleware()

type AppStartListening = TypedStartListening<RootState, Dispatch>

const startAppListening = listenerMiddleware.startListening as AppStartListening

startAppListening({
    matcher: isAnyOf(
        updateNodeParameter,
        addEdge,
        deleteNode,
        deleteEdge,
        setFile,
        invalidateNode,
    ),
    effect: (action, listenerApi) => {
        let nodeId: string = ""
        let includeCurrentNode = true
        if (deleteNode.match(action)) {
            nodeId = action.payload
        }
        if (deleteEdge.match(action)) {
            const edge = listenerApi
                .getOriginalState()
                .workflow.edges.find((e) => e.id === action.payload)
            nodeId = edge.target
        }
        if (updateNodeParameter.match(action)) {
            nodeId = action.payload.id

            matrixIf: if (
                ["cols", "rows"].includes(action.payload.parameter.name)
            ) {
                const node = listenerApi
                    .getState()
                    .workflow.nodes.find((n) => n.id === nodeId)

                const matrix = node.data.operation.parameters.find(
                    (p) => p.name === "matrix",
                )

                if (!matrix) {
                    break matrixIf
                }

                const rows = node.data.operation.parameters.find(
                    (p) => p.name === "rows",
                ).value as number
                const cols = node.data.operation.parameters.find(
                    (p) => p.name === "cols",
                ).value as number

                const newMatrix = new Array(rows)
                    .fill(0)
                    .map(() => new Array<string>(cols).fill("0"))

                listenerApi.dispatch(
                    updateNodeParameter({
                        id: nodeId,
                        parameter: {
                            name: "matrix",
                            value: newMatrix,
                        },
                    }),
                )
            }
        }
        if (setFile.match(action)) {
            nodeId = action.payload.id
            if (typeof action.payload.file !== "undefined") {
                includeCurrentNode = false
            }
        }
        if (invalidateNode.match(action)) {
            nodeId = action.payload
        }
        if (addEdge.match(action)) {
            nodeId = action.payload.target
        }

        if (nodeId === "") {
            console.warn("Couldn't find node id >.<")
            return
        }

        const dependentNodes = getDependentNodes(
            listenerApi.getOriginalState().workflow,
            nodeId,
            includeCurrentNode,
        )

        dependentNodes.forEach((n) => {
            listenerApi.dispatch(
                setStatus({ id: n.id, status: NodeStatus.PENDING }),
            )
        })
    },
})

const { middleware } = listenerMiddleware

export { middleware as invalidateNodesMiddleware }
