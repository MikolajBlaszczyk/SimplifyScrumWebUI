import { ChangeEvent } from "react"
import { BgColor, Fonts } from "../../utils/UtilsIndex"
import { SimpleIcon } from "../ComponentsIndex"

interface Props {
    label?: string,
    color?: BgColor 
    icon?: string
    disabled?: boolean
    isChecked: boolean
    onValueChange: (newValue: React.ChangeEvent<HTMLInputElement>) => void
}

export function SimpleSwitch({label, isChecked, disabled, icon, onValueChange}: Props){ 
    return (
        <div className="form-switch d-flex ps-1 pe-2 border h-100 rounded overflow-hidden align-items-center justify-content-between w-100">
             {icon && (
                <SimpleIcon 
                    icon={`bi ${icon}`} 
                    font={Fonts.H5} 
                />
            )}
            <h6 className="m-0 user-select-none me-2 h-100 d-flex align-items-center">
                {label}
            </h6> 
            <input 
                className="form-check-input s-checkbox" 
                type="checkbox" 
                checked={isChecked} 
                disabled={disabled} 
                style={{marginLeft: 'auto'}} 
                role="switch" 
                onChange={onValueChange}
            />
        </div>
    )
}