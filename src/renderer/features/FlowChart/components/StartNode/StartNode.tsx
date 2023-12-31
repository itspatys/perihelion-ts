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
        <Card className="w-[128px]">
            <CardHeader className="h-[32px]">Start</CardHeader>
            <Divider />
            <CardBody className="h-[95px]">
                <Play className="text-success-500" size="48" />
            </CardBody>
            <Divider />
            <CardFooter className="h-[32px]">Starting node</CardFooter>
            <Handle
                type="source"
                position={Position.Right}
                className="w-3.5 h-3.5"
                id="a"
            />
        </Card>
    )
}

export default StartNode
