import { useEffect, useRef, useState } from "react";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { CalendarInputProps } from "./CalendarInputProps";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { useTooltip } from "../../../hooks/useTooltip";
import { StandardInputTemplate } from "../shared/StandardInputTemplate";

export function CalendarInput({icon, placeholder, disabled, value, className, onValueChange, tooltipContent, validation}:CalendarInputProps){
    
        return(
            <LocalizationProvider dateAdapter={AdapterDateFns}>

                <StandardInputTemplate 
                    buttonVisible={false}
                    className={className + " s-input-datetime-div"}
                    tooltipContent={tooltipContent}
                    validation={validation}
                    icon={icon}
                    element={
                        <MobileDatePicker
                            format="dd/MM/yyyy"
                            className=" s-input-datetime w-100  d-flex justify-content-center align-items-center "
                            onChange={e => {onValueChange(e?.toString() ?? "")}} 
                            value={value} />
                    }
                    clearValue={() => {}} />
            </LocalizationProvider>
           

        )
}
