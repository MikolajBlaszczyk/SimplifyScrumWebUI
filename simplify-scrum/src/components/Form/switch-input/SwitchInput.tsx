import { StandardInputTemplate } from "../shared/StandardInputTemplate";
import { SwitchInputProps } from "./SwitchInputProps";

export function SwitchInput({icon, placeholder, disabled, readonly, className, isChecked,changeValue, tooltipContent, validation}: SwitchInputProps){
    return (
        <StandardInputTemplate 
            icon={icon}
            tooltipContent={tooltipContent}
            validation={validation}
            buttonVisible={false}
            className={" s-switch-input " + className}
            element={
            <div className="form-switch d-flex ps-0  w-100 align-items-center justify-content-between s-input-range-div">
                <h6 className="m-0 ms-2 w-auto ">{placeholder}</h6>
                <input 
                className="form-check-input  s-checkbox" 
                type="checkbox" 
                placeholder={placeholder}
                checked={isChecked} 
                readOnly={readonly}
                disabled={disabled} 
                role="switch" 
                onChange={e => (changeValue(e.target.checked))} />
            </div>} 
            />
    )
}