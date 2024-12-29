import { ValidationResult } from "../shared/SharedProps"

export interface NumberInputProps{
    tooltipContent?: string  
    validation?: ValidationResult
    icon?: string 
    min?: number
    disabled?: boolean
    className?: string
    readonly?: boolean
    placeholder?: string
    value: string
    changeValue: (newValue: string) => void
} 