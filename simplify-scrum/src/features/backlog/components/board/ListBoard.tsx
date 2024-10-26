import React, { ReactElement, ReactNode } from "react"

interface Props {
    children: ReactNode
}

export function ListBoard({children}: Props){
    const childrens = React.Children.toArray(children);


    return (
        <ul className="list-group ">
            {childrens}
        </ul>
    )
}