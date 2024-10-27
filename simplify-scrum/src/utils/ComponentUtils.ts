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

export const fontClasses = {
    [Fonts.H1]: "s-h1",
    [Fonts.H2]: "s-h2",
    [Fonts.H3]: "s-h3",
    [Fonts.H4]: "s-h4",
    [Fonts.H5]: "s-h5",
    [Fonts.H6]: "s-h6",
    [Fonts.P]: "s-p",
    [Fonts.Small]: "s-small",
    default: "s-p"
}

export enum BgColor {
    Light, 
    Dark,
    DarkForm,
    Transparent
}



export const bgColorClasses = {   
    [BgColor.Light]: 's-bg-background',
    [BgColor.Dark]: 's-bg-dark',
    [BgColor.DarkForm]: 'bg-dark',
    [BgColor.Transparent]: 's-bg-transparent',
    default: 's-bg-background'
}

export enum FontColor {
    Light,
    Dark
}

export const fontColorClasses = {   
    [BgColor.Light]: 's-f-dark',
    [BgColor.Dark]: 's-f-light',
    default: 's-f-dark'
}