import { PayloadAction, createSlice, original } from "@reduxjs/toolkit"
import { NodeChange } from "reactflow"
import type { Connection, EdgeChange, NodePositionChange } from "reactflow"

import {
    ConfigurationFile,
    NodeStatus,
} from "../../data/configuration-file.interface"
import { NodeParameterOptions as OperationParameterOptions } from "../../data/node.interface"

const isNodePositionChange = (
    change: NodeChange,
): change is NodePositionChange => {
    return change.type === "position"
}

const initialState: ConfigurationFile = {
    nodes: [],
    edges: [],
    workspacePath: "",
}

const workflowSlice = createSlice({
    name: "workflow",
    initialState: initialState,
    reducers: {
        setWorkflow: (_, action: PayloadAction<string>) => {
            return JSON.parse(action.payload)
        },
        setNodes: (
            state,
            action: PayloadAction<ConfigurationFile["nodes"]>,
        ) => {
            state.nodes = action.payload
        },
        addNode: (
            state,
            action: PayloadAction<ConfigurationFile["nodes"][0]>,
        ) => {
            state.nodes.push(action.payload)
        },
        setNode: (state, action: PayloadAction<NodeChange>) => {
            const change = action.payload

            if (isNodePositionChange(change)) {
                if (!change.dragging) {
                    return
                }
                state.nodes = state.nodes.map((node) => {
                    if (node.id === change.id) {
                        node.position = change.position
                    }
                    return node
                })
            }
        },
        updateNodeParameter: (
            state,
            action: PayloadAction<{
                id: string
                parameter: Partial<OperationParameterOptions>
            }>,
        ) => {
            state.nodes
                .find((n) => n.id === action.payload.id)
                .data.operation.parameters.find(
                    (o) => o.name === action.payload.parameter.name,
                ).value = action.payload.parameter.value
        },
        setEdges: (
            state,
            action: PayloadAction<ConfigurationFile["edges"]>,
        ) => {
            state.edges = action.payload
        },
        addEdge: (state, action: PayloadAction<Connection>) => {
            state.edges.push({
                id: Date.now().toString(),
                source: action.payload.source,
                target: action.payload.target,
                sourceHandle: action.payload.sourceHandle,
                targetHandle: action.payload.targetHandle,
            })
        },
        clearWorkflow: (state) => {
            state = initialState
        },
    },
})

export const {
    setWorkflow,
    clearWorkflow,
    setEdges,
    setNodes,
    setNode,
    addNode,
    addEdge,
    updateNodeParameter,
} = workflowSlice.actions
export default workflowSlice.reducer
