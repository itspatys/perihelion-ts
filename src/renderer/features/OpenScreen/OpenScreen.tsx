import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react"
import { useContext } from "react"
import { toast } from "sonner"

import { AppContext } from "../../context/AppContext"
import { Logo } from "./components/Logo"

const OpenScreen = () => {
    const { setAppState, setWorkspace } = useContext(AppContext)

    return (
        <section className="flex h-full bg-background">
            <Modal
                isOpen={true}
                backdrop="transparent"
                isDismissable={false}
                placement="center"
                closeButton={<></>}
            >
                <ModalContent>
                    <ModalBody>
                        <Logo />
                        <Button
                            onClick={async () => {
                                const path = await window.api.workspace.load()
                                setAppState("flow")
                                setWorkspace(path)
                                toast.success("Project loaded successfully")
                            }}
                        >
                            Open existing project
                        </Button>
                        <Button
                            onClick={() => {
                                window.api.workspace.create()
                            }}
                        >
                            Create new project
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </section>
    )
}

export default OpenScreen
