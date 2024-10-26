
interface Props{
    value: Date
    onValueChange: (newValue: string) => void
}

export function SimpleDateInput(props: Props){
    const {value, onValueChange} = props


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
        <div className="input-group input-group-sm mt-2">
            <label className="input-group-text">Date</label>
            <input className=" form-control" type="datetime-local" value={formatDateToLocalInput(value)} onChange={(e) => onValueChange(e.target.value)}/>
        </div>
    )
}