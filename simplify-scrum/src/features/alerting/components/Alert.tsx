import { MouseEvent, useContext } from "react"
import { Button, SimpleButton } from "../../../components/ComponentsIndex"
import { useAlerting } from "../../../hooks/HooksIndex"
import { Fonts } from "../../../utils/UtilsIndex"
import { Color } from '../../../components/common/SimpleButton';

export enum AlertType{ 
    Primary,
    Secondary,
    Success,
    Danger, 
    Warning,
    Info, 
    Dark,
    Light
}


const alertClasses = {
    [AlertType.Primary]: 'alert-primary',
    [AlertType.Secondary]: 'alert-secondary',
    [AlertType.Success]: 'alert-success',
    [AlertType.Danger]: 'alert-danger s-text-danger',
    [AlertType.Warning]: 'alert-warning s-bg-warning s-text-warning',
    [AlertType.Info]: 'alert-info s-bg-info s-text-danger',
    [AlertType.Light]: 'alert-light',
    [AlertType.Dark]: 'alert-dark'
}


interface Props {
    type: AlertType
    content: string
    title: string
    symbol?: Symbol
}

export function Alert({type, title, content, symbol}: Props){ 
    const {setAlerting} = useAlerting()

    const dismissAlert = () => {
        setAlerting({showAlert: false, alertComponent: <></>})
    }

    return(
        <>
            <div className="backdrop"></div>
            <div className={`s-alert ${alertClasses[type]}  border border-1 rounded p-3`}>
                <div className={` d-flex flex-column`}>
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <h4 className="mb-0">
                            {title}
                        </h4>
                        
                        <SimpleButton 
                            type={Button.Borderless} 
                            title={""}
                            icon="bi-x-lg" 
                            font={Fonts.H5}
                            fontColor={Color.Danger}
                            onClick={dismissAlert} />
                
                    </div>
                    <div className="d-flex mt-2 ps-1">
                        <h6>
                            {content}
                        </h6>    
                    </div>
                    
                    
                </div>
            </div>
        </>
        
    )
}