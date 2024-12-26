import React from "react";
import { forwardRef, ReactElement, ReactNode } from "react"

interface Props {
    children: ReactNode
}

export const DetailBoard = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
    const childrens = React.Children.toArray(children);

    return (
        <div ref={ref} className="d-flex align-self-center justify-content-center  overflow-auto w-100  h-auto">
            {childrens}
        </div>
    )
});

interface DetailBoardContentProps {
  
    childrenElements: ReactElement
    editElement: ReactElement
}

export function DetailBoardContent({childrenElements, editElement}: DetailBoardContentProps){
    return  (
    <div className="d-flex w-100 h-auto">
        <div className=" d-flex justify-content-center overflow-hidden  border-end border-2  w-50   " >
            {childrenElements}
        </div>
        <div className=" justify-content-center overflow-hidden  w-50  d-flex " >
            {editElement}
        </div>
    </div>
    )
}