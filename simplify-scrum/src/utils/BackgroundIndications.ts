
export enum Indicator {
    Primary,
    Secondary,
    Success,
    Info,
    Warning, 
    Danger
} 



export const indicationClasses = {
    [Indicator.Primary]:'s-bg-primary',
    [Indicator.Secondary]:'s-bg-secondary',
    [Indicator.Success]:'s-bg-success',
    [Indicator.Info]:'s-bg-info',
    [Indicator.Warning]:'s-bg-warning',
    [Indicator.Danger]:'s-bg-danger' 
}