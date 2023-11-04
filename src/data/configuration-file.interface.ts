import { Node } from "@reactflow/core"
import { Edge } from "reactflow"

export enum NodeStatus {
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}

export interface NodeData  {
    status: NodeStatus
}

export interface ConfigurationFile {
    nodes: Node<NodeData>[]
    edges: Edge[]
    workspacePath: string
}