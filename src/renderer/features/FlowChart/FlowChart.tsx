import ReactFlow, {
    Background,
    BackgroundVariant, // Controls,
    // useEdgesState,
    useNodesState,
} from "reactflow"

import { useSelector } from "../../store/store"
import StartNode from "./components/StartNode/StartNode"

const nodeTypes = {
    start: StartNode,
}

const FlowChart = () => {
    const nodeData = useSelector((state) => state.workflow.nodes)
    const [nodes, setNodes, onNodesChange] = useNodesState(nodeData)
    //   const [edges, setEdges, onEdgesChange] = useEdgesState();

    return (
        <section className="flex h-full w-full">
            <ReactFlow
                proOptions={{ hideAttribution: true }}
                nodes={nodes}
                nodeTypes={nodeTypes}
            >
                <Background variant={BackgroundVariant.Dots} />
                {/* <Controls position="bottom-right" showFitView={false} /> */}
            </ReactFlow>
        </section>
    )
}

export default FlowChart
