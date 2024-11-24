import { useEffect, useMemo, useState } from "react"
import { ExtendedStatus, Feature, Project } from "../../../../data/DataIndex"
import { Button, Color, SelectItem, SimpleButton, SimpleMultiLineTextInput, SimpleSelectionInput, SimpleTextInput } from "../../../../../../components/ComponentsIndex"
import { BacklogService, EnumService } from "../../../../../../services/CommonServicesIndex"
import { BgColor, FontColor, Fonts } from "../../../../../../utils/UtilsIndex"
import { useAlert } from "../../../../../../hooks/HooksIndex"
import { AlertType } from "../../../../../alerting/components/Alert"
import { GenericEnumService } from "../../../../../../services/enum/GenericEnumService"
import { stat } from "fs"

interface Props {
    guid?: string
    projectGuid: string
}

export default function FeatureEdit({guid, projectGuid}: Props) {
    const showAlert = useAlert()
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [state, setState] = useState<ExtendedStatus>(ExtendedStatus.New)
    const [points, setPoints] = useState<number>(-1)
   
    const addNewFeature = async () => {
        const feature = new Feature('', name, description, state, points, projectGuid, '', new Date(), '', new Date())
        await BacklogService.addFeature(feature)
    }

    let stateOptions: SelectItem[] = useMemo(() => {
        return GenericEnumService.getEnumNames(ExtendedStatus)
        .map( state => {
            const item: SelectItem = {
                value: state,
                description: state
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
    let projectOptions: SelectItem[] = []

    const setNewState = (stateAsString: string) => {
        setState(EnumService.convertStringToExtendedStatus(stateAsString))
    }
    const setNewPoints = (numberAsString: string) => {
        setPoints(parseInt(numberAsString))
    }

    const fetchData = async () => {
        if(guid == undefined || guid.length == 0)
            return 

        const feature = await BacklogService.getFeature(guid)
        setName(feature.name)
        setDescription(feature.description ?? '')
        setState(feature.state)
        setPoints(feature.points)
    }

    useEffect(() => {
        BacklogService
            .getProjects()
            .then(projects =>{
                projectOptions = projects.map(project => {
                    const item: SelectItem = {
                        value: project.guid,
                        description: project.name
                    }
    
                    return item
                })
            })
        
        fetchData()
    }, [])

    return (
        <form onSubmit={e => e.preventDefault()}>
            <SimpleTextInput
                label="Name"
                icon="bi-alphabet"
                value={name} 
                fontcolor={FontColor.Dark}
                changeValue={e => setName(e.target.value)} 
                color={BgColor.Transparent}
                />
            <div className="mb-2"></div>
            
            <SimpleSelectionInput
                label="State"
                icon="bi-check-all"
                selectedValue={EnumService.convertExtendedStatusToString(state)}
                onSelectedValueChange={setNewState}
                options={stateOptions} />
            <div className="mb-2"></div>
            <SimpleSelectionInput 
                label="Points"
                icon="bi-123"
                selectedValue={points.toString()} 
                onSelectedValueChange={setNewPoints}
                options={pointOptions} />
            <div className="mb-2"></div>
            <SimpleMultiLineTextInput
                label="Description"
                icon="bi-card-text"
                value={description} 
                onChange={e => setDescription(e.target.value)} />

            <div className="mt-4 d-flex p-2  justify-content-end">
                <SimpleButton 
                    type={Button.Primary}
                    title={guid == undefined ? "Save" : "Update"} 
                    fontColor={Color.Light}
                    font={Fonts.H5}
                    onClick={() => {addNewFeature()}} />

                <div className="ms-3"></div>

                <SimpleButton 
                    type={Button.Danger}
                    title={guid == undefined ? "Abort" : "Delete"} 
                    fontColor={Color.Light}
                    font={Fonts.H5}
                    onClick={() => {showAlert(AlertType.Warning, "Not implemented yet")}} />
            </div> 
        </form>
    )
}