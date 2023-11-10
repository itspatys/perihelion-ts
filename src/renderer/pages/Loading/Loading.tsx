import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    Spinner,
} from "@nextui-org/react"
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

import { setApp } from "../../store/appSlice"
import { setOperations } from "../../store/operationsSlice"
import { setWorkflow } from "../../store/workflowSlice"

const Loading = () => {
    const dispatch = useDispatch()
    const [showCancel, setShowCancel] = useState(false)

    const load = useCallback(async () => {
        const nodesJSON = await window.api.nodes.load()
        const workflowJSON = await window.api.workspace.load()

        dispatch(setOperations(nodesJSON))
        dispatch(setWorkflow(workflowJSON))

        dispatch(setApp("flow"))
        toast.success("Project loaded successfully")
    }, [])

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setShowCancel(true)
        }, 2000)
    }, [])

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
                        <Spinner label="Loading..." color="primary" />
                        {showCancel ? (
                            <Button
                                color="danger"
                                onClick={() => {
                                    dispatch(setApp("open"))
                                }}
                            >
                                Cancel
                            </Button>
                        ) : null}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </section>
    )
}

export default Loading
