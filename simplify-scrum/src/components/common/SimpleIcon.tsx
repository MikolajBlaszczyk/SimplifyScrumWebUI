import { fontClasses, Fonts } from "../../utils/UtilsIndex"

interface Props {
    icon: string
    font: Fonts
}

export function SimpleIcon({icon, font}: Props){
    return( 
        <div className="d-flex justify-start s-icon m-1">
            <i className={`bi ${icon} ${fontClasses[font]}`}></i>
        </div>
    )
}