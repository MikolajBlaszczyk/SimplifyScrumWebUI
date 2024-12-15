import { MouseEvent, useEffect, useRef, useState } from "react"
import { Button } from "../../ComponentsIndex"
import { TextInputProps, textTypes, TextType } from "./TextInputProps"
import { Role, Size, Style } from "../../common/button/ButtonProps"
import {Tooltip } from 'bootstrap';

//TODO: known issue: when the input validation message is too long validation message needs to open on two clicks
export function TextInput({icon, placeholder, disabled, readonly, textType, value, changeValue, tooltipContent, validation}: TextInputProps){
    const wrapperRef = useRef<HTMLDivElement>(null);
    const initialHeight = useRef(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const type = textTypes[textType ?? TextType.Text]

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




    return(
        <div className="s-input opacity-75 w-100 d-flex flex-column align-items-center ">
            <div ref={wrapperRef}  className={` ${isExpanded ? 'text-danger border-bottom  mb-1 w-100 ps-3 pb-1 s-p' : ''}  s-validation-message  `}>{validation?.isValid == false && validation!.message}</div>
            <div className="d-flex w-100">
                <i  className={`bi ${icon} s-h6`}  data-bs-toggle="tooltip" data-bs-custom-class="s-tooltip" data- data-bs-placement="left" title={`${tooltipContent ?? ''}`}></i>
                <input 
                    className="d-flex w-100"
                    value={value}
                    onChange={e => {changeValue(e.target.value)}}
                    type={type}
                    placeholder={placeholder}
                    readOnly={readonly}
                    disabled={disabled} 
                    required={true}/>
                <div className=" opacity-75">
                    <Button 
                        icon="bi-x"
                        size={Size.Large}
                        style={Style.Circle}
                        role={Role.Cancel}
                        onClick={() => { changeValue("") }} />
                </div>
              
            </div>
           
        </div>
    )
}
