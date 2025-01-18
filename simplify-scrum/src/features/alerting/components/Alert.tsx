import { MouseEvent, useContext } from "react"
import { Button } from "../../../components/ComponentsIndex"
import { useAlerting } from "../../../hooks/HooksIndex"
import { Fonts } from "../../../utils/UtilsIndex"
import { Role, Size, Style } from "../../../components/common/button/ButtonProps"

export enum AlertStyle{ 
    Success,
    Danger, 
    Warning,
    Info, 
    Primary,
}

export enum AlertType {
    Allow,
    Confirm
}


const alertClasses = {
    [AlertStyle.Success]: 's-alert-success',
    [AlertStyle.Danger]: 's-alert-danger',
    [AlertStyle.Warning]: 's-alert-warning',
    [AlertStyle.Info]: 's-alert-info',
    [AlertStyle.Primary]: 's-alert-primary',
}


interface Props {
    style: AlertStyle
    type: AlertType
    content: string
    title: string
}

export function Alert({style, title, content, type}: Props){ 
    const {setAlerting} = useAlerting()

    const dismissAlert = () => {
        setAlerting({showAlert: false, alertComponent: <></>})
    }

    let alertStyle = alertClasses[style]

    return(
        <>
            <div className="backdrop"></div>
            <div style={{marginTop: "100px"}} className={` s-alert  position-absolute top-0 start-50 translate-middle-x overflow-hidden rounded  ${alertStyle}`}>
                <div className={`d-flex flex-column`}>
                    <div className={"d-flex flex-column w-100 h-auto align-items-center s-alert-header justify-content-center pt-2  " + alertStyle}>


                        <h4 className="mb-0 text-center h-100 p-2 ">
                            {title}
                        </h4>
                    </div>
                    
                    <div className="d-flex flex-column align-items-center  mb-3 mt-2 ps-4 pe-4 ">
                     
                        <p className=" mt-2 text-center">
                            {content}
                        </p>    
                    </div>
                    
                    <div className="d-flex  ps-4 pe-4 pb-4 ms-4 me-4">
                        {type == AlertType.Confirm  
                            
                            ?

                            <Button 
                                className="w-100 s-alert-button"
                                title="Confirm"
                                style={Style.Filled}
                                size={Size.Large}
                                role={Role.Primary}
                                onClick={() => {dismissAlert()}} />

                            : 

                            <>
                                <Button 
                                    className="w-50 s-alert-button-deny"
                                    title="Deny"
                                    style={Style.Filled}
                                    size={Size.Medium}
                                    role={Role.Primary}
                                    onClick={() => {dismissAlert()}} />
                                <Button 
                                    className="w-50 ms-2 s-alert-button-allow"
                                    title="Allow"
                                    style={Style.Filled}
                                    size={Size.Medium}
                                    role={Role.Primary}
                                    onClick={() => {dismissAlert()}} />
                            </>
                        }
                        
                    </div>
                </div>
            </div>
        </>
        
    )
}