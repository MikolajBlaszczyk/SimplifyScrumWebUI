import React, { forwardRef, ReactNode } from "react";

interface Props {
    children: ReactNode
}

export const ListBoard = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
    const childrens = React.Children.toArray(children);

    return (
        <div ref={ref} className="mt-4 mb-4 d-flex w-100 h-100 flex-column s-board-list justify-content-start align-items-center overflow-hidden position-relative">
            {childrens}
        </div>
    )
});