import { MouseEvent, useEffect, useMemo, useState } from "react"
import { BacklogService } from "../../../../services/CommonServicesIndex"
import { DataLoader } from "../../../../data/CommonDataIndex"
import { Feature } from "../../../backlog/data/DataIndex"
import { Button, Placeholder, SelectItem, SimpleSelectionInput, SimpleSwitch } from "../../../../components/ComponentsIndex"
import { set } from 'date-fns';
import { Alignment } from '../../../../components/form/SimpleTextInput';
import { Refinement } from "../../../../pages/Refinement"
import { RefinementService } from "../../services/RefinementSerivce"
import { useRefinement } from "../../../../hooks/useContexts"
import { RefinementAction } from "../../../../context/RefinementContext"

interface Props {
    guid: string
}

interface FormState {
    isRefined: boolean
    points: number
}

export function RefinementFeatureInfo({guid}: Props){
    const {state, setState} = useRefinement()

    const [featureLodaer, setFeatureLodaer] = useState<DataLoader>(DataLoader.default())
    const [formState, setFormState] = useState<FormState>({isRefined: false, points: -1})
    const [feature, setFeature] = useState<Feature | null>()

    const [canSubmit, setCanSubmit] = useState<boolean>(false)

    let pointOptions: SelectItem[] = useMemo(() => {
        return [
            {value: '-1', description: 'Not refined'},
            {value: '1', description: '1'},
            {value: '2', description: '2'},
            {value: '3', description: '3'},
            {value: '5', description: '5'},
            {value: '8', description: '8'},
            {value: '13', description: 'Split feature'}
        ]
    }, [])

    const additionalInfo = async () => {
        await RefinementService.getMoreInfo(guid)
        setState({...state, action: RefinementAction.ShowItems})
    }

    const split = async () => {
        await RefinementService.splitFeature(guid)
        setState({...state, action: RefinementAction.ShowItems})
    }

    const refined = async () => {
        await RefinementService.refinedFeature(guid, formState.points)
        setState({...state, action: RefinementAction.ShowItems})
    }

    const validateSubmit = () => {
        if( (formState.points == 13 || formState.points == -1) || formState.isRefined == false) {
            return false
        } else {
            return true
        }
    }

    const fetchData = async () => {
        const feature = await BacklogService.getFeature(guid)

        if(feature != null){
            setFeatureLodaer(DataLoader.dataFinishedLoading(featureLodaer, feature, false))
            setFeature(feature)
        } else {
            setFeatureLodaer(DataLoader.dataFinishedLoading(featureLodaer, null, true))
        }
    }

    useEffect(() => {
        setCanSubmit(validateSubmit())
    }, [formState])

    useEffect(() => {
        fetchData()
    }, [guid])

    const setNewPoints = (numberAsString: string) => {
        const points = parseInt(numberAsString)
        setFormState(prev => ({...prev, isRefined: ((points == 13 || points == -1) ? false : prev.isRefined),  points: points}))
    }

    return (
        <div className="d-flex flex-column bg-dark rounded p-3 w-75 ">
            {
                featureLodaer.placeholder ? 
                <Placeholder /> 
                :
                <>
                     <div className="d-flex align-items-center w-100 s-h-15 border-bottom border-3">
                        <h3>{feature!.name}</h3>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{ minHeight: "500px" }}>
                        <div className="s-w-60  h-100">
                            <div className=" border overflow-auto  h-50-important" style={{ maxHeight: "350px" }}>
                                <h6 className="m-0 h-100 p-2 text-justify">{feature!.description}</h6>
                            </div>
                    

                        </div>
                        <div className="d-flex flex-column justify-content-between s-w-30 border p-2">
                            <div>
                                <div className="mb-3 mt-3 ms-2 me-2">
                                    <SimpleSwitch 
                                        icon="bi-flag-fill"
                                        label="Refined"
                                        disabled={(formState.points == 13 || formState.points == -1)}
                                        isChecked={formState.isRefined}
                                        onValueChange={e => {
                                            setFormState(prev => ({...prev, isRefined:e.target.checked }))
                                        }}/>
                                </div>
                                <div className="mb-3 ms-2 me-2">
                                    <SimpleSelectionInput 
                                        label="Points"
                                        icon="bi-123"
                                        selectedValue={formState.points.toString()} 
                                        onSelectedValueChange={setNewPoints}
                                        options={pointOptions}/>
                                </div>
                            </div>
                            
                            <div className="d-flex w-100 justify-content-between">
                                {/* <SimpleButton
                                    type={Button.Danger} 
                                    title={"Split"}
                                    onClick={() => {split()}} />

                                <SimpleButton
                                    type={Button.Danger} 
                                    iconOnTheRight={false}
                                    icon="bi-plus-lg"
                                    title={"info"}
                                    onClick={() => {additionalInfo()}} />

                                <SimpleButton 
                                    disabled={!canSubmit}
                                    type={Button.Success} 
                                    title={"Refined"}
                                    onClick={() =>{refined()}} /> */}
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}