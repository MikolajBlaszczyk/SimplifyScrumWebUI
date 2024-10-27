import React, {useContext} from "react";
import { Global, UserContext } from "../../context/Index";
import "../../assets/styles/StyleIndex.scss";
import { NavigationButton } from "./NavigationButton";
import { Offcanvas } from "./Offcanvas";




export default function NavigationBar(){
    const { settings } = useContext(UserContext) as Global
  

 

    if(settings == null)
        throw new Error("Global settings are not set")

    return(
        <nav className="navbar s-navbar ">
            <div className="container-fluid">
                
                <h5>
                    Sprint no. 1
                </h5>

                <NavigationButton 
                    icon="bi-list"
                    offcanvas={true}
                    onClick={() => {}} />      

               
               <Offcanvas />
                
            </div>
        </nav>
    )
}