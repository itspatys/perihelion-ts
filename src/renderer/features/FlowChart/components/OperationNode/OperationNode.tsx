import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Select,
    SelectItem,
    Slider,
} from "@nextui-org/react"
import clsx from "clsx"
import { useCallback } from "react"
import { Handle, Position } from "reactflow"

import {
    Node,
    NodeStatus,
} from "../../../../../data/configuration-file.interface"
import { OperationParameterOptions } from "../../../../../data/operation.interface"
import { useDispatch, useSelector } from "../../../../store/store"
import { updateNodeParameter } from "../../../../store/workflowSlice"

const OperationNode = (nodeProps: Node) => {
    const operation = useSelector((state) =>
        state.operations.find((o) => o.name === nodeProps.data.operation.name),
    )
    const dispatch = useDispatch()

    const setParameterValue = useCallback(
        (id: string, parameter: Partial<OperationParameterOptions>) => {
            dispatch(updateNodeParameter({ id, parameter }))
        },
        [],
    )

    return (
        <Card className="w-[calc(32px*8)]" key={nodeProps.id}>
            <CardHeader
                className={clsx(
                    "h-[32px]",
                    nodeProps.data.status === NodeStatus.PENDING &&
                        "bg-warning text-background",
                )}
            >
                {operation.label}
            </CardHeader>
            <Divider />
            <CardBody className="overflow-x-hidden">
                {operation.parameters
                    ? operation.parameters.map((p) => {
                          return p.type === "number" ? (
                              <Slider
                                  key={p.name}
                                  size="sm"
                                  label={p.label}
                                  step={p.step}
                                  minValue={p.range[0]}
                                  maxValue={p.range[1]}
                                  value={
                                      nodeProps.data.operation.parameters.find(
                                          (o) => o.name === p.name,
                                      ).value as number
                                  }
                                  onChange={(v) => {
                                      if (typeof v !== "number") {
                                          return
                                      }
                                      console.log()
                                      setParameterValue(nodeProps.id, {
                                          name: p.name,
                                          value: v,
                                      })
                                  }}
                                  className="h-[calc(32px*2)]"
                              />
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
            </CardBody>
            <Divider />
            <CardFooter className="h-[32px]">
                {operation.description}
            </CardFooter>
        </Card>
    )
}

export default OperationNode
