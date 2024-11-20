import { fontClasses, Fonts } from "../../utils/UtilsIndex"

interface Props {
    icon: string
    font: Fonts
}

export function SimpleIcon({icon, font}: Props){
    return( 
        <div className="d-flex s-icon">
            <i className={`bi ${icon} ${fontClasses[font]}`}></i>
        </div>
    )
}