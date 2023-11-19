import {
    Accordion,
    AccordionItem,
    Button,
    Listbox,
    ListboxItem,
    ScrollShadow,
    Tooltip,
} from "@nextui-org/react"
import groupBy from "object.groupby"
// import { useEffect } from "react"
import { toast } from "sonner"
import { v4 } from "uuid"

import { Node, NodeStatus } from "../../../data/configuration-file.interface"
import { setApp, setWorkspace } from "../../store/appSlice"
import { useDispatch, useSelector } from "../../store/store"
import { addNode, clearWorkflow } from "../../store/workflowSlice"
import StartWorkflow from "./StartWorkflow"

const SidePanel = () => {
    const workspace = useSelector((state) => state.app.workspace)
    const viewport = useSelector((state) => state.viewport)

    const operations = useSelector((state) => state.operations)
    const dispatch = useDispatch()

    // for test purposes
    // useEffect(() => {
    //     window.api.handleLoadNodes((event: any, value: any) => {
    //         console.log(value)
    //     })
    // }, [])

    return (
        <nav className="grid grid-rows-[1fr_auto] h-full ">
            <div className="my-2 overflow-x-hidden">
                <p className="text-small text-default-400">Current workspace</p>
                <Tooltip
                    content={workspace}
                    placement="bottom"
                    showArrow={true}
                    className="w-full"
                >
                    <Button className="w-full" size="sm" variant="flat">
                        {workspace.length > 20
                            ? workspace.slice(0, 19) + "..."
                            : workspace}
                    </Button>
                </Tooltip>
                <Accordion className="text-foreground" isCompact>
                    {Object.entries(groupBy(operations, (o) => o.type)).map(
                        ([type, operations]) => (
                            <AccordionItem
                                startContent={
                                    type === "filter"
                                        ? "Filters"
                                        : type === "math"
                                        ? "Arithmetic"
                                        : type === "transformation"
                                        ? "Image transformation"
                                        : type === "input-output"
                                        ? "Input / Output"
                                        : type
                                }
                                aria-label={type}
                                key={type}
                            >
                                <ScrollShadow className="h-36">
                                    <Listbox>
                                        {operations.map((operation) => (
                                            <ListboxItem
                                                key={operation.label}
                                                onClick={() => {
                                                    const node: Node = {
                                                        id: v4(),
                                                        position: {
                                                            x: viewport.x + 100,
                                                            y: viewport.y + 100,
                                                        },
                                                        data: {
                                                            status: NodeStatus.PENDING,
                                                            operation: {
                                                                name: operation.name,
                                                                parameters:
                                                                    operation.parameters &&
                                                                    operation.parameters.map(
                                                                        (
                                                                            p,
                                                                        ) => ({
                                                                            name: p.name,
                                                                            value: p.default,
                                                                        }),
                                                                    ),
                                                            },
                                                        },
                                                        type: "operation",
                                                    }
                                                    dispatch(addNode(node))
                                                }}
                                            >
                                                {operation.label}
                                            </ListboxItem>
                                        ))}
                                    </Listbox>
                                </ScrollShadow>
                            </AccordionItem>
                        ),
                    )}
                </Accordion>
            </div>
            <div className="my-2">
                {/* <Button
                    className="w-full mb-2"
                    color="primary"
                    onClick={() => {
                        window.api.nodes.process({
                            id: "test-1",
                            inputIds: ["test"],
                            params: {
                                sigmaX: 50,
                                sigmaY: 50,
                                kernelY: 1,
                                kernelX: 1,
                            },
                            name: "gaussian",
                        })
                    }}
                >
                    Process gaussian node
                </Button>
                <Button
                    className="w-full mb-2"
                    color="primary"
                    onClick={() => {
                        window.api.nodes.loadImage("hihi")
                    }}
                >
                    Load Image
                </Button> */}
                <StartWorkflow />
                <Button
                    className="w-full"
                    color="default"
                    onClick={() => {
                        dispatch(setApp("open"))
                        dispatch(setWorkspace(null))
                        dispatch(clearWorkflow())
                        toast("Project closed")
                    }}
                >
                    Quit workspace
                </Button>
            </div>
        </nav>
    )
}

export default SidePanel
