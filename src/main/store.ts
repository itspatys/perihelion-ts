import { Node } from "@reactflow/core"
import Store from "electron-store"
import { Edge } from "reactflow"

import { NodeData } from "../data/configuration-file.interface"

export enum StoreValues {
    workspacePath = "workspacePath",
    edges = "edges",
    nodes = "nodes",
}

type StoreType = {
    nodes: Node<NodeData>[]
    edges: Edge[]
    workspacePath: string
}

export const store = new Store<StoreType>({})
