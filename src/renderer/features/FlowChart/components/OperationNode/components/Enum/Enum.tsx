import { Select, SelectItem, Slider } from "@nextui-org/react"

import { Node } from "../../../../../../../data/configuration-file.interface"
import {
    NodeParameter,
    NodeParameterOptions as OperationParameterOptions,
} from "../../../../../../../data/node.interface"

const Enum = ({
    nodeProps,
    setParameterValue,
    p,
}: {
    nodeProps: Node
    setParameterValue: (
        id: string,
        parameter: Partial<OperationParameterOptions>,
    ) => void
    p: NodeParameter
}) => {
    const selectedKey = nodeProps.data.operation.parameters.find(
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
                <SelectItem key={o.value + ""} value={o.value + ""}>
                    {o.label}
                </SelectItem>
            ))}
        </Select>
    )
}

export default Enum
