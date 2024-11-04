
export enum Destination{
    Auth,
    Main, 
    UserSettings,
    Meetings,
    Backlog,
    Refinement,
    Planning
}

export const destinationPaths = {
    [Destination.Auth]: "/",
    [Destination.Main]: "/main/",
    [Destination.UserSettings]: "/main/settings",
    [Destination.Meetings]: '/main/meetings',
    [Destination.Backlog]: '/main/backlog',
    [Destination.Refinement]: '/main/refinement',
    [Destination.Planning]: '/main/planning',
    default: () => ""
}