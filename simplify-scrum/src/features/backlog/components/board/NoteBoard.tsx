import React from "react";
import { ReactNode } from "react";

interface Props { 
    children: ReactNode
}

export default function NoteBoard({children}: Props){
    const childrenCount = React.Children.count(children)
    const childrens = React.Children.toArray(children);
    const renderedGrid: React.ReactElement[] = []

    
    for(let i = 0; i < childrenCount ; i+=3){
        renderedGrid.push(
            <div className="row  align-items-center pt-4 pb-4">
                <div className="col d-flex justify-content-center">
                    {childrens[i]}
                </div>
                <div className="col d-flex justify-content-center">
                {
                    i + 1 < childrenCount
                    && 
                    childrens[i + 1]
                }
                </div>
                <div className="col d-flex justify-content-center">
                {
                    i + 2 < childrenCount
                    && 
                    childrens[i + 2]
                }
                </div>
            </div>
        )
    }

    return(renderedGrid)
}