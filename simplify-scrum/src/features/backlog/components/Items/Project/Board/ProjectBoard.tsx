import { Placeholder } from "../../../../../../components/ComponentsIndex"
import { BacklogAction } from "../../../../../../context/BacklogContext"
import { useBacklog } from "../../../../../../hooks/useContexts"
import { Project } from "../../../../data/Project"
import { Board, BoardType } from "../../../board/Board"
import { ProjectCard } from "../../../utils/ProjectCard"

interface Props {
    isEmpty: boolean
    placeholder: boolean
    projects: Project[]
}

export function ProjectBoard({placeholder, projects}: Props){


    if(placeholder !== false){
        return (
            <div className="container-fluid bg-dark mt-5 shadow border border-2 rounded s-board p-5 d-flex justify-content-center align-items-center position-relative" >
                <Placeholder />
            </div>
        )
    } 

    return (
        <Board title={"Projects"}  boardType={BoardType.Notes} >
            {
                projects.map(project => ( <ProjectCard index={projects.indexOf(project)} project={project} />))
            }
        </Board>
    )   
}