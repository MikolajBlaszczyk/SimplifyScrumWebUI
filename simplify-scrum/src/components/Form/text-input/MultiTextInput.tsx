import { useEffect, useRef, useState } from "react";
import { useTooltip } from '../../../hooks/useTooltip';
import { MultiTextInputProps } from "./MultiTextInputProps";
import { TextField, Box } from "@mui/material";

export function MultiTextInput({icon, placeholder, disabled, readonly, value, className, changeValue, tooltipContent, validation, initialRows, label}: MultiTextInputProps){
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
        <div className={"s-input s-input-multiline opacity-75 w-100  d-flex flex-column align-items-center " + className}>
          <div ref={wrapperRef}  className={` ${isExpanded ? 'text-warning fw-bold border-bottom  mb-1 w-100 ps-3  pb-1 s-p' : ''}  s-validation-message  `}>{validation?.isValid == false && validation!.message}</div>
          
          <TextField
              sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                  },
                  '& .MuiOutlinedInput-root': {
                      padding: '0', 
                  },
                  '& .MuiOutlinedInput-input': {
                      padding: '8.5px 0', 
                  },
                  '& .MuiInputLabel-root': {
                    padding: '0 4px',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                      color: '#8EB4AE',
                  },
                  '& .MuiInputLabel-formControl': {
                      transform: 'translate(0, -13px) scale(1)',
                  },
                  '& .MuiInputLabel-shrink': {
                      transform: 'translate(0, -13px) scale(0.75)',
                  },
                  width: '100%',
              }}
              className="mt-3"
              label={
                <>
                  {label ?? "Description"}
                  <i className={`bi ${icon} s-h6 ms-1`} data-bs-toggle="tooltip" data-bs-custom-class="s-tooltip" data-bs-placement="left" title={`${tooltipContent ?? ''}`}></i>
                </>
              }
              multiline
              minRows={initialRows ?? 3}
              disabled={disabled}
              required={false}
              value={value}
              onChange={e => { changeValue(e.target.value) }}
          />
        </div>
    )
}