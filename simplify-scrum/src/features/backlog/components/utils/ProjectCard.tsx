import { useRef, useState, act } from 'react';
import { Project } from "../../data/DataIndex"
import { SimpleSideMenu } from "./SimpleSideMenu"
import { format } from 'date-fns';
import { Placeholder, SimpleIcon } from "../../../../components/ComponentsIndex";
import { Fonts } from "../../../../utils/UtilsIndex";
import { BacklogService } from "../../../../services/CommonServicesIndex";
import { useBacklog, useLoading } from "../../../../hooks/useContexts";
import { BacklogAction } from "../../../../context/BacklogContext";
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
        setState({...state, action: BacklogAction.EditProject, guid: project.guid})
    }

    const checkFeatures = async () => {
        setState({...state, action: BacklogAction.ShowFeatures, guid: project.guid, parentGuid: project.guid})
    }

    return  wasRemoved == false ? 
            (
                <div 
                ref={cardRef}
                className="card s-card border border-2 shadow"
                tabIndex={index}
                onClick={() => {
                    if(showMenu != true) {
                        setShowMenu(true)
                    } else {
                        setIsAnimated(false)
                        setTimeout(() => {setShowMenu(false)}, 150)
                    }
                   
                }}>
                <div className="card-body s-card-body d-flex flex-column">
                    <div className="ps-2 pe-2 pb-1 w-100  d-flex align-items-center">
                       
                        <SimpleIcon 
                                icon={"bi-box-seam-fill"}
                                font={Fonts.H4}/>
    
                       
                        <div className="ms-4"></div>
                     
                        <h3 className="card-title common-header mb-0 ">
                            {project.name}
                        </h3>
                    </div>  
                    <div className="h-50 s-textarea mt-2">
                        <h6 className="card-text mt-1">
                            {project.description}
                        </h6>
                    </div>
                    <div className="h-25 d-flex justify-content-end align-items-end">
                        <p className="card-text s-card-addon mt-2 text-info ">
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