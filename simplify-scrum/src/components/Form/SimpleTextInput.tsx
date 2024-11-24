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


    return(
        <div className={`d-flex justify-content-between w-100 mb-1  ${bgColorClasses[color!] ?? bgColorClasses.default}`}>
                

            <SimpleIcon 
                icon={`bi ${icon}`} 
                font={Fonts.H5} />
                
                <div className="ms-2 d-flex  justify-content-between w-100 align-items-start">
                    <h6 className="m-0 mt-1  mb-2 user-select-none me-2">
                            {label}
                    </h6> 
                    <input 
                        type={textTypes[type!] ?? textTypes.default}
                        className={`border rounded s-input  p-1  d-flex s-min-w-80 ${bgColorClasses[color!] ?? bgColorClasses.default} ${fontColorClasses[fontcolor!] ?? fontColorClasses.default} ${alignmentClasses[alignment!] ?? alignmentClasses.default}`}
                        value={value} 
                        onChange={e => {changeValue(e)}}
                        placeholder={placeholder || undefined}
                        disabled={disabled || undefined}
                        readOnly={readonly || undefined}/>
         
                </div>
               
           
        </div>
    )
}