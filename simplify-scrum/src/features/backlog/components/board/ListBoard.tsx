import React, { ReactElement, ReactNode } from "react"
import { Button } from "../../../../components/ComponentsIndex";

interface Props {
    children: ReactNode
}

export function ListBoard({ children}: Props){
    const childrens = React.Children.toArray(children);


    return (
        <div className="d-flex w-100 h-100 flex-column  bg-dark shadowrounded  ">
            {childrens}
        </div>
    )
}