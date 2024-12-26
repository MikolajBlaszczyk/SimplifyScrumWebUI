import { ValidationResult } from "../shared/SharedProps"




export interface MultiTextInputProps{
    tooltipContent?: string  
    className?: string
    validation?: ValidationResult
    icon?: string 
    disabled?: boolean
    readonly?: boolean
    placeholder?: string
    value: string
    changeValue: (newValue: string) => void
} 
