import { useEffect, useRef, useState } from "react";
import { LocalizationProvider, MobileDatePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import { CalendarInputProps } from "./CalendarInputProps";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { useTooltip } from "../../../hooks/useTooltip";
import { StandardInputTemplate } from "../shared/StandardInputTemplate";

export function CalendarInput({icon, placeholder, disabled, value, className, onValueChange, time, tooltipContent, validation}:CalendarInputProps){
    
        let picker = time == true ? 
        <MobileDateTimePicker
            format="dd/MM/yyyy    HH:mm"
            className=" s-input-datetime w-100  d-flex justify-content-center align-items-center "
            onChange={e => {onValueChange(e?.toString() ?? "")}} 
            value={value} />
        :
        <MobileDatePicker
            format="dd/MM/yyyy"
            className=" s-input-datetime w-100  d-flex justify-content-center align-items-center "
            onChange={e => {onValueChange(e?.toString() ?? "")}} 
            value={value} />

        return(
            <LocalizationProvider dateAdapter={AdapterDateFns}>

                <StandardInputTemplate 
                    buttonVisible={false}
                    className={className + " s-input-datetime-div"}
                    tooltipContent={tooltipContent}
                    validation={validation}
                    icon={icon}
                    element={picker}
                    clearValue={() => {}} />
            </LocalizationProvider>
           

        )
}
