
export enum Destination{
    Auth,
    Main, 
    UserSettings,
    Meetings
}

export const destinationPaths = {
    [Destination.Auth]: "/",
    [Destination.Main]: "/main/",
    [Destination.UserSettings]: "/main/settings",
    [Destination.Meetings]: '/main/meetings',
    default: () => ""
}