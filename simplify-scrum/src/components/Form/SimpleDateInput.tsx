import { Fonts } from "../../utils/UtilsIndex"
import { SimpleIcon } from "../ComponentsIndex"

interface Props{
    value: Date
    onValueChange: (newValue: string) => void
    label: string
    icon?: string
}

export function SimpleDateInput({value, onValueChange, label, icon}: Props){

    const formatDateToLocalInput = (date: Date) => {
        const pad = (n: number) => n < 10 ? '0' + n : n; // Helper to pad single-digit numbers
    
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); // Months are 0-based
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
    
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <div className="d-flex align-items-center ps-2  border border-1 rounded pt-1 justify-content-center mb-2  rounded">

            {icon && <SimpleIcon icon={`bi ${icon}`} font={Fonts.H5} />}
            <h6 className="m-0 mt-2 mb-2 ms-2 user-select-none me-2">
                {label}
            </h6>
        <input
            className=" s-min-w-80 form-control s-input border-0 mb-1"
            type="datetime-local"
            value={formatDateToLocalInput(value)}
            onChange={(e) => onValueChange(e.target.value)}
        />
    </div>
    )
}