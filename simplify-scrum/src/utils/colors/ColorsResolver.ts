import { BgColor, IndicatorColor } from "../UtilsIndex";


export const bgColorClasses = {   
    [BgColor.Light]: 's-bg-background',
    [BgColor.Dark]: 'bg-dark',
    [BgColor.DarkForm]: 'bg-dark',
    [BgColor.Transparent]: 's-bg-transparent',
    default: 's-bg-background'
}

export const fontColorClasses = {   
    [BgColor.Light]: 's-f-dark',
    [BgColor.Dark]: 's-f-light',
    default: 's-f-dark'
}

export const indicationClasses = {
    [IndicatorColor.Primary]:'s-bg-primary',
    [IndicatorColor.Secondary]:'s-bg-secondary',
    [IndicatorColor.Success]:'s-bg-success',
    [IndicatorColor.Info]:'s-bg-info',
    [IndicatorColor.Warning]:'s-bg-warning',
    [IndicatorColor.Danger]:'s-bg-danger' 
}