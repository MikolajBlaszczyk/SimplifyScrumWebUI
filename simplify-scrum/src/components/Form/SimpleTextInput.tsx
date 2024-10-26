
interface Props {
    label?: string
    value: string
    changeValue: (newValue: React.ChangeEvent<HTMLInputElement>) => void
}

export function SimpleTextInput(props: Props){
    return(
        <div className="input-group input-group-sm">
            <label className="input-group-text">{props.label}</label>
            <input 
                type="text"
                placeholder="Name" 
                className="form-control"
                value={props.value} 
                onChange={props.changeValue}/>
        </div>
    )
}