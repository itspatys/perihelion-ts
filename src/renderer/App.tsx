import { Button, NextUIProvider } from "@nextui-org/react"
import { useEffect, useState } from "react"
import TitleBar from "./layouts/TitleBar/TitleBar"

const App = () => {
    const [img, setImg] = useState<null | string>(null)
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        window.api.handleCounter((event, value) => {
            console.log(event, value)
            setCounter(value)
        })
    }, [])

    useEffect(() => {
        window.api.workspace.handleLoad((event, value) => {
            console.log(event, value)
        })
    }, [])

    return (
        <NextUIProvider>
            <main className="dark">
                <TitleBar />
                <Button onClick={window.api.openFile}>Open file</Button>
                {img ? <img src={img} /> : null}
                <Button
                    onClick={() => {
                        window.api.click()
                    }}
                >
                    Increase
                </Button>
                <Button onClick={window.api.workspace.create}>
                    Create new workspace
                </Button>
                <Button onClick={window.api.workspace.load}>
                    Load workspace
                </Button>

                <Button onClick={window.api.loadFilters}>
                    Load workspace
                </Button>

                <p>{counter}</p>
            </main>
        </NextUIProvider>
    )
}

export default App
