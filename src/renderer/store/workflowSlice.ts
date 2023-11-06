import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import {
    ConfigurationFile,
    NodeStatus,
} from "../../data/configuration-file.interface"

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

export const workflowSlice = createSlice({
    name: "workflow",
    initialState: initialState,
    reducers: {
        setWorkflow: (state, action: PayloadAction<ConfigurationFile>) => {
            state = action.payload
        },
        clearWorkflow: (state) => {
            state = initialState
        },
    },
})

export const { setWorkflow, clearWorkflow } = workflowSlice.actions
export default workflowSlice.reducer
