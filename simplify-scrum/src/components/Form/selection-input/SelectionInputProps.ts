import { ValidationResult } from "../shared/SharedProps"


export interface SelectItem {
    value: string,
    description: string
}

export interface SelectionInputProps{
    tooltipContent?: string  
    validation?: ValidationResult
    icon?: string 
    disabled?: boolean
    className?: string
    placeholder?: string
    selectedValue?: string
    onSelectedValueChange: (value: string) => void
    options: SelectItem[]
} 