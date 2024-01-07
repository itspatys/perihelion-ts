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
                <Button
                    className="w-full"
                    color="default"
                    onClick={() => {
                        window.api.nodes.save(`import { cv } from "opencv-wasm"

                        import {
                            Node,
                            NodeBaseFunctionParameters,
                            NodeParameterTypesEnum,
                            NodeTypesEnum,
                        } from "../../../data/node.interface"
                        import { loadImg, saveImg } from "../../utils/img.util"
                        
                        const gaussian = async (args: GaussianArgs) => {
                            const mat = await loadImg(args.inputFilePath[0])
                            const size = new cv.Size(args.kernelX, args.kernelY)
                            await cv.GaussianBlur(
                                mat,
                                mat,
                                size,
                                args.sigmaX,
                                args.sigmaY,
                                cv.BORDER_DEFAULT,
                            )
                        
                            return saveImg(mat, args.outputFilePath[0])
                        }
                        
                        interface GaussianArgs extends NodeBaseFunctionParameters {
                            sigmaX: number
                            sigmaY: number
                            kernelX: number
                            kernelY: number
                        }
                        
                        const node: Node<GaussianArgs> = {
                            init: (args: GaussianArgs) => gaussian(args),
                            name: "test",
                            label: "TEST",
                            type: NodeTypesEnum.FILTER,
                            subtype: "test",
                            description: "Applies gaussian blur to image",
                            parameters: [
                                {
                                    label: "Input",
                                    type: NodeParameterTypesEnum.INPUT,
                                    name: "input",
                                    description: "input",
                                },
                                {
                                    label: "Output",
                                    type: NodeParameterTypesEnum.OUTPUT,
                                    name: "output",
                                    description: "Output",
                                },
                                {
                                    label: "Sigma X",
                                    name: "sigmaX",
                                    type: NodeParameterTypesEnum.NUMBER,
                                    description: "Sigma X",
                                    default: 0,
                                    range: [0, 100],
                                    step: 1,
                                },
                                {
                                    label: "Sigma Y",
                                    name: "sigmaY",
                                    type: NodeParameterTypesEnum.NUMBER,
                                    description: "Sigma Y",
                                    default: 0,
                                    range: [0, 100],
                                    step: 1,
                                },
                                {
                                    label: "Kernel X",
                                    name: "kernelX",
                                    type: NodeParameterTypesEnum.NUMBER,
                                    description: "Kernel X",
                                    default: 1,
                                    range: [1, 99],
                                    step: 2,
                                },
                                {
                                    label: "Kernel Y",
                                    name: "kernelY",
                                    type: NodeParameterTypesEnum.NUMBER,
                                    description: "Kernel Y",
                                    default: 1,
                                    range: [1, 99],
                                    step: 2,
                                },
                            ],
                        }
                        
                        module.exports = node
                        `, "test")
                    }}
                >
                    Test
                </Button>
            </div>
        </nav>
    )
}

export default SidePanel
