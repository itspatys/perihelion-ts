import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { NodeChange } from "reactflow"
import type { Connection, EdgeChange, NodePositionChange } from "reactflow"

import {
    ConfigurationFile,
    NodeStatus,
} from "../../data/configuration-file.interface"

const isNodePositionChange = (
    change: NodeChange,
): change is NodePositionChange => {
    return change.type === "position"
}

const initialState: ConfigurationFile = {
    nodes: [
        {
            id: "start",
            position: { x: 0, y: 0 },
            data: {
                status: NodeStatus.PENDING,
            },
            type: "start",
        },
    ],
    edges: [],
    workspacePath: "",
}

const workflowSlice = createSlice({
    name: "workflow",
    initialState: initialState,
    reducers: {
        setWorkflow: (state, action: PayloadAction<ConfigurationFile>) => {
            state = action.payload
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
} = workflowSlice.actions
export default workflowSlice.reducer
