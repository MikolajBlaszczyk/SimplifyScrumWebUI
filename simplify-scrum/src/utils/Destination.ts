
export enum Destination{
    Auth,
    Main, 
    UserSettings,
}

export const destinationPaths = {
    [Destination.Auth]: "",
    [Destination.Main]: "main/",
    [Destination.UserSettings]: "user/",
    default: () => ""
}