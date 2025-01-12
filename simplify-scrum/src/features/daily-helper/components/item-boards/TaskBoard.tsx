import React from "react"
import { Feature } from "../../../backlog/data/Feature"
import { FeatureCard } from "../item-cards/FeatureCard"
import { features } from 'process';
import { SimpleStatus } from "../../../backlog/data/State";
import { TaskCard } from "../item-cards/TaskCard";

interface TaskBoardProps {
    feature: Feature
}

export function TaskBoard({feature}: TaskBoardProps){
    return (
        <div className="d-flex ">
            <React.Fragment key={feature.guid} >
                <div className="grid-item w-25 ms-1 me-1">
                    <FeatureCard feature={feature} />
                </div>
                <div className="grid-item w-25 ms-1 me-1">
                    {
                        feature
                        .tasks
                        .filter(t => t.state == SimpleStatus.ToBeDone)
                        .map(task => <TaskCard task={task}/>)
                    }
                </div>
                <div className="grid-item w-25 ms-1 me-1">
                    {
                        feature
                        .tasks
                        .filter(t => t.state == SimpleStatus.Doing)
                        .map(task => <TaskCard task={task}/>)
                    }
                </div>
                <div className="grid-item w-25 ms-1 me-1">
                    {
                        feature
                        .tasks
                        .filter(t => t.state == SimpleStatus.Done)
                        .map(task => <TaskCard task={task}/>)
                    }
                </div>
            </React.Fragment>
        </div>
        
    )
}