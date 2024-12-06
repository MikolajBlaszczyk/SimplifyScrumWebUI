import { ChangeEvent, useEffect } from "react"
import { SimpleIcon } from "../ComponentsIndex"
import { Fonts } from "../../utils/UtilsIndex"

export interface SelectItem {
    value: string,
    description: string
}

interface Props {
    selectedValue: string
    onSelectedValueChange: (value: string) => void
    options: SelectItem[]
    label?: string,
    icon?: string,
}

export function SimpleSelectionInput({label, icon, selectedValue, onSelectedValueChange, options}: Props){


    return(
        <div className="d-flex align-items-center border rounded ps-1 pe-2 mb-2">
            {icon && <SimpleIcon 
                icon={icon} 
                font={Fonts.H5} /> }
            <div className="ms-2 d-flex justify-content-between w-100 align-items-center s-settings-editable">
                <h6 className="m-0 mt-2 mb-2 user-select-none me-2">
                        {label}
                </h6> 
                <select  className=" border-0" value={(selectedValue)} onChange={(e) =>{ onSelectedValueChange(e.target.value)}}>
                <option disabled selected>Choose</option>
                {
                    options.map(option =>{

                        return (<option  value={option.value}>{option.description}</option>)
                    })
                }
            </select>
            </div>
        </div>
    )
}