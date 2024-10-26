interface Props { 
    value: string
    onChange: (newValue: React.ChangeEvent<HTMLTextAreaElement>) => void
    label?: string
}

export function SimpleMultiLineTextInput({value, onChange, label }: Props){
    return(
        <div className="form-floating">
            {label && <label>{label}</label>}
            <textarea className="form-control" value={value} onChange={onChange}/>
        </div>
    )
}