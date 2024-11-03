import { Refinement } from '../pages/Refinement';

export enum Destination{
    Auth,
    Main, 
    UserSettings,
    Meetings,
    Backlog,
    Refinement
}

export const destinationPaths = {
    [Destination.Auth]: "/",
    [Destination.Main]: "/main/",
    [Destination.UserSettings]: "/main/settings",
    [Destination.Meetings]: '/main/meetings',
    [Destination.Backlog]: '/main/backlog',
    [Destination.Refinement]: '/main/refinement',
    default: () => ""
}