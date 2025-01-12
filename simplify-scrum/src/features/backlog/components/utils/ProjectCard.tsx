import { useRef, useState, act } from 'react';
import { Project } from "../../data/DataIndex"
import { SimpleSideMenu } from "./SimpleSideMenu"
import { format } from 'date-fns';
import { Placeholder, SimpleIcon } from "../../../../components/ComponentsIndex";
import { Fonts } from "../../../../utils/UtilsIndex";
import { BacklogService } from "../../../../services/CommonServicesIndex";
import { useBacklog, useLoading } from "../../../../hooks/useContexts";
import { BacklogAction, DetailType } from "../../../../context/BacklogContext";
import { ProjectPlaceholder } from "../Items/Project/Board/ProjectPlaceholder";
import { v4 } from 'uuid';

interface Props {
    project: Project
    index: number
}



export function ProjectCard({index, project}: Props){
    const [isAnimated, setIsAnimated] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [wasRemoved, setWasRemoved] = useState(false)
    const {state, setState} = useBacklog()
    const cardRef = useRef<HTMLDivElement>(null)

    const deleteProject = async () => {
        setWasRemoved(true)
        await BacklogService.deleteProject(project.guid)
    }

    const editProject = async () => {
        setState({...state, action: BacklogAction.EditProject, item: { itemGuid: project.guid, itemType: DetailType.Project }})
    }

    const checkFeatures = async () => {
        setState({...state, action: BacklogAction.ShowFeatures, parentGuid:  project.guid})
    }
    
    

    return  wasRemoved == false ? 
            (
                <div 
                ref={cardRef}
                className="card s-card-project s-bg-dark-input position-relative w-100  overflow-visible"
                tabIndex={-1}
                onClick={(e) => {
                    setTimeout(() => {
                        if(showMenu != true) {
                            setIsAnimated(true)
                            setTimeout(() => { setShowMenu(true) }, 10);
                        } else {
                            setIsAnimated(false)
                            setTimeout(() => {setShowMenu(false)}, 400)
                        }
                    }, 100); 
                }}>
                <div className="card-body s-card-body d-flex flex-column user ">
                    <div className=" justify-content-between w-100  d-flex align-items-center  overflow-hidden" >
                       
                        <SimpleIcon 
                                icon={"bi-box-seam-fill"}
                                font={Fonts.H5}/>
                     
                        <h5 className="text-end mb-0 w-100 overflow-hidden ">
                            {project.name}
                        </h5>
                    </div>  
                    <div className="h-50 overflow-hidden s-card-body text-start mt-2  me-2 " >
                        <h6 className="card-text mt-1  ">
                            {project.description}
                        </h6>
                    </div>
                    <div className="h-25 mt-3 d-flex justify-content-start align-items-end">
                        <p className="card-text s-card-addon mt-2 ">
                            {`Created on ${format(project.createdOn, 'yyyy.MM.dd')}`}
                        </p>
                    </div>
                   
                    
                </div>
                {
                    showMenu &&
                    <SimpleSideMenu
                        key={v4()} 
                        isAnimated={isAnimated}
                        setIsAnimated={setIsAnimated}
                        removeClick={() => { deleteProject() }} 
                        editClick={() => { editProject() }} 
                        additionalButtons={
                            [
                                {icon: 'bi-list-task', onClick: () => {checkFeatures()}}
                            ]
                        }/> 
                }
                </div>
            ) 
            :
            (
                <ProjectPlaceholder />
            )
}