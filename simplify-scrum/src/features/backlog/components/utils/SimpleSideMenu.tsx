import { MouseEvent, useEffect, useState } from "react";
import { Button, SimpleButton } from "../../../../components/common/SimpleButton";

interface Props {
    removeClick: () => void
    editClick: () => void
}

export function SimpleSideMenu({removeClick, editClick}: Props){
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimated(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    
    return (
        <div className={`s-simple-side-menu ${isAnimated ? 's-simple-side-menu-animate' : ''}`}>
            <button className="btn btn-dark mb-2" onClick={e => {e.stopPropagation(); removeClick()}}>
                <i className="bi bi-dash-lg"></i>
            </button>
            <button className="btn btn-dark mb-2" onClick={e => {e.stopPropagation(); editClick()}}>
                <i className="bi bi-pen"></i>
            </button>
        </div>
    )
}