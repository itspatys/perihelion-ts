export interface FilterParameter {
    label: string
    type: "number" | "array" | "enum"
    description: string
    default: number
    options?: string[]
    range?: [number, number]
    step?: number
}

export interface Filter<T=object> {
    init: (filePath: string, args: T) => Promise<void>
    label: string
    type: string
    subtype: string
    description: string
    parameters?: FilterParameter[]
}
