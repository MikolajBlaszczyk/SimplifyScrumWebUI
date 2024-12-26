import exp from "constants"

export interface ValidationResult{
    message: string,
    isValid: boolean
}


export interface TextState {
    value: string
    validation: ValidationResult
}

export interface SelectState {
    value?: string
    validation: ValidationResult
}

export interface CheckState{
    checked: boolean
    validation: ValidationResult
}