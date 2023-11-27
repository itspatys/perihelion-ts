import {
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"

const RichImage = ({ mime }: { mime: string }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return (
        <>
            <div className="w-100 flex justify-center">
                <Image
                    src={mime}
                    height={30 * 4}
                    className="h-[calc(32px*4)]"
                    isZoomed
                    onClick={onOpen}
                />
            </div>
            <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader>Image preview</ModalHeader>
                    <ModalBody>
                        <div className="w-100 flex justify-center">
                            <Image src={mime} onClick={onOpen} />
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default RichImage
