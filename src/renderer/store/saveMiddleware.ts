import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import type { TypedStartListening } from "@reduxjs/toolkit"

import type { Dispatch, RootState } from "./store"
import { addEdge, addNode, setNode, updateNodeParameter } from "./workflowSlice"

const listenerMiddleware = createListenerMiddleware()

type AppStartListening = TypedStartListening<RootState, Dispatch>

const startAppListening = listenerMiddleware.startListening as AppStartListening

startAppListening({
    matcher: isAnyOf(updateNodeParameter, addEdge, addNode, setNode),
    effect: (_, listenerApi) => {
        console.log("save")
        window.api.workspace.save(listenerApi.getState().workflow)
    },
})

const { middleware } = listenerMiddleware

export { middleware as saveMiddleware }
