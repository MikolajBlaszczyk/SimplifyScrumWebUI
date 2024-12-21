export enum Style{
    Filled,
    Outlined,
    Borderless,
    Circle
}

export enum Role {
    Normal,
    Primary,
    Cancel,
    Destructive
}

export enum Size {
    Small,
    Medium,
    Large,
    XLarge
}


export const styleClasses = {
    [Style.Filled]: 's-filled',
    [Style.Outlined]: 's-outlined',
    [Style.Borderless]: 's-borderless',
    [Style.Circle]: 's-circle'
}

export const roleClasses = {
    [Role.Normal]: 's-normal',
    [Role.Primary]: 's-primary',
    [Role.Cancel]: 's-cancel',
    [Role.Destructive]: 's-destructive'
}

export const sizeClasses = {
    [Size.Small]: 's-small',
    [Size.Medium]: 's-p',
    [Size.Large]: 's-h6',
    [Size.XLarge]: 's-h5'
}


export interface ButtonProps{
    autoadvance?: boolean,
    style?: Style,
    role?: Role,
    size?: Size,
    title?: string,
    icon?: string
    className?: string,
    disabled?: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>  
}

