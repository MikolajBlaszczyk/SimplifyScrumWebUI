import { useState } from "react"
import { Project } from "../../data/DataIndex"
import { SimpleSideMenu } from "./SimpleSideMenu"

interface Props {
    project: Project
    ref?: React.LegacyRef<HTMLDivElement> 
}

export function ProjectCard({project, ref}: Props){
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div ref={ref} className="card s-card" onClick={() => {setShowMenu(prev => !prev)}}>
            <div className="card-body s-card-body">
                <h4 className="card-title common-header">
                    {project.name}
                </h4>
                <p className="card-text mt-1">
                    {project.description}
                </p>
                <p className="card-text s-card-addon mt-2">
                    {`Created on ${project.createdOn.getUTCDate()}`}
                </p>
            </div>
            {
                showMenu &&
                <SimpleSideMenu 
                    removeClick={() => {}} 
                    editClick={() => {}} /> 
            }
        </div>
    )
}