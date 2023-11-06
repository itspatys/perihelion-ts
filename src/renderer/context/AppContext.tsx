import { createContext, useState } from "react"

type AppState = "openScreen" | "flow"

type AppContextType = {
    appState: AppState
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
    workspace?: string | null
    setWorkspace: React.Dispatch<React.SetStateAction<string>>
}

const AppContext = createContext<AppContextType>({
    appState: "openScreen",
    setAppState: () => {},
    workspace: null,
    setWorkspace: () => {},
})

const AppContextProvider = ({ children }: React.PropsWithChildren) => {
    const [appState, setAppState] = useState<AppState>("openScreen")
    const [workspace, setWorkspace] = useState<string | null>(null)

    return (
        <AppContext.Provider
            value={{ appState, setAppState, workspace, setWorkspace }}
        >
            {children}
        </AppContext.Provider>
    )
}

export { AppContext }
export default AppContextProvider
