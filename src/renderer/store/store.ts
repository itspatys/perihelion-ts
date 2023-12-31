import { configureStore } from "@reduxjs/toolkit"
import {
    TypedUseSelectorHook,
    useDispatch as useD,
    useSelector as useS,
} from "react-redux"

import app from "./appSlice"
import { invalidateNodesMiddleware } from "./invalidateNodesMiddleware"
import operations from "./operationsSlice"
import { saveMiddleware } from "./saveMiddleware"
import viewport from "./viewportSlice"
import workflow from "./workflowSlice"

const store = configureStore({
    reducer: { app, workflow, viewport, operations },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(
            saveMiddleware,
            invalidateNodesMiddleware,
        ),
})

export type Dispatch = typeof store.dispatch
export const useDispatch: () => Dispatch = useD

export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = useS

export default store
