import "../../assets/styles/StyleIndex.scss";
import { NavigationButton } from "./NavigationButton";
import { Offcanvas } from "./Offcanvas";




export default function NavigationBar(){

    return(
        <nav className="navbar s-navbar bg-dark">
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