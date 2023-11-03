import { Button, NextUIProvider } from "@nextui-org/react"
import { useState } from "react"

const App = () => {
    const [img, setImg] = useState<null | string>(null)
    return (
        <NextUIProvider>
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
        </NextUIProvider>
    )
}

export default App
