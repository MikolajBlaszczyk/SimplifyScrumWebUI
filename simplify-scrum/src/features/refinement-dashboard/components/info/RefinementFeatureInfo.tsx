import { useEffect, useMemo, useState } from "react"
import { BacklogService } from "../../../../services/CommonServicesIndex"
import { DataLoader, ExtendedDataLoader } from "../../../../data/CommonDataIndex"
import { Feature } from "../../../backlog/data/DataIndex"
import { Button, Placeholder, SelectionInput, SelectItem, SimpleSelectionInput, SimpleSwitch, StandardHeader } from "../../../../components/ComponentsIndex"
import { RefinementService } from "../../services/RefinementSerivce"
import { useRefinement } from "../../../../hooks/useContexts"
import { RefinementAction } from "../../../../context/RefinementContext"
import { MultiTextInput } from "../../../../components/form/text-input/MultiTextInput"
import { SwitchInput } from '../../../../components/form/switch-input/SwitchInput';
import { Role, Size, Style } from '../../../../components/common/button/ButtonProps';
import { CheckState, SelectState } from "../../../../components/form/shared/SharedProps"
import { setRef } from "@mui/material"
import { set } from 'date-fns';
import { useAlert } from "../../../../hooks/useAlert"
import { AlertStyle } from "../../../alerting/components/Alert"

interface Props {
    guid: string
}

export function RefinementFeatureInfo({guid}: Props){
    const showAlert = useAlert()
    const {state, setState} = useRefinement()
    
    const [featureLodaer, setFeatureLodaer] = useState<ExtendedDataLoader<Feature>>(DataLoader.default())
    const [refinedState, setRefinedState] = useState<CheckState>({checked: false, validation: {isValid: true, message: ""}})
    const [pointsState, setPointsState] = useState<SelectState>({value: undefined, validation: {isValid: true, message: ""}})


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

    const validateRefineSwitchForFeatureRefine = () => {
        if(refinedState.checked === false){
            showAlert(AlertStyle.Warning, "Please set feature as refined.")
           return false
        }

        return true
    }

    const validatePointsForFeatureRefine = () => {
        if(pointsState.value === undefined){
            setPointsState(prev => ({...prev, validation: {isValid: false, message: "Please set points to refine feature."}}))
            return false
        }
        return true
    }

    const additionalInfo = async () => {
        await RefinementService.getMoreInfo(guid)
        setState({...state, action: RefinementAction.ShowItems})
    }

    const split = async () => {


        await RefinementService.splitFeature(guid)
        setState({...state, action: RefinementAction.ShowItems})
    }

    const setFeatureAsRefined = async () => {
        let isValid = true
        if(validatePointsForFeatureRefine() == false)
            isValid = false
        if(validateRefineSwitchForFeatureRefine() == false) 
            isValid = false
        if(isValid === false) return

        await RefinementService.refinedFeature(guid, parseInt(pointsState.value!))
        setState({...state, action: RefinementAction.ShowItems})
    }

 
    const fetchData = async () => {
        const feature = await BacklogService.getFeature(guid)

        if(feature != null){
            setFeatureLodaer(DataLoader.dataFinishedLoading(featureLodaer, feature, false))
        } else {
            setFeatureLodaer(DataLoader.dataFinishedLoading(featureLodaer, null, true))
        }
    }



    useEffect(() => {
        fetchData()
    }, [guid])


    return (featureLodaer.placeholder 
                ? 
                <Placeholder /> 
                :
          
                <div className="d-flex justify-content-between " style={{ minHeight: "500px" }}>
                    <div className="s-w-60  h-100 p-3">
                        <MultiTextInput 
                            initialRows={8}
                            className="refinement-desc"
                            icon="bi-card-text"
                            readonly={true}
                            value={featureLodaer.getData().description}
                            changeValue={() => {}} />
                    </div>
                    <div className="d-flex flex-column justify-content-between s-w-40 border-start border-2  p-3">
                        <div className="d-flex flex-column w-100  align-items-center"> 
              
                            <SwitchInput 
                                icon="bi-flag-fill"
                                placeholder="Feature refined"
                                isChecked={refinedState.checked} 
                                validation={refinedState.validation}
                                changeValue={e => setRefinedState(prev => ({...prev, checked: e}))} />
                 
                            <SelectionInput 
                                className="mt-3"
                                icon="bi-123"
                                placeholder="Points"
                                validation={pointsState.validation}
                                selectedValue={pointsState.value}
                                onSelectedValueChange={(e) => setPointsState(prev => ({...prev, value: e}))}
                                options={pointOptions} />
                        </div>
                        
                        <div className="d-flex w-100 justify-content-between">
                            <Button 
                                style={Style.Filled}
                                role={Role.Destructive}
                                size={Size.Medium}
                                title="Split"
                                onClick={() => {split()}} />

                            <Button 
                                style={Style.Filled}
                                size={Size.Medium}
                                role={Role.Normal}
                                title="More info"
                                onClick={() => {additionalInfo()}} />

                            <Button 
                                style={Style.Filled}
                                role={Role.Primary}
                                size={Size.Medium}
                                title="Refined"
                                onClick={() => {setFeatureAsRefined()}} />
                        
                        </div>
                    </div>
                </div>)
}