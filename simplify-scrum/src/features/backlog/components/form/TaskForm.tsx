import { useEffect, useState } from "react"
import { SelectItem, SimpleSelectionInput, SimpleTextInput } from "../../../../components/ComponentsIndex"
import { SimpleStatus } from "../../data/State"
import { BacklogService, EnumService } from "../../../../services/CommonServicesIndex"
import { Feature } from "../../data/DataIndex"
import { User } from "../../../../data/CommonDataIndex"


export default function TaskForm() {
    const [name, setName] = useState<string>('')
    const [status, setStatus] = useState<SimpleStatus>(SimpleStatus.ToBeDone)
    const [feature, setFeature] = useState<Feature>(Feature.default())
    const [assigne, setAssigne] = useState<User>(User.default())

    let statusOptions: SelectItem[] = []
    let featureOptions: SelectItem[] = []
    let assigneOptions: SelectItem[] = []

    const setNewStatusValue = (stringValue: string) => {
        const newState = EnumService.convertStringToSimpleStatus(stringValue)
        setStatus(newState)
    }
    const setNewFeatureValue = (guid: string) => {
        const featureSelected = featureOptions
            .map(item => item.value)

    }

    useEffect(() => {
        statusOptions = BacklogService
            .getSimpleState()
            .map( state => {
                const item: SelectItem = {
                    value: state ,
                    description:state 
                }

                return item
            })

        
        
    }, [])

  
    return(
        <form onSubmit={e => e.preventDefault()}>
            <SimpleTextInput 
                value={name}
                changeValue={e => setName(e.target.value)} />
            <SimpleSelectionInput 
                selectedValue={EnumService.convertSimpleStatusToString(status)}
                onSelectedValueChange={setNewStatusValue} 
                options={statusOptions}/>
        
        </form>
    )
}