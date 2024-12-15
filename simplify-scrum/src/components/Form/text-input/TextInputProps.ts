
export enum TextType{
    Text,
    Email,
    Password
}

export interface ValidationResult{
    message: string,
    isValid: boolean
}


export interface TextInputProps{
    tooltipContent?: string  
    validation?: ValidationResult
    icon?: string 
    disabled?: boolean
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