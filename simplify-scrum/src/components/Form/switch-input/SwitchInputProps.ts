import { ValidationResult } from "../shared/SharedProps"

export interface SwitchInputProps{
    tooltipContent?: string  
    className?: string
    validation?: ValidationResult
    icon?: string 
    disabled?: boolean
    readonly?: boolean
    placeholder?: string
    isChecked: boolean
    changeValue: (newValue: boolean) => void
}