import { ValidationResult } from "../shared/SharedProps"
import { SelectItem } from "./SelectionInputProps"



export interface MultiSelectionInputProps{
    tooltipContent?: string  
    validation?: ValidationResult
    icon?: string 
    disabled?: boolean
    className?: string
    placeholder?: string
    selectedValues: SelectItem[]
    onSelectedValuesChange: (value: SelectItem[]) => void
    options: SelectItem[]
} 