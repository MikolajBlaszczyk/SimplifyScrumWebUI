import exp from "constants"

export interface ValidationResult{
    message: string,
    isValid: boolean
}


export interface TextState {
    value: string
    validation: ValidationResult
}

export interface NumberState {
    value: number
    validation: ValidationResult
}

export interface CalendarState {
    date: Date,
    validationResult: ValidationResult
}

export interface SelectState {
    value?: string
    validation: ValidationResult
}

export interface CheckState{
    checked: boolean
    validation: ValidationResult
}