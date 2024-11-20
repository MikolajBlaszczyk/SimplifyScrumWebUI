import React from "react";
import { ReactNode } from "react";

interface Props { 
    children: ReactNode
}

export default function NoteBoard({children}: Props){
    const childrenCount = React.Children.count(children)
    const childrens = React.Children.toArray(children);
    const renderedGrid: React.ReactElement[] = []

    const placeholder = (
        <div className="s-border-placeholder s-card-placeholder">
            <h4>Add Project</h4>
        </div>
    )
    
    for(let i = 0; i < childrenCount ; i+=3){
        renderedGrid.push(
            <div className="row  align-items-center">
                <div className="col d-flex justify-content-start">
                    {childrens[i]}
                </div>
                <div className="col d-flex justify-content-center">
                {
                    i + 1 < childrenCount ?
                    childrens[i + 1] : 
                    placeholder
                }
                </div>
                <div className="col d-flex justify-content-end">
                {
                    i + 2 < childrenCount ?
                    childrens[i + 2] : 
                    placeholder
                }
                </div>
            </div>
        )
    }

    return(<>{renderedGrid}</>)
}