import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface AppState {
    appState: "open" | "flow" | "loading"
    workspace: string | null
}

const initialState: AppState = {
    appState: "open",
    workspace: null,
}

export const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setApp: (state, action: PayloadAction<AppState["appState"]>) => {
            state.appState = action.payload
        },
        setWorkspace: (state, action: PayloadAction<AppState["workspace"]>) => {
            state.workspace = action.payload
        },
    },
})

export const { setApp, setWorkspace } = appSlice.actions
export default appSlice.reducer
