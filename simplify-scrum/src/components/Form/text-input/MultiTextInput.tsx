import { useEffect, useRef, useState } from "react";
import { useTooltip } from '../../../hooks/useTooltip';
import { Role, Size, Style } from "../../common/button/ButtonProps";
import { Button } from "../../ComponentsIndex";
import { MultiTextInputProps } from "./MultiTextInputProps";

export function MultiTextInput({icon, placeholder, disabled, readonly, value, className, changeValue, tooltipContent, validation}: MultiTextInputProps){
    useTooltip([]);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const initialHeight = useRef(0);
    const [isExpanded, setIsExpanded] = useState(false);


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




    return(
        <div className={"s-input s-input-multiline opacity-75 w-100 d-flex flex-column align-items-center " + className}>
            <div ref={wrapperRef}  className={` ${isExpanded ? 'text-danger border-bottom  mb-1 w-100 ps-3 pb-1 s-p' : ''}  s-validation-message  `}>{validation?.isValid == false && validation!.message}</div>
            <div className="d-flex flex-column w-100">
                <div className="d-flex w-100 justify-content-between mb-2" >
                    <i  className={`bi ${icon} s-h6`}  data-bs-toggle="tooltip" data-bs-custom-class="s-tooltip" data- data-bs-placement="left" title={`${tooltipContent ?? ''}`}></i>
                
                    
                </div>
                
                <textarea 
                    className="d-flex w-100 border-0"
                    placeholder={placeholder}
                    readOnly={readonly}
                    disabled={disabled} 
                    required={false}
                    value={value}
                    onChange={e => {changeValue(e.target.value)}}/>
            </div>
           
        </div>
    )
}