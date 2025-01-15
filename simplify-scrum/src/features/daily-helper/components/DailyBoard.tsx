import { useMemo, useState } from "react";
import { SimpleStatus, Task } from "../../backlog/data/DataIndex";
import React from "react";
import { StandardHeader, StandardHeaderProps, TabButtonsConfiguration } from "../../../components/ComponentsIndex";
import { FeatureBoard } from "./item-boards/FeatureBoard";
import { useDaily } from "../../../hooks/useContexts";
import { DailyAction } from "../../../context/DailyContext";

export function DailyBoard(){
    const {state, setState} = useDaily()
    const [activeButton, setActiveButton] = useState(0)
    const [tasks, setTasks] = useState<Task[]>([
        new Task(1, 'Task 1', SimpleStatus.ToBeDone, 'feature-1', 'assignee-1', 'creator-1', new Date(), 'updater-1', new Date()),
        new Task(2, 'Task 2', SimpleStatus.Done, 'feature-2', 'assignee-2', 'creator-2', new Date(), 'updater-2', new Date()),
        new Task(3, 'Task 3', SimpleStatus.Doing, 'feature-3', 'assignee-3', 'creator-3', new Date(), 'updater-3', new Date()),
        // Add more tasks as needed
    ]);

    const headerConfig: StandardHeaderProps = useMemo(() => {
    
            if(state.action == DailyAction.ShowTaskBoard) setActiveButton(0)
    
            const buttons: TabButtonsConfiguration[] = [
                {
                    icon: "bi-card-list",
                    onClick: () => {
                        setActiveButton(0)
                        setState({...state, action: DailyAction.ShowTaskBoard, guid: undefined})
                    }
                },
            
            ]
    
            buttons.forEach((button, index) => { if(activeButton == index) button.isActive = true })
    
            return ({ title: "Daily", buttonConfigs: buttons})
        }, [activeButton, state])


    return (
        <div className="s-daily-board overflow-auto  position-relative d-flex h-100 flex-column w-100 rounded">
            <StandardHeader {...headerConfig} className=" position-sticky top-0 start-50 " />
            <FeatureBoard />
        </div>
    );
}