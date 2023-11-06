import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
} from "@nextui-org/react"
import { Play } from "@styled-icons/fa-solid/Play"
import { Handle, Position } from "reactflow"

const StartNode = () => {
    return (
        <Card className="max-w-xs">
            <CardHeader>Start</CardHeader>
            <Divider />
            <CardBody>
                <Play className="text-success-500" size="32" />
            </CardBody>
            <Divider />
            <CardFooter>Connect your next nodes to this one</CardFooter>
            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3"
                id="a"
            />
        </Card>
    )
}

export default StartNode
