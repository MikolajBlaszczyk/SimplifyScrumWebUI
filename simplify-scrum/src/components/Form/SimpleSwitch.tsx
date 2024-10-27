import { ChangeEvent } from "react"
import { BgColor } from "../../utils/Index"

interface Props {
    label?: string,
    color?: BgColor 
    isChecked: boolean
    onValueChange: (newValue: React.ChangeEvent<HTMLInputElement>) => void
}

export function SimpleSwitch({label, isChecked, onValueChange}: Props){ 
    return (
        <div className="form-check form-switch">
            <input className="form-check-input s-checkbox" type="checkbox" checked={isChecked} role="switch" onChange={onValueChange}/>
            {label && <label>{label}</label>}
        </div>
    )
}