import { Placeholder } from '../Placeholder';
export enum CardColor {
    Primary,
    Secondary,
    Accent,
    DarkInput
}

export const cardColors = {
    [CardColor.Primary]: "s-bg-primary",
    [CardColor.Secondary]: "s-bg-secondary",
    [CardColor.Accent]: "s-bg-accent",
    [CardColor.DarkInput]: "s-bg-dark-input"
}

export interface CardProps {
    title: string
    icon: string
    content: any
    className?: string
    color?: CardColor
    placeholder?: boolean
}

export function Card({icon, title, content, color, placeholder, className}: CardProps) { 

    const cardColor = cardColors[color ?? CardColor.Primary]

    if(placeholder == true){
        return (
            <div className={"s-card d-flex flex-column align-items-center justify-content-center pt-4 overflow-hidden " + cardColor}>
                <Placeholder />
            </div>
        )
    }

    return ( 
        <div className={"s-card d-flex flex-column align-items-center pt-4 overflow-hidden " + cardColor + " " + className}>
                <div className='d-flex justify-content-center align-items-center card-icon-div border-bottom'>
                    <i className={"bi s-h2 " + icon}></i>
                </div>
               
                <h4 className="mt-4">{title}</h4>
                <h6 className="w-100 h-100 d-flex flex-column align-items-center justify-content-start p-3">
                    {content}
                </h6>
        </div>
    )
}