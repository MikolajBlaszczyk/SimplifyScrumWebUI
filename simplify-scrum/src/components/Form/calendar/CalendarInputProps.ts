import { ValidationResult } from "../shared/SharedProps"

export interface CalendarInputProps{
    tooltipContent?: string  
    validation?: ValidationResult
    icon?: string 
    disabled?: boolean
    className?: string
    placeholder?: string
    value: Date
    onValueChange: (newValue: string) => void
   
} 