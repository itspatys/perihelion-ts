import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import { ThreeDotsVertical } from "styled-icons/bootstrap"

import { Node } from "../../../../../../../data/configuration-file.interface"
import { useDispatch } from "../../../../../../store/store"
import {
    deleteNode,
    invalidateNode,
    setFile,
} from "../../../../../../store/workflowSlice"

const NodeDropdownMenu = ({ nodeProps }: { nodeProps: Node }) => {
    const dispatch = useDispatch()
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    size="sm"
                    className="p-0 m-0 text-background h-full"
                    variant="light"
                >
                    <ThreeDotsVertical className="h-6 w-6" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                onAction={(key) => {
                    if (key === "delete-node") {
                        dispatch(deleteNode(nodeProps.id))
                        return
                    }

                    if (key === "invalidate") {
                        dispatch(invalidateNode(nodeProps.id))
                        return
                    }

                    if (key === "delete-image") {
                        dispatch(
                            setFile({
                                id: nodeProps.id,
                                file: undefined,
                            }),
                        )
                    }
                }}
            >
                {nodeProps.data.operation.name !== "input" ? (
                    <DropdownItem key="invalidate">
                        Force node invalidate
                    </DropdownItem>
                ) : null}
                <DropdownItem
                    key="delete-node"
                    color="danger"
                    className="text-danger"
                >
                    Delete node
                </DropdownItem>
                {nodeProps.data.operation.name === "input" ? (
                    <DropdownItem
                        key="delete-image"
                        color="danger"
                        className="text-danger"
                    >
                        Delete image
                    </DropdownItem>
                ) : null}
            </DropdownMenu>
        </Dropdown>
    )
}

export default NodeDropdownMenu
