import React from "react";
import { ReactNode } from "react";
import { Button, Color,   SimpleButton } from "../../../../components/ComponentsIndex";
import { Fonts } from "../../../../utils/UtilsIndex";
import { ProjectPlaceholder } from "../Items/Project/Board/ProjectPlaceholder";

interface Props { 
    children: ReactNode
}

export default function NoteBoard({ children}: Props){
    const childrenCount = React.Children.count(children)
    const childrens = React.Children.toArray(children);
    const renderedGrid: React.ReactElement[] = []
    
    for(let i = 0; i < childrenCount ; i+=3){
        renderedGrid.push(
            <div className="row  align-items-center mb-5">
                <div className="col d-flex justify-content-start">
                    {childrens[i]}
                </div>
                <div className="col d-flex justify-content-center">
                {
                    i + 1 < childrenCount ?
                    childrens[i + 1] : 
                    (<ProjectPlaceholder  />)
                }
                </div>
                <div className="col d-flex justify-content-end">
                {
                    i + 2 < childrenCount ?
                    childrens[i + 2] : 
                    (<ProjectPlaceholder  />)
                }
                </div>
            </div>
        )
    }

    if( childrenCount % 3 == 0){
        renderedGrid.push(
            <div className="row  align-items-center">
                <div className="col d-flex justify-content-start">
                    <ProjectPlaceholder />
                </div>
                <div className="col d-flex justify-content-center">
                    <ProjectPlaceholder  />
                </div>
                <div className="col d-flex justify-content-end">
                    <ProjectPlaceholder />
                </div>
            </div>
        )
    }

    return(<>{renderedGrid}</>)
}