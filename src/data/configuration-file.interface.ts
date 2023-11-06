import { Node } from "@reactflow/core"
import { Edge } from "reactflow"

export enum NodeStatus {
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
}

export interface NodeData {
    status: NodeStatus
}

export type NodeTypes = "start" | "operation"

export interface ConfigurationFile {
    nodes: Node<NodeData, NodeTypes>[]
    edges: Edge[]
    workspacePath: string
}
