import { Destination } from "../UtilsIndex";

export const destinationPaths = {
    [Destination.Auth]: "/",
    [Destination.Main]: "/main/",
    [Destination.UserSettings]: "/main/settings",
    [Destination.Meetings]: '/main/meetings',
    [Destination.Backlog]: '/main/backlog',
    [Destination.Refinement]: '/main/refinement',
    [Destination.Planning]: '/main/planning',
    [Destination.Retrospective]: '/main/retrospective',
    [Destination.Daily]: '/main/daily',
    [Destination.Admin]: '/main/admin',
    default: () => ""
}