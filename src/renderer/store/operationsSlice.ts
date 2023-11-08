import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { Operation } from "../../data/operation.interface"

const initialState: Operation[] = []

export const operationsSlice = createSlice({
    name: "nodes",
    initialState: initialState,
    reducers: {
        setOperations: (state, action: PayloadAction<string>) => {
            const nodes: Operation[] = JSON.parse(action.payload)
            state.splice(0, state.length, ...nodes)
        },
    },
})

export const { setOperations } = operationsSlice.actions
export default operationsSlice.reducer
