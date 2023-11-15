import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
    Select,
    SelectItem,
    Slider,
    Tooltip,
} from "@nextui-org/react"
import { ThreeDotsVertical } from "@styled-icons/bootstrap/ThreeDotsVertical"
import clsx from "clsx"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Handle, Position } from "reactflow"

import {
    Node,
    NodeStatus,
} from "../../../../../data/configuration-file.interface"
import { NodeParameterOptions as OperationParameterOptions } from "../../../../../data/node.interface"
import { useDispatch, useSelector } from "../../../../store/store"
import {
    deleteNode,
    setFile,
    updateNodeParameter,
} from "../../../../store/workflowSlice"

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
    }, [nodeProps.data.file])

    useEffect(() => {
        setMimeAsync()
    }, [])

    const setMimeAsync = async () => {
        if (!nodeProps.data.file) {
            return ""
        }
        const mime = await window.api.nodes.getImage(nodeProps.data.file)
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
                        {/* <Button
                            isIconOnly
                            aria-label="delete"
                            size="sm"
                            className="p-0 m-0 text-background h-full"
                            variant="light"
                            onClick={() => {
                                dispatch(deleteNode(nodeProps.id))
                            }}
                        >
                            <Xmark size={24} />
                        </Button> */}
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="overflow-x-hidden">
                {operation.parameters
                    ? operation.parameters.map((p) => {
                          return p.type === "number" ? (
                              (() => {
                                  const [value, setValue] = useState(
                                      nodeProps.data.operation.parameters.find(
                                          (o) => o.name === p.name,
                                      ).value as number,
                                  )

                                  useEffect(() => {
                                      setParameterValue(nodeProps.id, {
                                          name: p.name,
                                          value: value,
                                      })
                                  }, [value])

                                  return (
                                      <Slider
                                          key={p.name}
                                          size="sm"
                                          label={p.label}
                                          step={p.step}
                                          defaultValue={value}
                                          minValue={p.range[0]}
                                          maxValue={p.range[1]}
                                          onChangeEnd={(v) => {
                                              if (typeof v === "object") {
                                                  setValue(v[0])
                                                  return
                                              }

                                              if (typeof v === "number") {
                                                  setValue(v)
                                                  return
                                              }
                                          }}
                                          className="h-[calc(32px*2)]"
                                          marks={[
                                              {
                                                  value: p.range[0],
                                                  label: p.range[0] + "",
                                              },
                                              {
                                                  value: p.range[1],
                                                  label: p.range[1] + "",
                                              },
                                          ]}
                                      />
                                  )
                              })()
                          ) : p.type === "enum" ? (
                              (() => {
                                  const selectedKey =
                                      nodeProps.data.operation.parameters.find(
                                          (o) => o.name === p.name,
                                      ).value as number

                                  const value = new Set([selectedKey + ""])
                                  const options = p.options
                                  return (
                                      <Select
                                          label={p.label}
                                          selectedKeys={value}
                                          variant="bordered"
                                          onSelectionChange={(v) => {
                                              const [value] = v as string
                                              setParameterValue(nodeProps.id, {
                                                  name: p.name,
                                                  value: parseInt(value),
                                              })
                                          }}
                                          size="sm"
                                          className="h-[calc(32px*2)]"
                                          key={p.name}
                                      >
                                          {options.map((o) => (
                                              <SelectItem
                                                  key={o.value + ""}
                                                  value={o.value + ""}
                                              >
                                                  {o.label}
                                              </SelectItem>
                                          ))}
                                      </Select>
                                  )
                              })()
                          ) : p.type === "input" || p.type === "output" ? (
                              <div
                                  className={clsx(
                                      "h-[32px] relative",
                                      p.type === "output" && "text-right",
                                  )}
                                  key={p.name}
                              >
                                  <Chip>{p.label}</Chip>
                                  <Handle
                                      className={clsx(
                                          "w-3.5 h-3.5 top-[40%]",
                                          p.type === "input" && "left-[-20px]",
                                          p.type === "output" &&
                                              "left-[none] right-[-20px]",
                                      )}
                                      type={
                                          p.type === "input"
                                              ? "target"
                                              : "source"
                                      }
                                      position={
                                          p.type === "input"
                                              ? Position.Left
                                              : Position.Right
                                      }
                                      id={p.name}
                                  />
                              </div>
                          ) : null
                      })
                    : null}
                {operation.name === "input"
                    ? (() => {
                          return (
                              <div className="h-[calc(32px*4)] mt-2 flex justify-center">
                                  {!nodeProps.data.file ? (
                                      <Button
                                          size="lg"
                                          variant="bordered"
                                          className="w-full"
                                          onClick={async () => {
                                              const file =
                                                  await window.api.nodes.loadImage(
                                                      nodeProps.id,
                                                  )
                                              dispatch(
                                                  setFile({
                                                      id: nodeProps.id,
                                                      file: file,
                                                  }),
                                              )
                                          }}
                                      >
                                          Load image from file
                                      </Button>
                                  ) : (
                                      <Image
                                          src={mime}
                                          height={30 * 4}
                                          className="h-[calc(32px*4)]"
                                          isZoomed
                                      />
                                  )}
                              </div>
                          )
                      })()
                    : null}
            </CardBody>
            <Divider />
            <CardFooter className="h-[32px]">
                {operation.description}
            </CardFooter>
        </Card>
    )
}

export default OperationNode
