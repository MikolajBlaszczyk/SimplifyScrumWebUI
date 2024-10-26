export enum Button{
    Primary,
    Secondary,
    Success,
    Danger,
    Warning,
    Info,
    Transparent
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

interface Props {
    type: Button,  
    minWidth?: string,
    title: string,
    icon?: string
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
    [Button.Transparent]: "btn-outline-dark"
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

export function SimpleButton({title, icon, onClick, type, font, minWidth}: Props){
   
    
    return(
        <button 
            type="button"
            className={`btn ${typeClasses[type]} ${fontClasses[font!] ?? 'h6'}`} 
            onClick={onClick}
            style={{minWidth: minWidth ?? ''}}>
            {title} 
            {icon != null && (<i className={`bi ${icon}`}></i>)}
        </button>
    )
}