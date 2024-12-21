import { StandardInputTemplate } from "../shared/StandardInputTemplate";
import { RangeInputProps } from "./RangeInputProps";

export function RangeInput({icon,  disabled, minValue, className, maxValue, placeholder, value, onValueChange, tooltipContent, validation}: RangeInputProps){
    return (
        <StandardInputTemplate 
            icon={icon}
            tooltipContent={tooltipContent}
            validation={validation}
            className={className}
            element={  
                <div className="d-flex h-100 w-100 align-items-center s-input-range-div">
                    <h6 className="m-0 ms-2 w-25">{value}</h6>
                    <input
                        placeholder={placeholder}
                        type="range"
                        className="border-0 ms-2 w-100 me-3 s-input-range"
                        min={minValue}
                        disabled={disabled}
                        max={maxValue }
                        value={value}
                        onChange={e => onValueChange(e.target.valueAsNumber)}
                        step="1"
                        />
                </div>
               
            }
            buttonVisible={false} 
            clearValue={() => {}} />
    )
}