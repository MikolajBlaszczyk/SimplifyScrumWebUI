import { useEffect, useState } from "react";
import { Board, BoardType } from "../features/backlog/components/board/Board";
import { ProjectCard } from "../features/backlog/components/utils/ProjectCard";
import { Project } from "../features/backlog/data/DataIndex";

import { CentralLayout } from "../layouts/CentralLayout";
import { BacklogService } from "../services/CommonServicesIndex";

export function Backlog(){
    const [project, setProject] = useState(Project.default())

    useEffect(() => {
        BacklogService
            .getProjects()
    })

    return (
        <CentralLayout 
            centralComponent={
            <Board  type={BoardType.Notes} >
                <ProjectCard project={project} />
            </Board>}            />)
}