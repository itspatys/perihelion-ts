import { Node, NodeBaseFunctionParameters, NodeParameterTypesEnum, NodeTypesEnum } from "../../../data/node.interface";
import { loadImg, saveImg } from "../../utils/img.util";


const output = async (args: InputArgs) => {
    const mat = await loadImg(args.inputFilePath[0])
    return saveImg(mat, args.outputFilePath[0])
}

type InputArgs = NodeBaseFunctionParameters

const node: Node<InputArgs> = {
    init: (args: InputArgs) => output(args),
    name: "output",
    label: "Output",
    type: NodeTypesEnum.IO,
    description: "Output",
    parameters: [
        {
            label: "Input",
            type: NodeParameterTypesEnum.INPUT,
            name: "input",
            description: "Input",
        },
    ],
}

module.exports = node