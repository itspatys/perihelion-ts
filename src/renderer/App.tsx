import { NextUIProvider } from "@nextui-org/react"
import { Provider } from "react-redux"
import "reactflow/dist/style.css"
import { Toaster } from "sonner"

import Main from "./pages/Main"
import store from "./store/store"

const App = () => {
    return (
        <Provider store={store}>
            <NextUIProvider>
                <Toaster position="top-right" offset="32px" />
                <Main />
            </NextUIProvider>
        </Provider>
    )
}

export default App
