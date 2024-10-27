import { read } from "fs"
import { BgColor, bgColorClasses, FontColor, fontColorClasses } from "../../utils/Index"
import exp from "constants"


export enum TextType{
    Text,
    Password,
    Email
} 

export enum Alignment {
    Start,
    End
}

const textTypes = {
    [TextType.Text]: 'text',
    [TextType.Email]: 'email',
    [TextType.Password]: 'password',
    default: 'text'
}

const alignmentClasses = {
    [Alignment.Start]: 'text-start',
    [Alignment.End]: 'text-end',
    default: 'text-start'
}

interface Props {
    label?: string
    disabled?: boolean
    readonly? :boolean
    type?: TextType
    color?: BgColor
    fontcolor?: FontColor
    alignment?: Alignment
    placeholder?: string
    value: string
    changeValue: (newValue: React.ChangeEvent<HTMLInputElement>) => void
}

export function SimpleTextInput({label, placeholder, value, changeValue, disabled, readonly, type, color, fontcolor, alignment}: Props){


    return(
        <div className={`input-group input-group-sm  ${bgColorClasses[color!] ?? bgColorClasses.default}`}>
            {label && <label className={`input-group-text bg-transparent s-input-label border-0 ${bgColorClasses[color!] ?? bgColorClasses.default} ${fontColorClasses[fontcolor!] ?? fontColorClasses.default}`}>{label}</label>}
            <input 
                type={textTypes[type!] ?? textTypes.default}
                className={`form-control border-0 s-input ${bgColorClasses[color!] ?? bgColorClasses.default} ${fontColorClasses[fontcolor!] ?? fontColorClasses.default} ${alignmentClasses[alignment!] ?? alignmentClasses.default}`}
                value={value} 
                onChange={changeValue}
                placeholder={placeholder || undefined}
                disabled={disabled || undefined}
                readOnly={readonly || undefined}/>
        </div>
    )
}