import { fontClasses, Fonts } from "../../utils/UtilsIndex"

export enum Button{
    Primary,
    Secondary,
    Success,
    Danger,
    Warning,
    Info,
    Transparent,
    Borderless,
    Bordered,
    Underlined,
    Dark
}



export enum Color{ 
    Dark,
    Light,
    Danger 
}



interface Props {
    type: Button,  
    minWidth?: string,
    title: string,
    icon?: string
    iconOnTheRight?: boolean
    fontColor?: Color
    font?: Fonts,
    onClick: React.MouseEventHandler<HTMLButtonElement>  
}

const typeClasses = {
    [Button.Primary]: "btn-primary",
    [Button.Secondary]: "btn-secondary",
    [Button.Success]: "btn-success",
    [Button.Danger]: "btn-danger",
    [Button.Warning]: "btn-warning",
    [Button.Info]: "btn-info",
    [Button.Transparent]: "btn-outline-dark",
    [Button.Borderless]: "btn-outline-dark border-0",
    [Button.Bordered]: "btn-outline-dark",
    [Button.Dark]: 's-bg-text',
    [Button.Underlined]: 's-button-underlined'
    
}

const colorClasses = {
    [Color.Dark]: "s-color",
    [Color.Light]: "s-color-background",
    [Color.Danger]: "s-text-danger"
}



export function SimpleButton({title, icon, iconOnTheRight, onClick, type, font, fontColor, minWidth}: Props){
    if(iconOnTheRight == undefined){
        iconOnTheRight = true
    }

    
    
    return(
        <button
            type="button"
            className={`btn  m-0 ${typeClasses[type]} ${colorClasses[fontColor!] ?? 's-color'} ${fontClasses[font!] ?? 'h6'} s-button`} 
            onClick={onClick}
            style={{minWidth: minWidth ?? ''}}>
            {!iconOnTheRight && icon != null && (<i className={`bi ${icon} me-2`}></i>)}
            {title} 
            {iconOnTheRight && icon != null && (<i className={`bi ${icon} ms-2`}></i>)}
        </button>
    )
}