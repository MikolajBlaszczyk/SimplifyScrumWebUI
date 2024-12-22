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
            <div className="  mt-4 shadow border border-2 rounded s-board  justify-content-center align-items-center" >
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