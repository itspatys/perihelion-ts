import ReactFlow, { useEdgesState, useNodesState } from "reactflow"

const FlowChart = () => {
    //     const [nodes, setNodes, onNodesChange] = useNodesState();
    //   const [edges, setEdges, onEdgesChange] = useEdgesState();

    return (
        <section className="flex h-full">
            <ReactFlow></ReactFlow>
        </section>
    )
}

export default FlowChart
