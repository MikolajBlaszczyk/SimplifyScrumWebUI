import { MouseEvent, useEffect, useMemo, useState } from "react"
import { ExtendedStatus, Feature, Project } from "../../../../data/DataIndex"
import { Button,  SelectionInput,  SelectItem, SimpleMultiLineTextInput, SimpleSelectionInput, SimpleTextInput, TextInput } from "../../../../../../components/ComponentsIndex"
import { BacklogService, EnumService } from "../../../../../../services/CommonServicesIndex"
import { BgColor, FontColor, Fonts } from "../../../../../../utils/UtilsIndex"
import { useAlert, useBacklog, useLoading } from "../../../../../../hooks/HooksIndex"
import { AlertStyle, AlertType } from "../../../../../alerting/components/Alert"
import { GenericEnumService } from "../../../../../../services/enum/GenericEnumService"
import { stat } from "fs"
import { SelectState, TextState } from "../../../../../../components/form/shared/SharedProps"
import { MultiTextInput } from "../../../../../../components/form/text-input/MultiTextInput"
import { Role, Size, Style } from "../../../../../../components/common/button/ButtonProps"
import { BacklogAction } from "../../../../../../context/BacklogContext"

interface Props {
    guid?: string
    projectGuid: string
}

export default function FeatureEdit({guid, projectGuid}: Props) {
    const {state, setState} = useBacklog()
    const {shouldReload, setShouldReload} = useLoading()
    const showAlert = useAlert()
    const [nameState, setNameState] = useState<TextState>({value: "", validation: {isValid: true, message: ""}})
    const [descriptionState, setDescriptionState] = useState<TextState>({value: "", validation: {isValid: true, message: ""}})
    const [statusState, setStatusState] = useState<SelectState>({value: undefined, validation: {isValid: true, message: ""}})
    const [pointsState, setPoints] = useState<SelectState>({value: undefined, validation: {isValid: true, message: ""}})
   
    let stateOptions: SelectItem[] = useMemo(() => {
        return Object.values(GenericEnumService.getEnumDictionary(ExtendedStatus))
        .map(state => {
            const item: SelectItem = {
                value: state.toString(),
                description: EnumService.convertExtendedStatusToString(state)
            }
            return item
        })   
    }, [])
    let pointOptions: SelectItem[] = useMemo(() => {
        return [
            {value: '-1', description: 'Not yet refined'},
            {value: '1', description: '1'},
            {value: '2', description: '2'},
            {value: '3', description: '3'},
            {value: '5', description: '5'},
            {value: '8', description: '8'}
        ]
    }, [])

    const addFeature = async () => {
        const feature = new Feature(
            '',
            nameState.value,
            descriptionState.value,
            parseInt(statusState.value!),
            pointsState.value != undefined ? parseInt(pointsState.value) : -1,
            projectGuid,
            '',
            new Date(),
            '',
            new Date())
        const isSuccess = await BacklogService.addFeature(feature)
        if(isSuccess){
            showAlert(AlertStyle.Success, "Feature added successfully")
            setShouldReload(shouldReload + 1)
            setState({...state, action: BacklogAction.ShowFeatures})
        } else {
            showAlert(AlertStyle.Danger, "Failed to add feature")
        }
    }

    const updateFeature = async () => {
        const feature = await BacklogService.getFeature(guid!)
        feature.name = nameState.value
        feature.description = descriptionState.value
        feature.state = parseInt(statusState.value!)
        feature.points = pointsState.value != undefined ? parseInt(pointsState.value) : -1
        const isSuccess = await BacklogService.updateFeature(feature)
        if(isSuccess){
            showAlert(AlertStyle.Success, "Feature updated successfully")
            setShouldReload(shouldReload + 1)
            setState({...state, action: BacklogAction.ShowFeatures})
        } else {
            showAlert(AlertStyle.Danger, "Failed to add feature")
        }
    }

    const fetchData = async () => {
        if(guid == undefined || guid == null || guid.length == 0)
            return 

        const feature = await BacklogService.getFeature(guid)
        setNameState(prev => ({...prev, value: feature.name}))
        setDescriptionState(prev => ({...prev, value: feature.description ?? ''}))
        setStatusState(prev => ({...prev, value: feature.state.toString()}))
        setPoints(prev => ({...prev, value: feature.points.toString()}) )
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className=" w-75 p-3 mt-3 mb-5 d-flex flex-column overflow-y-auto justify-content-center s-settings-section feature-edit">

            <TextInput 
                icon="bi-alphabet"
                placeholder="Name"
                validation={nameState.validation}
                value={nameState.value}
                changeValue={e => setNameState(prev => ({...prev, value: e})) } />

            <MultiTextInput 
                icon="bi-card-text"
                className="mt-3"
                value={descriptionState.value} 
                changeValue={e => setDescriptionState(prev => ({...prev, value: e})) } />
            
            <SelectionInput 
                className="mt-3"
                placeholder="Status"
                icon="bi-check-all"
                selectedValue={statusState.value }
                onSelectedValueChange={e => setStatusState(prev => ({...prev, value: e}))}
                options={stateOptions} />

            <SelectionInput 
                className="mt-3"
                placeholder="Points"
                icon="bi-123"
                selectedValue={pointsState.value}
                validation={pointsState.validation}
                onSelectedValueChange={e => setPoints(prev => ({...prev, value: e}))}
                options={pointOptions}
                />
           
 

            <div className="mt-4 d-flex  justify-content-between">
                <Button 
                    size={Size.Large}
                    style={Style.Filled}
                    role={Role.Destructive}
                    title={guid == undefined ? "Abort" : "Delete"} 
                    onClick={() => {showAlert(AlertStyle.Info, "Not implemented yet")} } />

                <Button 
                    size={Size.Large}
                    style={Style.Filled}
                    role={Role.Primary}
                    title={guid == undefined ? "Save" : "Update"}
                    onClick={() => {guid == undefined ?  addFeature() : updateFeature()}}
                    />
             
            </div> 
        </section>
    )
}