import { read } from "fs"

export enum TextType{
    Text,
    Password,
    Email
} 

const textTypes = {
    [TextType.Text]: 'text',
    [TextType.Email]: 'email',
    [TextType.Password]: 'password',
    default: 'text'
}

interface Props {
    label?: string
    disabled?: boolean
    readonly? :boolean
    type?: TextType
    placeholder?: string
    value: string
    changeValue: (newValue: React.ChangeEvent<HTMLInputElement>) => void
}

export function SimpleTextInput({label, placeholder, value, changeValue, disabled, readonly, type}: Props){




    return(
        <div className="input-group input-group-sm  s-bg-background">
            {label && <label className="input-group-text bg-transparent s-input-label border-0">{label}</label>}
            <input 
                type={textTypes[type!] ?? textTypes.default}
                className="form-control bg-transparent border-0 s-input"
                value={value} 
                onChange={changeValue}
                placeholder={placeholder || undefined}
                disabled={disabled || undefined}
                readOnly={readonly || undefined}/>
        </div>
    )
}