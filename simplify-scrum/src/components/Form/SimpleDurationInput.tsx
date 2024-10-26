
interface Props{
    minValue: number,
    maxValue: number,
    value: number,
    onValueChange: (newValue: number) => void
}


export function SimpleDurationInput(props: Props){
    const {minValue, maxValue, value, onValueChange} = props

    return (
    <div className="mt-2">
            <label className="form-label">Duration in minutes: {value}</label>
            <input type="range" className=" form-range" min={minValue} max={maxValue} value={value} onChange={(e) => onValueChange(parseInt(e.target.value))} step="1"/>
    </div>
    )
}