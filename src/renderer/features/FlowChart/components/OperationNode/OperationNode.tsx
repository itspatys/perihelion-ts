import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Tooltip,
} from "@nextui-org/react"
import clsx from "clsx"
import { useCallback, useEffect, useState } from "react"

import {
    Node,
    NodeStatus,
} from "../../../../../data/configuration-file.interface"
import { NodeParameterOptions as OperationParameterOptions } from "../../../../../data/node.interface"
import { useDispatch, useSelector } from "../../../../store/store"
import { updateNodeParameter } from "../../../../store/workflowSlice"
import Enum from "./components/Enum"
import IO from "./components/IO"
import Input from "./components/Input"
import Matrix from "./components/Matrix"
import NodeDropdownMenu from "./components/NodeDropdownMenu"
import Number from "./components/Number"
import RichImage from "./components/RichImage"

const OperationNode = (nodeProps: Node) => {
    const operation = useSelector((state) =>
        state.operations.find((o) => o.name === nodeProps.data.operation.name),
    )
    const dispatch = useDispatch()
    const [mime, setMime] = useState("")

    const setParameterValue = useCallback(
        (id: string, parameter: Partial<OperationParameterOptions>) => {
            dispatch(updateNodeParameter({ id, parameter }))
        },
        [],
    )

    useEffect(() => {
        setMimeAsync()
    }, [nodeProps.data.file, nodeProps.data.status])

    useEffect(() => {
        setMimeAsync()
    }, [])

    const setMimeAsync = async () => {
        if (!["input", "output"].includes(nodeProps.data.operation.name)) {
            return ""
        }

        let mime = ""

        switch (nodeProps.data.operation.name) {
            case "input":
                mime = await window.api.nodes.getImage(nodeProps.data.file)
                break
            case "output":
                mime = await window.api.nodes.getImage(nodeProps.id + ".png")
                break
        }
        setMime(mime)
    }

    return (
        <Card className="w-[calc(32px*8)]" key={nodeProps.id}>
            <CardHeader
                className={clsx(
                    "h-[32px] py-0 mr-0 pr-0",
                    nodeProps.data.status === NodeStatus.PENDING &&
                        "bg-warning text-background",
                    nodeProps.data.status === NodeStatus.SUCCESS &&
                        "bg-primary",
                    nodeProps.data.status === NodeStatus.RUNNING &&
                        "bg-success text-background",
                    nodeProps.data.status === NodeStatus.FAILED && "bg-danger",
                )}
            >
                <div className="w-full h-full grid grid-cols-[1fr_auto] items-center content-center">
                    <div>
                        <Tooltip content={nodeProps.id}>
                            {/* 
                            //@ts-ignore */}
                            <Button variant="flat" color="foreground">
                                {operation.label}
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="h-full">
                        <NodeDropdownMenu nodeProps={nodeProps} />
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="overflow-x-hidden">
                {operation.parameters
                    ? operation.parameters.map((p) => {
                          return p.type === "number" ? (
                              <Number
                                  nodeProps={nodeProps}
                                  p={p}
                                  setParameterValue={setParameterValue}
                                  key={p.name}
                              />
                          ) : p.type === "enum" ? (
                              <Enum
                                  nodeProps={nodeProps}
                                  p={p}
                                  setParameterValue={setParameterValue}
                                  key={p.name}
                              />
                          ) : p.type === "input" || p.type === "output" ? (
                              <IO p={p} />
                          ) : p.type === "array" ? (
                              <Matrix nodeProps={nodeProps} />
                          ) : null
                      })
                    : null}
                {operation.name === "input" ? (
                    <Input nodeProps={nodeProps} mime={mime} />
                ) : null}
                {operation.name === "output" &&
                nodeProps.data.status === NodeStatus.SUCCESS ? (
                    <RichImage mime={mime} />
                ) : null}
            </CardBody>
            <Divider />
            <CardFooter className="h-[32px]">
                {operation.description}
            </CardFooter>
        </Card>
    )
}

export default OperationNode
