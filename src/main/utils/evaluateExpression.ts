export const evaluateExpression = (expression: string): number => {
    try {
        const result = Function(`return ${expression}`)()
        if (typeof result === "number" && !isNaN(result)) {
            return result
        } else {
            throw new Error(
                "Couldn't evaluate expression in matrix: " + expression,
            )
        }
    } catch (error) {
        throw new Error(
            "Couldn't evaluate expression in matrix: " + expression + error,
        )
    }
}
