import {
    Button,
    Code,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"
import { useRef } from "react"

import { Node } from "../../../../../../../data/configuration-file.interface"
import { useDispatch } from "../../../../../../store/store"
import { updateNodeParameter } from "../../../../../../store/workflowSlice"

const Matrix = ({ nodeProps }: { nodeProps: Node }) => {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const rows = nodeProps.data.operation.parameters.find(
        (parameter) => parameter.name === "rows",
    ).value as number
    const cols = nodeProps.data.operation.parameters.find(
        (parameter) => parameter.name === "cols",
    ).value as number
    const matrix = nodeProps.data.operation.parameters.find(
        (parameter) => parameter.name === "matrix",
    ).value as string[][]
    const centerCol = Math.floor(cols / 2)
    const centerRow = Math.floor(rows / 2)

    return (
        <>
            <Button onClick={onOpen}>Edit matrix</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader>Edit matrix</ModalHeader>
                    <ModalBody>
                        <p>
                            You can use expressions, e.g. <Code>1/2</Code>.
                        </p>
                        <p>
                            You can use following characters: <Code>0-9</Code>,
                            <Code>+</Code>, <Code>-</Code>, <Code>*</Code>,
                            <Code>/</Code>, <Code>{"("}</Code>,{" "}
                            <Code>{")"}</Code>.
                        </p>
                        <div
                            className={`grid grid-cols-[repeat(${cols},1fr)] grid-rows-[repeat(${rows},1fr)] w-100 gap-1 p-1`}
                            //   className={`grid grid-cols-[repeat(${cols},1fr)] grid-rows-[repeat(${rows},1fr)] w-100`}
                            style={{
                                gridTemplateColumns: `repeat(${cols},minmax(3rem,1fr))`,
                                gridTemplateRows: `repeat(${rows},1fr)`,
                            }}
                        >
                            {new Array(rows)
                                .fill(0)
                                .map((_, row) => {
                                    return new Array(cols)
                                        .fill(0)
                                        .map((_, col) => {
                                            return (
                                                <Input
                                                    defaultValue={
                                                        matrix[row][col]
                                                    }
                                                    variant={
                                                        row === centerRow &&
                                                        col === centerCol
                                                            ? "bordered"
                                                            : undefined
                                                    }
                                                    onFocus={(e) => {
                                                        const target =
                                                            e.target as HTMLInputElement
                                                        target.select()
                                                    }}
                                                    onValueChange={(e) => {
                                                        let newMatrix = [
                                                            ...matrix,
                                                        ]
                                                        newMatrix =
                                                            newMatrix.map(
                                                                (r, rIdx) =>
                                                                    r.map(
                                                                        (
                                                                            c,
                                                                            cIdx,
                                                                        ) =>
                                                                            rIdx ===
                                                                                row &&
                                                                            cIdx ===
                                                                                col
                                                                                ? e
                                                                                : c,
                                                                    ),
                                                            )
                                                        dispatch(
                                                            updateNodeParameter(
                                                                {
                                                                    id: nodeProps.id,
                                                                    parameter: {
                                                                        name: "matrix",
                                                                        value: newMatrix,
                                                                    },
                                                                },
                                                            ),
                                                        )
                                                    }}
                                                />
                                            )
                                        })
                                })
                                .flat()}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Matrix
