import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
} from "@nextui-org/react"
import { Handle, Position } from "reactflow"

const CustomNode = () => {
    return (
        <Card>
            <CardHeader>Custom node</CardHeader>
            <Divider />
            <CardBody>Custom node</CardBody>
            <Divider />
            <CardFooter>Bottom text</CardFooter>
            <Handle
                type="source"
                position={Position.Right}
                className="w-3.5 h-3.5"
                id="a"
            />
            <Handle
                type="target"
                position={Position.Left}
                className="w-3.5 h-3.5"
                id="a"
            />
        </Card>
    )
}

export default CustomNode
