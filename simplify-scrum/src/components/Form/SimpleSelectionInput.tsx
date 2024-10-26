import { ChangeEvent } from "react"

export interface SelectItem<T extends Object> {
    value: T,
    description: string
}

interface Props<T extends Object> {
    label?: string
    selectedValue: T
    onSelectedValueChange: (value: string) => void
    options: SelectItem<T>[]
}

export function SimpleSelectionInput<T extends Object>(props: Props<T>){
    const {label, selectedValue, onSelectedValueChange, options} = props

    return(
        <div className="input-group input-group-sm mt-2">
            <label className="input-group-text">{label}</label>
            <select className=" form-select" value={(selectedValue.toString())} onChange={(e) =>{ onSelectedValueChange(e.target.value)}}>
                <option value={""}></option>
                {
                    options.map(option =>{

                        return (<option value={option.value.toString()}>{option.description}</option>)
                    })
                }
            </select>
        </div>
    )
}