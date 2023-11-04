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

    return (
        <NextUIProvider>
            <main className="dark">
                <TitleBar />
                <Button onClick={window.api.openFile}>Open file</Button>
                <Button
                    onClick={async () => {
                        const result = await window.api.dilation()
                        setImg(result)
                    }}
                >
                    Dilation
                </Button>
                {img ? <img src={img} /> : null}
                <Button
                    onClick={() => {
                        window.api.click()
                    }}
                >
                    Increase
                </Button>
                <p>{counter}</p>
            </main>
        </NextUIProvider>
    )
}

export default App
