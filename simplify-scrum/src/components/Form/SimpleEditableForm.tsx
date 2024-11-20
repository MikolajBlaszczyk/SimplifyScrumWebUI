import { ChangeEvent } from "react"
import { UserEditableSettings } from "../../features/account-settings/components/UserEditableSettings"
import { SimpleSwitch } from "../ComponentsIndex"

export enum InputType {
    Text,
    Switch
}

export interface Input {
    type: InputType
    label: string
    icon: string 
    value: any
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface Section { 
    title: string,
    inputs: Input[]
}

interface Props {
    sections: Section[]
}


export function SimpleEditableForm({sections}: Props) {
    const inputMapper = (input: Input) => {
        switch(input.type){
            case InputType.Text:
                return (
                    <UserEditableSettings 
                        icon={input.icon} 
                        label={input.label} 
                        value={input.value}
                        onChange={input.onChange}/>
                )
            case InputType.Switch:
                return (
                    <div className="ms-2 d-flex justify-content-between w-100 align-items-center border-bottom s-settings-editable" onClick={() => {/*TODO: Implement */}}>
                        <h6 className="m-0">
                                {input.label}
                        </h6> 
                        <SimpleSwitch 
                                    isChecked={input.value} 
                                    onValueChange={input.onChange} />
                    </div>
                    
                )
        }
    }

    return (
        <form className="d-flex flex-column" onSubmit={e => e.preventDefault()}>
            {
                sections.map(section => (
                    <section className="mb-5 bg-dark s-settings-section">
                        <h4>
                            {section.title}
                        </h4>

                        {
                            section.inputs.map(inputMapper)
                        }
                    </section>
                ))
            }
        </form>
    )
}