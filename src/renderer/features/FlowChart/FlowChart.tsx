import ReactFlow, {
    Background,
    BackgroundVariant,
    Connection,
    EdgeMouseHandler,
    NodeChange,
    Viewport,
} from "reactflow"

import { useDispatch, useSelector } from "../../store/store"
import { setViewport } from "../../store/viewportSlice"
import { addEdge, deleteEdge, setNode } from "../../store/workflowSlice"
import OperationNode from "./components/OperationNode"
import StartNode from "./components/StartNode"

const nodeTypes = {
    start: StartNode,
    operation: OperationNode,
}

const FlowChart = () => {
    const dispatch = useDispatch()
    const nodes = useSelector((state) => state.workflow.nodes)
    const edges = useSelector((state) => state.workflow.edges)

    const onNodesChange = (changes: NodeChange[]) => {
        changes.forEach((change) => {
            dispatch(setNode(change))
        })
    }

    const onConnect = (connection: Connection) => {
        dispatch(addEdge(connection))
    }

    const onMove = (_: any, data: Viewport) => {
        dispatch(setViewport(data))
    }

    const onEdgeDoubleClick: EdgeMouseHandler = (_, edge) => {
        dispatch(deleteEdge(edge.id))
    }

    return (
        <section className="flex h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onConnect={onConnect}
                onMove={onMove}
                nodeTypes={nodeTypes}
                snapToGrid={true}
                snapGrid={[32, 32]}
                edgeUpdaterRadius={20}
                proOptions={{ hideAttribution: true }}
                onEdgeDoubleClick={onEdgeDoubleClick}
            >
                <Background variant={BackgroundVariant.Dots} gap={32} />
                {/* <Controls position="bottom-right" showFitView={false} /> */}
            </ReactFlow>
        </section>
    )
}

export default FlowChart
