import { useEffect, useState, useMemo } from 'react';
import { BacklogService } from "../../../../../../services/CommonServicesIndex";
import { DataLoader } from "../../../../../../data/CommonDataIndex";
import { useBacklog, useLoading } from "../../../../../../hooks/HooksIndex";
import { BacklogAction, DetailType } from "../../../../../../context/BacklogContext";
import { Placeholder, StandardHeaderProps,  TabButtonsConfiguration } from '../../../../../../components/ComponentsIndex';
import { Board, BoardType } from '../../../board/Board';
import { Project } from '../../../../data/Project';
import { ProjectCard } from '../../../utils/ProjectCard';
import { DetailBoardContent } from '../../../board/DetailBoardContent';
import ProjectEdit from '../Edit/ProjectEdit';
import { ProjectMeta } from '../Edit/ProjectMeta';

export function BacklogProjectCenter() {
    const {state, setState} = useBacklog()
    const {shouldReload, setShouldReload} = useLoading()
    const [projectsLoader, setProjectsLoader] = useState<DataLoader>(DataLoader.default())
    const [activeButton, setActiveButton] = useState(0)

    const headerConfig: StandardHeaderProps = useMemo(() => {

        if(state.action == BacklogAction.EditProject) setActiveButton(2)
        if(state.action == BacklogAction.AddProject) setActiveButton(1)

        const buttons: TabButtonsConfiguration[] = [
            {
                icon: "bi-card-list",
                onClick: () => {
                    setActiveButton(0)
                    setState({...state, action: BacklogAction.ShowProjects})
                }
            },
            {
                icon: "bi-plus-lg",
                onClick: () => {
                    setActiveButton(1)
                    setState({...state, action: BacklogAction.AddProject, item: { itemGuid: undefined, itemType: DetailType.Project}})
                }
            },   
            {
                disabled: !(activeButton === 2),
                icon: "bi-pen",
                onClick: () => {
                    setActiveButton(2)
                    setState({...state, action: BacklogAction.EditProject})
                }
            }  
        ]

        buttons.forEach((button, index) => { if(activeButton == index) button.isActive = true })

        return ({ title: "Projects", buttonConfigs: buttons})
    }, [activeButton, state])

    const fetchData = async () => {
        const projects = await BacklogService.getProjects()
        if(projects?.length == 0){
            setProjectsLoader(prev => DataLoader.dataFinishedLoading(prev, projects, true))
        }
        else{
            setProjectsLoader(prev => DataLoader.dataFinishedLoading(prev, projects, false))
        }           
    }

    useEffect(() => {
        fetchData()
    }, [shouldReload])

    if(projectsLoader.placeholder !== false){
        return (
            <Board 
            boardType={BoardType.Empty}
            headerConfig={headerConfig}>
                <div className="shadow border border-2 w-100 h-100 rounded s-board  justify-content-center align-items-center" >
                    <Placeholder />
                </div>
            </Board>
        )
    } 

    return(
          <Board 
            boardType={state.action == BacklogAction.ShowProjects ? BoardType.Notes : BoardType.Details}
            headerConfig={headerConfig}>
            {
                state.action == BacklogAction.ShowProjects ?
                (
                    projectsLoader.isEmpty == false
                    ?
                    projectsLoader
                        .data
                        .map(
                            (project: Project, index: number) => (<ProjectCard index={index} project={project} />))
                    :
                    []
                )
                :
                <DetailBoardContent 
                    childrenElements={
                        <ProjectMeta guid={state.item?.itemGuid} />
                    }
                    editElement={
                        <ProjectEdit guid={state.item?.itemGuid}/>
                    } />
            }
           </Board>
    )
}