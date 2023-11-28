export const evaluateExpression = (expression: string): number => {
    const validInputRegex = /^[0-9+\-*/().\s]+$/
    if (!validInputRegex.test(expression)) {
        throw new Error("Invalid characters in expression: " + expression)
    }
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
