import {
    Node,
    NodeBaseFunctionParameters,
    NodeParameterTypesEnum,
    NodeTypesEnum,
} from "../../../data/node.interface"

/* eslint-disable @typescript-eslint/no-empty-function */
const input = async () => {}

type InputArgs = NodeBaseFunctionParameters;

const node: Node<InputArgs> = {
    init: () => input(),
    name: "input",
    label: "Input",
    type: NodeTypesEnum.IO,
    description: "Input",
    parameters: [
        {
            label: "Previous node",
            type: NodeParameterTypesEnum.INPUT,
            name: "previous",
            description: "previous",
        },
        {
            label: "Output",
            type: NodeParameterTypesEnum.OUTPUT,
            name: "output",
            description: "Output",
        },
    ],
}

module.exports = node
