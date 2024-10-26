import { ChangeEvent } from "react"

interface Props {
    label?: string,
    isChecked: boolean
    onValueChange: (newValue: React.ChangeEvent<HTMLInputElement>) => void
}

export function SimpleSwitch({label, isChecked, onValueChange}: Props){ 
    return (
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" checked={isChecked} role="switch" onChange={onValueChange}/>
            {label && <label>{label}</label>}
        </div>
    )
}