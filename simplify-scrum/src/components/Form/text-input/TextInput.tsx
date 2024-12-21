import { MouseEvent, useEffect, useRef, useState } from "react"
import { Button, StandardInputTemplate } from "../../ComponentsIndex"
import { TextInputProps, textTypes, TextType } from "./TextInputProps"
import { Role, Size, Style } from "../../common/button/ButtonProps"
import {Tooltip } from 'bootstrap';


export function TextInput({icon, placeholder, disabled, readonly, textType, value, changeValue, buttonVisible, tooltipContent, validation}: TextInputProps){
    const type = textTypes[textType ?? TextType.Text]

    return(
        <StandardInputTemplate
            icon={icon}
            tooltipContent={tooltipContent}
            validation={validation}
            buttonVisible={buttonVisible}
            element={<input 
                className="d-flex w-100"
                value={value}
                onChange={e => {changeValue(e.target.value)}}
                type={type}
                placeholder={placeholder}
                readOnly={readonly}
                disabled={disabled} 
                required={true}/>}
            clearValue={() => {changeValue("")}} />
    )
}
