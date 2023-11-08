import { Node as ReactFlowNode } from "@reactflow/core"
import { Edge } from "reactflow"

import { OperationParameterOptions } from "./operation.interface"

export enum NodeStatus {
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
}

export interface NodeData {
    status: NodeStatus
    operation?: {
        name: string
        parameters?: OperationParameterOptions[]
    }
}

export type NodeTypes = "start" | "operation"

export type Node = ReactFlowNode<NodeData, NodeTypes>

export interface ConfigurationFile {
    nodes: Node[]
    edges: Edge[]
    workspacePath: string
}
