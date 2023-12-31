import { clsx } from "clsx"
import { useEffect, useState } from "react"

import TitleBar from "../../layouts/TitleBar"
import { useDispatch } from "../../store/store"
import { useSelector } from "../../store/store"
import Flow from "../Flow"
import Loading from "../Loading"
import OpenScreen from "../OpenScreen"

const Main = () => {
    const appState = useSelector((state) => state.app.appState)

    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)")
        if (mq.matches) {
            setIsDark(true)
        }
        mq.addEventListener("change", (evt) => setIsDark(evt.matches))
    }, [])

    return (
        <main
            className={clsx(
                "flex flex-col w-screen h-screen text-foreground",
                isDark && "dark",
            )}
        >
            <TitleBar />
            {appState === "open" ? (
                <OpenScreen />
            ) : appState === "flow" ? (
                <Flow />
            ) : appState === "loading" ? (
                <Loading />
            ) : (
                <></>
            )}
        </main>
    )
}

export default Main
