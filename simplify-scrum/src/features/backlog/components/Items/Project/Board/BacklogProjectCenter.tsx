import { useEffect, useState } from "react";
import { BacklogService } from "../../../../../../services/CommonServicesIndex";
import { DataLoader } from "../../../../../../data/CommonDataIndex";
import { ProjectBoard } from "./ProjectBoard";
import { useLoading } from "../../../../../../hooks/HooksIndex";
import { v4 } from "uuid";



export function BacklogProjectCenter() {
    const [projectsLoader, setProjectsLoader] = useState<DataLoader>(DataLoader.default())

    const fetchData = async () => {
        const projects = await BacklogService.getProjects()
        if(projects.length == 0){
            setProjectsLoader(prev => DataLoader.dataFinishedLoading(prev, projects, true))
        }
        else{
            setProjectsLoader(prev => DataLoader.dataFinishedLoading(prev, projects, false))
        }           
    }

    

    useEffect(() => {
        fetchData()
    }, [])

    

    return(
    
            <ProjectBoard 
                key={v4()}
                isEmpty={false}
                placeholder={projectsLoader.placeholder} 
                projects={projectsLoader.data} />
    )
}