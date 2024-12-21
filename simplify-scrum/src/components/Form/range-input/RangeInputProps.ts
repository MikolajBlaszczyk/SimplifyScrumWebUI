import { ValidationResult } from "../shared/SharedProps"

export interface RangeInputProps {
    tooltipContent?: string  
    validation?: ValidationResult
    icon?: string 
    disabled?: boolean
    className?: string
    placeholder?: string
    minValue: number,
    maxValue: number,
    value: number,
    onValueChange: (newValue: number) => void
}