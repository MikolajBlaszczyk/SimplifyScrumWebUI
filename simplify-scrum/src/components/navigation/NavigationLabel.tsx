
interface NavigationLabelProps {
    title: string
}

export function NavigationLabel({title}: NavigationLabelProps){
    return (
        <div className="navigation-label w-100  mb-2">
            <h6>{title}</h6>
        </div>
    )
}