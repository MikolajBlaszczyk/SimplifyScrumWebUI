import { StandardInputTemplate } from "../shared/StandardInputTemplate"
import { NumberInputProps } from "./NumberInputProps"





export function NumberInput({icon, placeholder, disabled, readonly, min,  value, changeValue,  tooltipContent, validation, className}: NumberInputProps){


    return(
        <StandardInputTemplate
            icon={icon}
            tooltipContent={tooltipContent}
            validation={validation}
            className={"s-input-number " +className}
            buttonVisible={false}
            element={
                <div className=" d-flex ps-0  w-100 align-items-center justify-content-between ">
                    <h6 className="m-0 ms-2 w-auto ">{placeholder}</h6>
                    <input 
                        type="number"
                        className={``}
                        value={value} 
                        onChange={e => {changeValue(e.target.value)}}
                        disabled={disabled }
                        readOnly={readonly}
                        min={min} />
                </div>} 
                 />
    )
}