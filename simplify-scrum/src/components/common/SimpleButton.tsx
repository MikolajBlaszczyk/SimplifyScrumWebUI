import { fontClasses, Fonts } from "../../utils/Index"

export enum Button{
    Primary,
    Secondary,
    Success,
    Danger,
    Warning,
    Info,
    Transparent,
    Underlined,
    Dark
}



export enum Color{ 
    Dark,
    Light
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
    [Button.Dark]: 's-bg-text',
    [Button.Underlined]: 's-button-underlined'
    
}

const colorClasses = {
    [Color.Dark]: "s-color",
    [Color.Light]: "s-color-background"
}



export function SimpleButton({title, icon, iconOnTheRight, onClick, type, font, fontColor, minWidth}: Props){
    if(iconOnTheRight == undefined){
        iconOnTheRight = true
    }

    
    
    return(
        <button
            type="button"
            className={`btn ${typeClasses[type]} ${colorClasses[fontColor!] ?? 's-color'} ${fontClasses[font!] ?? 'h6'} s-button`} 
            onClick={onClick}
            style={{minWidth: minWidth ?? ''}}>
            {!iconOnTheRight && icon != null && (<i className={`bi ${icon} me-2`}></i>)}
            {title} 
            {iconOnTheRight && icon != null && (<i className={`bi ${icon}`}></i>)}
        </button>
    )
}