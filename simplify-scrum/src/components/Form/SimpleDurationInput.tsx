import { useEffect } from "react";
import { Fonts } from "../../utils/UtilsIndex"
import { SimpleIcon } from "../ComponentsIndex"

interface Props{
    minValue: number,
    maxValue: number,
    value: number,
    onValueChange: (newValue: number) => void
    label: string,
    icon?: string
}


export function SimpleDurationInput({minValue, maxValue, value, onValueChange, label, icon}: Props){

    const changeValue = (value: number) => {
        if(value >= minValue && value <= maxValue){
            onValueChange(value)
        } else {
            return
        }
    }

    return (
    <div className="d-flex  align-items-center ps-2 pt-1 justify-content-between border rounded">
       <div className="d-flex justify-content-start align-items-center w-50">
        {icon && <SimpleIcon icon={`bi ${icon}`} font={Fonts.H5} />}
            <h6 className="m-1 user-select-none"> 
                {value} 
            </h6>
            <h6 className="m-1 user-select-none ">
                {label}
            </h6>
       </div>
        

        <input
            type="range"
            className="border-0 m-1 w-50 me-3"
            min={minValue}
            max={maxValue + 1}
            value={value}
            onChange={e => changeValue(e.target.valueAsNumber)}
            step="1"
        />
    </div>
    )
}