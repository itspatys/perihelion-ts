import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react"
import Logo from "./components/Logo"

const OpenScreen = () => {
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
                            onClick={() => {
                                window.api.workspace.load()
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
