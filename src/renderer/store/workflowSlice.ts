import { PayloadAction, createSlice, original } from "@reduxjs/toolkit"
import { NodeChange } from "reactflow"
import type { Connection, NodePositionChange } from "reactflow"
import { v4 } from "uuid"

import {
    ConfigurationFile,
    NodeStatus,
} from "../../data/configuration-file.interface"
import { NodeParameterOptions as OperationParameterOptions } from "../../data/node.interface"
import { getDependentNodes } from "./utils/getDependentNodes"

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
        setFile: (
            state,
            action: PayloadAction<{ id: string; file: string | undefined }>,
        ) => {
            const node = state.nodes.find(
                (node) => node.id === action.payload.id,
            )
            node.data.file = action.payload.file

            if (action.payload.file) {
                node.data.status = NodeStatus.SUCCESS
            }

            if (!action.payload.file) {
                node.data.status = NodeStatus.PENDING
            }
        },
        setStatus: (
            state,
            action: PayloadAction<{ id: string; status: NodeStatus }>,
        ) => {
            state.nodes.find(
                (node) => node.id === action.payload.id,
            ).data.status = action.payload.status
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
        deleteNode: (state, action: PayloadAction<string>) => {
            const edgesFromNode = state.edges.filter(
                (edge) => edge.source === action.payload,
            )
            edgesFromNode.forEach((edge) => {
                const targetNode = state.nodes.find(
                    (node) => node.id === edge.target,
                )
                const input = targetNode.data.operation.parameters.find(
                    (param) => param.name === edge.targetHandle,
                )
                input.value = undefined
            })

            state.nodes = state.nodes.filter(
                (node) => node.id !== action.payload,
            )
            state.edges = state.edges.filter(
                (edge) => edge.target !== action.payload,
            )
            state.edges = state.edges.filter(
                (edge) => edge.source !== action.payload,
            )
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
                id: v4(),
                source: action.payload.source,
                target: action.payload.target,
                sourceHandle: action.payload.sourceHandle,
                targetHandle: action.payload.targetHandle,
            })

            const target = state.nodes.find(
                (node) => node.id === action.payload.target,
            )

            const targetInputParam = target.data.operation.parameters.find(
                (param) => param.name === action.payload.targetHandle,
            )

            targetInputParam.value = action.payload.source
        },
        deleteEdge: (state, action: PayloadAction<string>) => {
            const edge = state.edges.find((edge) => edge.id === action.payload)
            const targetNode = state.nodes.find(
                (node) => node.id === edge.target,
            )
            const input = targetNode.data.operation.parameters.find(
                (parameter) => parameter.name === edge.targetHandle,
            )

            input.value = undefined

            state.edges = state.edges.filter(
                (edge) => edge.id !== action.payload,
            )
        },
        invalidateNode: (_, __: PayloadAction<string>) => {},

        clearWorkflow: (state) => {
            state = initialState
        },
    },
})

export const {
    setWorkflow,
    clearWorkflow,

    setEdges,
    addEdge,
    deleteEdge,

    setNodes,
    setNode,
    addNode,
    updateNodeParameter,
    deleteNode,
    setFile,
    setStatus,
    invalidateNode,
} = workflowSlice.actions
export default workflowSlice.reducer
