import { ReactNode, useContext } from "react";
import { AlertContext, AlertingState } from "../context/ContextsIndex";
import { useModalForm } from "../hooks/useContexts";


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
    const {alerting} = useContext(AlertContext) as AlertingState
    const {modal} = useModalForm()

    return (
        <>
            {alerting.showAlert && (alerting.alertComponent)}
            {modal.showModal && (modal.modalComponent)}
            <div className="row d-flex  mt-5 mb-5 s-side-by-side-layout">
                <div className={alignmentLeftClasses[alignment]}>
                    {leftSide}
                </div>
                {alignment != Alignment.Equal && (<div className="col-1"></div>)}
                <div className={`${alignmentRightClasses[alignment]}  align-items-end d-flex flex-column`}>
                    {rightSide}
                </div>
            </div>
        </>
        
    )
}