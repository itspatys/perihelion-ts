import { Chip } from "@nextui-org/react"
import clsx from "clsx"
import { Handle, Position } from "reactflow"

import {
    NodeIOParameter,
    NodeParameter,
    NodeParameterTypesEnum,
} from "../../../../../../../data/node.interface"

const IO = ({
    p,
}: {
    p:
        | NodeIOParameter<
              NodeParameterTypesEnum.INPUT | NodeParameterTypesEnum.OUTPUT
          >
        | NodeParameter
}) => {
    return (
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
                    p.type === "output" && "left-[none] right-[-20px]",
                )}
                type={p.type === "input" ? "target" : "source"}
                position={p.type === "input" ? Position.Left : Position.Right}
                id={p.name}
            />
        </div>
    )
}

export default IO
