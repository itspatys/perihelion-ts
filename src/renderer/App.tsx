import { NextUIProvider } from "@nextui-org/react"
import TitleBar from "./layouts/TitleBar/TitleBar"
import FlowChart from "./features/FlowChart"

import "reactflow/dist/style.css"
import { useState } from "react"
import OpenScreen from "./features/OpenScreen"

const App = () => {
    const [appState, setAppState] = useState<"openScreen" | "flow">(
        "openScreen",
    )
    return (
        <NextUIProvider>
            <main className="dark flex flex-col w-screen h-screen">
                <TitleBar />
                {appState === "openScreen" ? <OpenScreen /> : <FlowChart />}
            </main>
        </NextUIProvider>
    )
}

export default App
