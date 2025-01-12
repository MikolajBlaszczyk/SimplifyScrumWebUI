import { MouseEvent } from "react";
import { Button, SimpleIcon } from "../../../components/ComponentsIndex";
import { useAlert, useModal } from "../../../hooks/HooksIndex";
import { useModalForm } from "../../../hooks/useContexts";
import { Fonts } from "../../../utils/UtilsIndex";
import { AlertStyle } from "../../alerting/components/Alert";
import ProjectEdit from "../../backlog/components/Items/Project/Edit/ProjectEdit";
import { Role, Size, Style } from "../../../components/common/button/ButtonProps";

export function StartProject(){
    const showModal = useModal()
    const showAlert = useAlert()

    const createNewProject = () => {
        showModal( 
            (<ProjectEdit  className={" h-100 w-100"}/>),
            "Project"
        )
    }

 

    return (
        <section className="bg-dark s-settings-section" style={{height: "45vh"}}>
            <div className="row d-flex h-100">
                <div className="col-6 border-end d-flex flex-column align-items-center justify-content-center">
                    <SimpleIcon 
                        icon={"bi-box-seam-fill"}
                        font={Fonts.H1}/>
                    

                    <Button 
                        className="mt-3"
                        title={"Create new project"}
                        role={Role.Primary}
                        size={Size.Large}
                        style={Style.Filled}
                        onClick={() => {createNewProject()}} />
                
                </div>
                <div className="col-6 d-flex flex-column align-items-center justify-content-center">
                    
                    
                    <SimpleIcon 
                            icon={"bi-file-earmark-fill"}
                            font={Fonts.H1}/>

                    <div className="mt-3 d-flex justify-content-center">
                        <h6 className="w-100 justify-content-center">
                            Click finish to start without project
                        </h6>
                    </div>
                  
                </div>
            </div>
        </section>
    )
}