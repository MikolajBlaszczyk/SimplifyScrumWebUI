import { Tooltip } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { ValidationResult } from "./SharedProps";
import { Button } from "../../ComponentsIndex";
import { Role, Size, Style } from "../../common/button/ButtonProps";

interface StandardInputTemplateProps {
    element: JSX.Element
    icon?: String,
    validation?: ValidationResult
    buttonVisible?: boolean
    tooltipContent?: string
    className?: string
    clearValue?: () => void
}

//TODO: known issue: when the input validation message is too long validation message needs to open on two clicks
export function StandardInputTemplate({element, validation, tooltipContent, buttonVisible, icon, className, clearValue}: StandardInputTemplateProps){
    const wrapperRef = useRef<HTMLDivElement>(null);
    const initialHeight = useRef(0);
    const [isExpanded, setIsExpanded] = useState(false);


    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))

        const height = wrapperRef.current!.scrollHeight;
        initialHeight.current = height;
        wrapperRef.current!.style.height = `${height}px`;    

        return () => {
            tooltipList.map(t => t.dispose())
        }
    }, []);

    useEffect(() => {
        const wrapperHeight: number = wrapperRef.current!.scrollHeight;
        if(validation?.isValid === false){
        wrapperRef.current!.style.height = `${wrapperHeight}px`;
        setIsExpanded(true); 
        }
        else 
        {
        wrapperRef.current!.style.height = `${initialHeight.current}px`;
        setIsExpanded(false);
    }


    }, [validation]);


    return (
         <div className={"s-input  opacity-75 w-100 d-flex flex-column align-items-center " + className}>
                    <div ref={wrapperRef}  className={`text-warning fw-bold   ${isExpanded ? 'border-bottom  mb-1 w-100 ps-3 pb-1 s-p ' : ''}  s-validation-message  `}>{validation?.isValid == false && validation!.message}</div>
                    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                        <i  className={`bi ${icon} s-h6 `}  data-bs-toggle="tooltip" data-bs-custom-class="s-tooltip" data- data-bs-placement="left" title={`${tooltipContent ?? ''}`}></i>
                        {element}
                        {
                            buttonVisible &&
                            (
                                <div className=" opacity-75">
                                <Button 
                                    autoadvance={true}
                                    icon="bi-x"
                                    size={Size.Large}
                                    style={Style.Circle}
                                    role={Role.Cancel}
                                    onClick={() => { clearValue && clearValue() }} />
                                </div>
                            )
                        }
                      
                    </div>
                   
        </div>
    )
}