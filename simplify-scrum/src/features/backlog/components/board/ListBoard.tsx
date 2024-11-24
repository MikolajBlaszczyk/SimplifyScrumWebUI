import React, { ReactElement, ReactNode } from "react"
import { Button, SimpleButton } from "../../../../components/ComponentsIndex";

interface Props {
    children: ReactNode
}

export function ListBoard({ children}: Props){
    const childrens = React.Children.toArray(children);


    return (
        <div className="flex-column  bg-dark shadow border border-2 rounded  ">
            {childrens}
        </div>
    )
}