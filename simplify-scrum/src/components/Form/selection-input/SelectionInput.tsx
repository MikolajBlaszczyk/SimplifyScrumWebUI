import { useEffect, useRef, useState } from "react";
import { SelectionInputProps } from "./SelectionInputProps";
import { useTooltip } from "../../../hooks/useTooltip";
import { StandardInputTemplate } from "../shared/StandardInputTemplate";

export function SelectionInput({icon, placeholder, disabled, selectedValue, className, onSelectedValueChange, options, tooltipContent, validation}:SelectionInputProps){

        return(
            <StandardInputTemplate 
                icon={icon}
                className={className + " s-input-select"}
                tooltipContent={tooltipContent}
                validation={validation}
                buttonVisible={false}
                element={ 
                <select  
                    className="d-flex w-100  me-2"
                    value={selectedValue ?? placeholder}
                    disabled={disabled} 
                    required={true}
                    onChange={e => {onSelectedValueChange(e.target.value)}}>
                <option disabled selected>{placeholder}</option>
                {
                    options.map(option =>{

                        return (<option  value={option.value}>{option.description}</option>)
                    })
                }
                </select>}
                clearValue={() => {}} />
        )
}
