import { NavigationButton } from "./NavigationButton";
import { Offcanvas } from "./Offcanvas";
import icon from '../../assets/img/Icon.png';
import { useNavigate } from "react-router-dom";
import { Destination } from "../../utils/UtilsIndex";
import { useState } from "react";
import { breadcrumbValues } from '../../utils/navigation/Destination';
import { useLoading } from "../../hooks/useContexts";



export default function NavigationBar(){
    const [breadcrumbValue, setBreadcrumbValue] = useState('Info Center')

    const breadCrumbChange = (destination: Destination) => {
        setBreadcrumbValue(breadcrumbValues[destination])
    }

    return(
        <nav className="navbar s-navbar  position-sticky top-0  z-index-sticky">
            <div className="s-logo-div d-flex  align-items-center ms-2">
                <img className=" img-fluid" style={{width: '40px'}} src={icon} alt="Simplify icon"/>

                <ol className="breadcrumb mb-0 ms-3">
                    <li className="breadcrumb-item active" aria-current="page">Simplify</li>
                    <li className="breadcrumb-item active" aria-current="page">{breadcrumbValue}</li>
                </ol>
            </div>



            <NavigationButton 
                className="me-2 navbar-button"
                icon="bi-list"
                offcanvas={true}
                onClick={() => {
                    
                }} />      

            
            <Offcanvas breadcrumbChange={breadCrumbChange} />
                
        </nav>
    )
}