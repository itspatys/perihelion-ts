import { NextUIProvider } from "@nextui-org/react"
import { useContext, useEffect } from "react"
import "reactflow/dist/style.css"
import { Toaster } from "sonner"

import AppContextProvider, { AppContext } from "./context/AppContext"
import FlowChart from "./features/FlowChart"
import OpenScreen from "./features/OpenScreen"
import TitleBar from "./layouts/TitleBar/TitleBar"

const App = () => {
    const { appState } = useContext(AppContext)

    useEffect(() => {
        console.log(appState)
    }, [appState])
    return (
        <AppContextProvider>
            <NextUIProvider>
                <Toaster />
                <main className="dark flex flex-col w-screen h-screen">
                    <TitleBar />
                    {appState === "openScreen" ? <OpenScreen /> : <></>}
                    {appState === "flow" ? <FlowChart /> : <></>}
                </main>
            </NextUIProvider>
        </AppContextProvider>
    )
}

export default App
