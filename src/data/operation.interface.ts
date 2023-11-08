export interface OperationParameterOptions {
    name: string
    label?: string
    value: string | number
}

export interface OperationParameter {
    label: string
    name: string
    type: "number" | "array" | "enum" | "input" | "output"
    description: string
    default: number | string
    options?: OperationParameterOptions[]
    range?: [number, number]
    step?: number
}

export interface Operation<T = object> {
    init: (filePath: string, args: T) => Promise<void>
    name: string
    label: string
    type: "filter" | "math" | "transformation" | "input-output"
    subtype: string
    description: string
    parameters?: OperationParameter[]
}
