import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react"
import { useDispatch } from "react-redux"

import { setApp, setWorkspace } from "../../store/appSlice"
import { Logo } from "./components/Logo"

const OpenScreen = () => {
    const dispatch = useDispatch()

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
                                const path = await window.api.workspace.open()
                                dispatch(setApp("loading"))
                                dispatch(setWorkspace(path))
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
