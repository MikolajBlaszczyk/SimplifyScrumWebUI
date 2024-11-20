import { SelectItem, SimpleSelectionInput } from "../../../components/ComponentsIndex"
import { Team } from "../../../data/CommonDataIndex"

interface TextProps{
    icon: string,
    label: string,
    value: string,
}
export function UserTextSetting({label, value, icon}:TextProps){

    return(
        <div className="d-flex align-items-center mb-1">
            <i className={`bi ${icon} s-h5`}></i>
            <div className="ms-2 d-flex justify-content-between w-100 align-items-center border-bottom">
                <h6 className="m-0">
                        {label}
                </h6> 
                <p className="m-0">
                    {value}
                </p> 
            </div>
        </div>
    )
}

