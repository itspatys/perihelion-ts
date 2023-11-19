import { Button } from "@nextui-org/react"
import { useCallback } from "react"
import { toast } from "sonner"

import { NodeStatus } from "../../../../data/configuration-file.interface"
import { useSelector } from "../../../store/store"
import { useDispatch } from "../../../store/store"
import { setStatus } from "../../../store/workflowSlice"
import { handleWorkflow } from "./utils/handleWorkflow"

const StartWorkflow = () => {
    const workflow = useSelector((state) => state.workflow)
    const dispatch = useDispatch()

    const setStatusWrapper = useCallback(
        ({ id, status }: { id: string; status: NodeStatus }) => {
            dispatch(setStatus({ id, status }))
        },
        [],
    )

    return (
        <Button
            className="w-full mb-2"
            onClick={() => {
                handleWorkflow(workflow, toast, setStatusWrapper)
            }}
            color="primary"
        >
            Start Workflow
        </Button>
    )
}

export default StartWorkflow
