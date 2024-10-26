import { useEffect, useState } from "react"
import { SelectItem, SimpleSelectionInput, SimpleTextInput } from "../../../../components/ComponentsIndex"
import { SimpleStatus } from "../../data/State"
import { BacklogService, StateEnumService } from "../../service/ServiceIndex"
import { Feature } from "../../data/DataIndex"
import { User } from "../../../common-data/DataIndex"


export default function TaskForm() {
    const [name, setName] = useState<string>('')
    const [status, setStatus] = useState<SimpleStatus>(SimpleStatus.ToBeDone)
    const [feature, setFeature] = useState<Feature>(Feature.Default())
    const [assigne, setAssigne] = useState<User>(User.Default())

    let statusOptions: SelectItem<string>[] = []
    let featureOptions: SelectItem<Feature>[] = []
    let assigneOptions: SelectItem<User>[] = []

    const setNewStatusValue = (stringValue: string) => {
        const newState = StateEnumService.convertStringToSimpleStatus(stringValue)
        setStatus(newState)
    }
    const setNewFeatureValue = (guid: string) => {
        const featureSelected = featureOptions
            .map(item => item.value)
            .find( feature => feature.guid == guid)!

        setFeature(featureSelected) 
    }
    const setNewAssingeValue = (id: string) => { 
        const assigneSelected = assigneOptions
            .map(item => item.value)
            .find( assigne => assigne.id == id)!

        setAssigne(assigneSelected)
    }

    useEffect(() => {
        statusOptions = BacklogService
            .getSimpleState()
            .map( state => {
                const item: SelectItem<string> = {
                    value: StateEnumService.convertSimpleStatusToString(state as SimpleStatus),
                    description: StateEnumService.convertSimpleStatusToString(state as SimpleStatus)
                }

                return item
            })

        featureOptions = BacklogService 
            .getFeatures()
            .map( feature => {
                const item: SelectItem<Feature> = {
                    value: feature,
                    description: feature.title
                }
                return item
            })
        
        assigneOptions = BacklogService
            .getAssignes()
            .map( assigne => {
                const item: SelectItem<User> = {
                    value: assigne,
                    description: assigne.nickname
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
                selectedValue={StateEnumService.convertSimpleStatusToString(status)}
                onSelectedValueChange={setNewStatusValue} 
                options={statusOptions}/>
            <SimpleSelectionInput 
                selectedValue={feature}
                onSelectedValueChange={setNewFeatureValue}
                options={featureOptions}/> 
            <SimpleSelectionInput
                selectedValue={assigne}
                onSelectedValueChange={setNewAssingeValue}
                options={assigneOptions}/>
        </form>
    )
}