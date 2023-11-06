import TitleBar from "../../layouts/TitleBar"
import { useSelector } from "../../store/store"
import Flow from "../Flow"
import OpenScreen from "../OpenScreen"

const Main = () => {
    const appState = useSelector((state) => state.app.appState)
    return (
        <main className="dark flex flex-col w-screen h-screen text-foreground">
            <TitleBar />
            {appState === "open" ? <OpenScreen /> : <></>}
            {appState === "flow" ? <Flow /> : <></>}
        </main>
    )
}

export default Main
