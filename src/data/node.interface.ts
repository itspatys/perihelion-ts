import { NonEmptyArray } from "../main/utils/utils.interface";


/**
 * Enumeration of parameter types for nodes.
 * Helps protect against typos in parameter type references.
 * @enum {string}
 */
export enum NodeParameterTypesEnum {
    NUMBER = "number",
    ARRAY = "array",
    ENUM = "enum",
    INPUT = "input",
    OUTPUT = "output",
}

/**
 * Enumeration of node types.
 * Helps protect against typos in node type references.
 * @enum {string}
 */
export enum NodeTypesEnum {
    FILTER = "filter",
    MATH = "math",
    TRANSFORMATION = "transformation",
    IO = "input-output",
}

/**
 * Base interface for function parameters of a node.
 * Ensures exported functions have these parameters.
 * @interface
 */
export interface NodeBaseFunctionParameters {
    inputFilePath?: string[]
    outputFilePath?: string[]
}

/**
 * Interface for a generic node.
 * @interface
 * @template T - @extends NodeBaseFunctionParameters The type of parameters the node's init function takes.
 */
export interface Node<T extends NodeBaseFunctionParameters = object> {
    /**
     * Initializes the node with the specified parameters.
     * @param {T} args - The parameters required for node initialization.
     * @returns {Promise<void>} A Promise resolving when initialization is complete.
     */
    init: (args: T) => Promise<boolean>
    name: string
    label: string
    type: NodeTypesEnum
    subtype?: string
    description: string
    /**
     * For clarity of future users
     */
    parameters: NonEmptyArray<
        | NodeParameter
        | NodeIOParameter<
              NodeParameterTypesEnum.INPUT | NodeParameterTypesEnum.OUTPUT
          >
    >
}

/**
 * Interface for a node parameter.
 * @interface
 */
export interface NodeParameter {
    label: string
    name: string
    type: NodeParameterTypesEnum
    description: string
    default?: number | string
    options?: NodeParameterOptions[]
    range?: [number, number]
    step?: number
}

/**
 * Interface for options that a node parameter can have.
 * @interface
 */
export interface NodeParameterOptions {
    name: string
    label?: string
    value: string | number
}

/**
 * Interface for IO parameters of a node.
 * Enforces that IO parameters have just those types.
 * @interface
 * @template T - The type of the IO parameter, defaults to INPUT or OUTPUT.
 */
export interface NodeIOParameter<
    T = NodeParameterTypesEnum.INPUT | NodeParameterTypesEnum.OUTPUT,
> {
    label: string
    name: string
    type: T
    description: string
    default?: string
}