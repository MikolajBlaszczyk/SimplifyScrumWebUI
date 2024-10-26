
interface Props {
    label?: string
    disabled?: boolean
    readonly? :boolean
    value: string
    changeValue: (newValue: React.ChangeEvent<HTMLInputElement>) => void
}

export function SimpleTextInput({label, value, changeValue, disabled, readonly}: Props){

    let input = (<input 
        type="text"
        placeholder="Name" 
        className="form-control"
        value={value} 
        onChange={changeValue}/>)

    if (disabled && readonly){
        input = (<input 
            type="text"
            placeholder="Name" 
            className="form-control"
            value={value} 
            onChange={changeValue}
            disabled
            readOnly/>)
    }

    if(disabled){
        input = (<input 
            type="text"
            placeholder="Name" 
            className="form-control"
            value={value} 
            onChange={changeValue}
            disabled/>)
    }

    if(readonly) {
        input = (<input 
            type="text"
            placeholder="Name" 
            className="form-control"
            value={value} 
            onChange={changeValue}
            readOnly/>)
    }


    return(
        <div className="input-group input-group-sm">
            <label className="input-group-text">{label}</label>
            {input}
        </div>
    )
}