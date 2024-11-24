import { Fonts } from "../../utils/UtilsIndex"
import { SimpleIcon } from "../ComponentsIndex"

interface Props { 
    label: string
    icon?: string
    value: string
    onChange: (newValue: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function SimpleMultiLineTextInput({value, onChange, label, icon}: Props){
    return(
        <div className="d-flex flex-column align-items-center ps-2 pt-1 justify-content-center mb-2 border rounded">
            <div className="mb-1 ms-1 d-flex w-100 align-items-center ">     
                {icon && <SimpleIcon 
                    icon={icon} 
                    font={Fonts.H5} /> }
                 <h6 className="m-0 mt-2 mb-2 ms-2 user-select-none me-2">
                        {label}
                </h6> 
            </div>
            <textarea className="s-textarea mb-1 border-0" style={{minWidth: "40vw", minHeight: "30vh"}} value={value} onChange={onChange}/>
        </div>
    )
}