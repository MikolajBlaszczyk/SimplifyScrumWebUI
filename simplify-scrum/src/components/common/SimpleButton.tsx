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

export enum Fonts {
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    P,
    Small
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

const fontClasses = {
    [Fonts.H1]: "s-h1",
    [Fonts.H2]: "s-h2",
    [Fonts.H3]: "s-h3",
    [Fonts.H4]: "s-h4",
    [Fonts.H5]: "s-h5",
    [Fonts.H6]: "s-h6",
    [Fonts.P]: "s-p",
    [Fonts.Small]: "s-small"
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