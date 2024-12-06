import { read } from "fs"
import { BgColor, bgColorClasses, FontColor, fontColorClasses, Fonts } from "../../utils/UtilsIndex"
import exp from "constants"
import { SimpleIcon } from "../ComponentsIndex"


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
    icon?: string
    value: string
    changeValue: (newValue: React.ChangeEvent<HTMLInputElement>) => void
}

export function SimpleTextInput({icon, label, placeholder, value, changeValue, disabled, readonly, type, color, fontcolor, alignment}: Props){

    let bgColor = bgColorClasses[color!] ?? bgColorClasses.default
    let bgInputColor = bgColorClasses[color == BgColor.Dark ? BgColor.DarkSubtle : color!] ?? bgColorClasses.default
    let fontColor = fontColorClasses[fontcolor!] ?? fontColorClasses.default
    let alignmentStyle = alignmentClasses[alignment!] ?? alignmentClasses.default


    return(
        <div className={`d-flex ps-1 pe-2 border h-100 rounded overflow-hidden align-items-center justify-content-between w-100 ${bgColor}`}>
            {icon && (
                <SimpleIcon 
                    icon={`bi ${icon}`} 
                    font={Fonts.H5} 
                />
            )}
            <h6 className="m-0 user-select-none me-2 h-100 d-flex align-items-center">
                {label}
            </h6> 
            <input 
                type={textTypes[type!] ?? textTypes.default}
                className={`border-0 d-flex w-100 h-100 ${bgInputColor} ${fontColor} ${alignmentStyle}`}
                value={value} 
                onChange={e => {changeValue(e)}}
                placeholder={placeholder || undefined}
                disabled={disabled || undefined}
                readOnly={readonly || undefined}
            />
        </div>
    )
}