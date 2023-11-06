import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Viewport } from "reactflow"

const initialState: Viewport = {
    x: 0,
    y: 0,
    zoom: 1,
}

const viewportSlice = createSlice({
    name: "viewport",
    initialState,
    reducers: {
        setViewport: (state, action: PayloadAction<Viewport>) => {
            state = action.payload
        },
    },
})

export const { setViewport } = viewportSlice.actions
export default viewportSlice.reducer
