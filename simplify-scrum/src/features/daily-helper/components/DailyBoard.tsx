import { useState } from "react";
import { SimpleStatus, Task } from "../../backlog/data/DataIndex";
import React from "react";

export function DailyBoard(){
    const [tasks, setTasks] = useState<Task[]>([
        new Task(1, 'Task 1', SimpleStatus.ToBeDone, 'feature-1', 'assignee-1', 'creator-1', new Date(), 'updater-1', new Date()),
        new Task(2, 'Task 2', SimpleStatus.Done, 'feature-2', 'assignee-2', 'creator-2', new Date(), 'updater-2', new Date()),
        new Task(3, 'Task 3', SimpleStatus.Doing, 'feature-3', 'assignee-3', 'creator-3', new Date(), 'updater-3', new Date()),
        // Add more tasks as needed
    ]);

    return (
        <div className=" bg-dark s-w-95 s-h-95 rounded ps-3 pe-3 pt-1 pb-1">
            <h1 className="text-white">Daily Board</h1>
            <div className="grid-container">
                <div className="grid-header">Tasks</div>
                <div className="grid-header">To do</div>
                <div className="grid-header">Done</div>
                <div className="grid-header">Doing</div>
                {tasks.map(task => (
                    <React.Fragment key={task.id}>
                        <div className="grid-item">{task.name}</div>
                        <div className="grid-item">{task.state === SimpleStatus.ToBeDone ? task.name : ''}</div>
                        <div className="grid-item">{task.state === SimpleStatus.Done ? task.name : ''}</div>
                        <div className="grid-item">{task.state === SimpleStatus.Doing ? task.name : ''}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}