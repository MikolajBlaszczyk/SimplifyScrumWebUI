import { ReactNode } from "react";


export enum Alignment {
    Equal,
    SideItemLeft,
    SideItemRight
}



const alignmentLeftClasses = {
    [Alignment.Equal]: 'col',
    [Alignment.SideItemLeft]: 'col-3',
    [Alignment.SideItemRight]: 'col-8'
}

const alignmentRightClasses = {
    [Alignment.Equal]: 'col',
    [Alignment.SideItemLeft]: 'col-8',
    [Alignment.SideItemRight]: 'col-3'
}

interface SideBySideLayoutProps{
    rightSide: ReactNode,
    leftSide: ReactNode,
    alignment: Alignment
}


export function SideBySideLayout({rightSide, leftSide, alignment}: SideBySideLayoutProps){
    return (
        <div className="row d-flex w-100">
            <div className={alignmentLeftClasses[alignment]}>
                {leftSide}
            </div>
            {alignment != Alignment.Equal && (<div className="col-1"></div>)}
            <div className={`${alignmentRightClasses[alignment]} justify-content-center d-flex flex-column`}>
                {rightSide}
            </div>
        </div>
    )
}