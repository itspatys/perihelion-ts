import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
} from "@nextui-org/react"
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
                        <Button>Open existing project</Button>
                        <Button>Create new project</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </section>
    )
}

export default OpenScreen
