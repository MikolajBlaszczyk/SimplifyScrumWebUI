import { CardColor, cardColors, CardProps } from './Card';
import { Placeholder } from '../Placeholder';



export function MiniCard({icon, title, content, color, placeholder, className}: CardProps){
    
    const cardColor = cardColors[color ?? CardColor.Primary]

    if(placeholder == true){
        return (
            <div className={"s-card d-flex flex-column align-items-center justify-content-center pt-4 overflow-hidden " + cardColor}>
                <Placeholder />
            </div>
        )
    }

    return ( 
        <div className={"s-card-mini d-flex flex-column align-items-center pt-2 overflow-hidden " + cardColor + " " + className}>
                <div className='d-flex justify-content-center align-items-center card-icon-div border-bottom'>
                    <i className={"bi s-p " + icon}></i>
                </div>
                
                <h4 className="s-p mt-2">{title}</h4>
                <h6 className="w-100 h-100 d-flex flex-column align-items-center justify-content-start ">
                    {content}
                </h6>
        </div>
    )
  
}