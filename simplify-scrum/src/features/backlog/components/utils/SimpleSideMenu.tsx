import { MouseEvent, ReactElement, useEffect, useState } from "react";

interface AdditionalButton {
    onClick: () => void
    icon: string
}

interface Props {
    removeClick: () => void
    editClick: () => void
    isAnimated: boolean,
    additionalButtons?: AdditionalButton[],
    setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>
}

export function SimpleSideMenu({additionalButtons, isAnimated, setIsAnimated, removeClick, editClick}: Props){


    
    return (
        <div className={`s-simple-side-menu  position-absolute  ms-2  d-flex flex-column border rounded p-2 w-auto  ${isAnimated ? 's-simple-side-menu-animate' : 's-simple-side-menu-animate-back'}`}>
            <button className="btn btn-dark s-p" onClick={e => {e.stopPropagation(); removeClick()}}>
                <i className="bi bi-trash3"></i>
            </button>
            <button className="btn btn-dark  s-p mt-2" onClick={e => {e.stopPropagation(); editClick()}}>
                <i className="bi bi-pen"></i>
            </button>
            {
                additionalButtons?.map(button => (
                    <button className="btn btn-dark s-p mt-2" onClick={e => {e.stopPropagation(); button.onClick()}}>
                        <i className={`bi ${button.icon}`}></i>
                    </button>
                ))
            }
        </div>
    )
}