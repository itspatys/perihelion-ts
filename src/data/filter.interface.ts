export interface FilterParameterOptions {
    label: string
    value: string | number
}

export interface FilterParameter {
    label: string
    type: "number" | "array" | "enum"
    description: string
    default: number
    options?: FilterParameterOptions[]
    range?: [number, number]
    step?: number
}

export interface Filter<T = object> {
    init: (filePath: string, args: T) => Promise<void>
    label: string
    type: string
    subtype: string
    description: string
    parameters?: FilterParameter[]
}
