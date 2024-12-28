import { ValidationResult } from "../shared/SharedProps"

export enum TextType{
    Text,
    Email,
    Password
}




export interface TextInputProps{
    buttonVisible?: boolean
    tooltipContent?: string  
    validation?: ValidationResult
    icon?: string 
    disabled?: boolean
    className?: string
    readonly?: boolean
    textType?: TextType
    placeholder?: string
    value: string
    changeValue: (newValue: string) => void
} 


export const textTypes = {
    [TextType.Text]: 'text',
    [TextType.Email]: 'email',
    [TextType.Password]: 'password',
}