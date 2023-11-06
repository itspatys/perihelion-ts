import {
    Accordion,
    AccordionItem,
    Button,
    Listbox,
    ListboxItem,
    ScrollShadow,
    Tooltip,
} from "@nextui-org/react"
import { useEffect } from "react"
import { toast } from "sonner"

import { NodeStatus } from "../../../data/configuration-file.interface"
import { setApp, setWorkspace } from "../../store/appSlice"
import { useDispatch, useSelector } from "../../store/store"
import { addNode, clearWorkflow } from "../../store/workflowSlice"

const SidePanel = () => {
    const workspace = useSelector((state) => state.app.workspace)
    const viewport = useSelector((state) => state.viewport)
    const dispatch = useDispatch()

    // for test purposes
    useEffect(() => {
        window.api.handleLoadNodes((event: any, value: any) => {
            console.log(value)
        })
    }, [])

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
                    <AccordionItem
                        aria-label="Input/Output"
                        startContent="Input/Output"
                    >
                        <ScrollShadow className="h-36">
                            <Listbox>
                                <ListboxItem
                                    key="import-image"
                                    onClick={() => {
                                        toast("Import image")
                                        dispatch(
                                            addNode({
                                                id: Date.now().toString(),
                                                data: {
                                                    status: NodeStatus.PENDING,
                                                },
                                                type: "operation",
                                                position: {
                                                    x: viewport.x + 100,
                                                    y: viewport.y + 100,
                                                },
                                            }),
                                        )
                                    }}
                                >
                                    Import image
                                </ListboxItem>
                                <ListboxItem key="2">
                                    Change colorspace
                                </ListboxItem>
                                <ListboxItem key="3">Change format</ListboxItem>
                            </Listbox>
                        </ScrollShadow>
                    </AccordionItem>
                    <AccordionItem
                        aria-label="Image transformation"
                        startContent="Image transformation"
                    >
                        <ScrollShadow className="h-36">
                            <Listbox>
                                <ListboxItem key="Scale">
                                    Import image
                                </ListboxItem>
                            </Listbox>
                        </ScrollShadow>
                    </AccordionItem>
                    <AccordionItem aria-label="Filters" startContent="Filters">
                        <ScrollShadow className="h-36">
                            <Listbox>
                                <ListboxItem key="1">Gaussian</ListboxItem>
                                <ListboxItem key="2">Previtt</ListboxItem>
                            </Listbox>
                        </ScrollShadow>
                    </AccordionItem>
                    <AccordionItem aria-label="Math" startContent="Math">
                        <ScrollShadow className="h-36">
                            <Listbox>
                                <ListboxItem key="1">Add</ListboxItem>
                                <ListboxItem key="2">Subtract</ListboxItem>
                                <ListboxItem key="3">Multiple</ListboxItem>
                                <ListboxItem key="4">Divide</ListboxItem>
                                <ListboxItem key="5">Binarize</ListboxItem>
                            </Listbox>
                        </ScrollShadow>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="my-2">
                <Button
                    className="w-full mb-2"
                    color="primary"
                    onClick={() => {
                        window.api.loadNodes()
                    }}
                >
                    TEST BUTTON(nie dotykać)
                </Button>
                <Button
                    className="w-full mb-2"
                    color="primary"
                    onClick={() => {}}
                >
                    Start workflow
                </Button>
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
