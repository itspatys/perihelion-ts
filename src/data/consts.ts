import { NodeStatus, NodeType } from "./configuration-file.interface"

export const CONFIG_FILE_EXT = "json"
export const CONFIG_FILE_NAME = `config.${CONFIG_FILE_EXT}`

export const NODE_START = {
    id: "start",
    type: NodeType.START,
    data: { status: NodeStatus.PENDING },
    position: { x: 0, y: 0 },
}
