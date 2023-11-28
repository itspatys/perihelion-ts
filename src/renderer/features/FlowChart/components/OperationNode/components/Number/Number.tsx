import { Slider } from "@nextui-org/react"
import { useEffect, useState } from "react"

import { Node } from "../../../../../../../data/configuration-file.interface"
import {
    NodeParameter,
    NodeParameterOptions as OperationParameterOptions,
} from "../../../../../../../data/node.interface"

const Number = ({
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
    const [value, setValue] = useState(
        nodeProps.data.operation.parameters.find((o) => o.name === p.name)
            .value as number,
    )
    const [isInitial, setIsInitial] = useState(true)

    useEffect(() => {
        if (!isInitial) {
            setParameterValue(nodeProps.id, {
                name: p.name,
                value: value,
            })
        }
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
                setIsInitial(false)
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
}

export default Number
