import React, { forwardRef, ReactNode } from "react";
import { ProjectPlaceholder } from "../Items/Project/Board/ProjectPlaceholder";

interface Props { 
    children: ReactNode
}

export const NoteBoard = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
    const childrenCount = React.Children.count(children);
    const childrens = React.Children.toArray(children);
    const renderedGrid: React.ReactElement[] = [];
    
    for(let i = 0; i < childrenCount ; i+=3){
        renderedGrid.push(
            <div className="w-100 h-100 d-flex justify-content-evenly align-items-center mb-5" key={i}>
                <div >
                    {childrens[i]}
                </div>
                <div>
                {
                    i + 1 < childrenCount ?
                    childrens[i + 1] : 
                    (<ProjectPlaceholder  />)
                }
                </div>
                <div >
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
            <div className="w-100 h-100 d-flex justify-content-evenly align-items-center " key="placeholder">
                <div>
                    <ProjectPlaceholder />
                </div>
                <div>
                    <ProjectPlaceholder  />
                </div>
                <div>
                    <ProjectPlaceholder />
                </div>
            </div>
        )
    }

    return(<div ref={ref} className="w-100 mt-4 mb-4 h-100 flex-column justify-content-center d-flex ">{renderedGrid}</div>)
});
