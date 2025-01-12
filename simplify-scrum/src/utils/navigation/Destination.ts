
export enum Destination{
    Auth,
    Main, 
    UserSettings,
    Meetings,
    Backlog,
    Refinement,
    Planning,
    Retrospective,
    Daily,
    Admin,
    Start
}

export const  breadcrumbValues: { [key in Destination]: string } = {
    [Destination.Auth]: 'Login',
    [Destination.Main]: 'Info Center',
    [Destination.UserSettings]: 'Settings',
    [Destination.Meetings]: 'Meeting Center',
    [Destination.Backlog]: 'Backlog',
    [Destination.Refinement]: 'Refinement',
    [Destination.Planning]: 'Planning',
    [Destination.Retrospective]: 'Retrospective',
    [Destination.Daily]: 'Daily',
    [Destination.Admin]: 'Admin',
    [Destination.Start]: 'Start'
}