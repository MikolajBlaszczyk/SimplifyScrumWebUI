import { Button, SimpleIcon } from "../../../components/ComponentsIndex";
import { useAlert, useModal } from "../../../hooks/HooksIndex";
import { useModalForm } from "../../../hooks/useContexts";
import { Fonts } from "../../../utils/UtilsIndex";
import { AlertStyle } from "../../alerting/components/Alert";
import ProjectEdit from "../../backlog/components/Items/Project/Edit/ProjectEdit";

export function StartProject(){
    const showModal = useModal()
    const showAlert = useAlert()

    const createNewProject = () => {
        showModal( 
            (<ProjectEdit />),
            "Project"
        )
    }

    const askToJoinToProject = () => {
        showAlert(AlertStyle.Warning, "Not yet available")
    }

    return (
        <section className="bg-dark s-settings-section" style={{height: "45vh"}}>
            <div className="row d-flex h-100">
                <div className="col-6 border-end d-flex flex-column align-items-center justify-content-center">
                    <SimpleIcon 
                        icon={"bi-box-seam-fill"}
                        font={Fonts.H1}/>
                    
                    <div className="mb-3"></div>

                    {/* <SimpleButton 
                        type={Button.Transparent}
                        fontColor={Color.Light}
                        title={"Create new project"}
                        font={Fonts.H5}
                        onClick={() => {createNewProject()}} /> */}
                </div>
                <div className="col-6 d-flex flex-column align-items-center justify-content-center">
                    
                    
                    <SimpleIcon 
                            icon={"bi-file-earmark-fill"}
                            font={Fonts.H1}/>

                    <div className="mb-3"></div>

                    {/* <SimpleButton 
                            type={Button.Borderless}
                            fontColor={Color.Light}
                            font={Fonts.H5}
                            title={"Start without project"}
                            onClick={() => {askToJoinToProject()}} /> */}
                </div>
            </div>
        </section>
    )
}