import {  Alignment, SimpleTextInput } from "../../../components/ComponentsIndex";
import { ChangeEvent } from 'react';
import { BgColor, FontColor } from '../../../utils/ComponentUtils';

interface Props{
    icon: string
    label: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function UserEditableSettings({icon, label, value, onChange }: Props){ 
    return( 
        <div className="d-flex align-items-center mb-1">
        <i className={`bi ${icon} s-h5`}></i>
        <div className="ms-2 d-flex justify-content-between w-100 align-items-center border-bottom s-settings-editable">
            <h6 className="m-0">
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