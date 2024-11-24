import {  Alignment, SelectItem, SimpleIcon, SimpleSelectionInput, SimpleSwitch, SimpleTextInput } from "../../../components/ComponentsIndex";
import { ChangeEvent } from 'react';
import { BgColor, FontColor, Fonts } from '../../../utils/UtilsIndex';
import { Team } from "../../../data/CommonDataIndex";
import { Placeholder } from '../../../components/common/Placeholder';

interface Props{
    icon: string
    label: string
    placeholder?: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function UserEditableSettings({icon, label, value, onChange, placeholder }: Props){ 
    return( 
    <div className="d-flex align-items-center mb-1">
        <SimpleIcon 
            icon={icon} 
            font={Fonts.H5} />
        <div className="ms-2 ps-1 d-flex justify-content-between w-100 align-items-center  rounded s-settings-editable">
            <h6 className="m-0 user-select-none">
                    {label}
            </h6> 
            <SimpleTextInput 
                value={value}
                alignment={Alignment.End}
                changeValue={onChange}
                color={BgColor.Transparent}
                fontcolor={FontColor.Dark}/> 
        </div>
    </div>
    )
}


interface SelectionProps {
    label: string
    icon?: string
    value: string
    options: SelectItem[]
    setValue: (newValue: string) => void
}

export function UserSelectionSetting({label, icon,  value, setValue, options}: SelectionProps) {
    return(
        <div className="d-flex align-items-center  mb-1">
        {icon && <SimpleIcon 
            icon={icon} 
            font={Fonts.H5} /> }
        <div className="ms-2 d-flex justify-content-between w-100 align-items-center s-settings-editable">
            <h6 className="m-0 mt-2 mb-2 user-select-none me-2">
                    {label}
            </h6> 
            <SimpleSelectionInput selectedValue={value} onSelectedValueChange={setValue} options={options} />
        </div>
    </div>
            
    )
}

interface CheckboxProps{
    label: string
    icon: string
    onChange: (newValue: boolean) => void
    value: boolean
}

export function UserCheckboxSetting({label, icon, onChange, value }: CheckboxProps) {
    return (  
        <div className="d-flex align-items-center mb-1 mt-2">
            <SimpleIcon 
                icon={icon} 
                font={Fonts.H5} />
            <div className="ms-2 d-flex justify-content-between w-100 align-items-center border-bottom s-settings-editable" onClick={() => onChange(!value)}>
                <h6 className="m-0 user-select-none">
                        {label}
                </h6> 
                <SimpleSwitch 
                    isChecked={value} 
                    onValueChange={ e => {
                        onChange(e.target.checked)
                    } } />
            </div>
        </div>
    )
}