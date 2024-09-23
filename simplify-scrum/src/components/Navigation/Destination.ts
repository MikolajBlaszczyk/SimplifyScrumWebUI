
export enum Destination{
    Login,
    SignIn,
    Main, 
    UserSettings,
}

export const destinationPaths = {
    [Destination.Login]: "",
    [Destination.SignIn]: "signin/",
    [Destination.Main]: "main/",
    [Destination.UserSettings]: "user/",
    default: () => ""
}