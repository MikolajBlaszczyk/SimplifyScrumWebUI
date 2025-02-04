import { useEffect, useState } from "react";
import { Button } from "../../../components/ComponentsIndex";
import { MultiSelectionInput } from "../../../components/form/selection-input/MultiSelectionInput";
import { Role, Size, Style } from '../../../components/common/button/ButtonProps';
import { AccountService } from "../../account-settings/service/AccountService";
import { useHideModal, useLoading } from "../../../hooks/HooksIndex";
import { SelectItem } from "../../../components/form/selection-input/SelectionInputProps";




export function UsersSelection() {
    const hideModal = useHideModal()
    const {shouldReload, setShouldReload} =  useLoading()
    const [options, setOptions] = useState<SelectItem[]>([])
    const [selectedValues, setSelectedValues] = useState<SelectItem[]>([])
    const [teamGuid, setTeamGuid] = useState<string>("")

    const fetchData = async () => {
        const leader = await AccountService.getInfo()
        setTeamGuid(leader.teamGuid)         
        
        const teamMembers = await AccountService.getTeamMembers()
        const users = await AccountService.getUsers()
      
        setOptions(users.map(user => ({value: user.id, description: user.nickname})))
        setSelectedValues(teamMembers.map(user => ({value: user.id, description: user.nickname})))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const updateTeamMembers = async () => {
        await AccountService.updateTeamMembers(selectedValues.map(value => value.value), teamGuid)
        fetchData()
        setShouldReload(shouldReload + 1)
    }

    return (
        <div className="mt-3 d-flex w-100 flex-column">
            <MultiSelectionInput 
                    icon="bi-person"
                    selectedValues={selectedValues} 
                    onSelectedValuesChange={(values) => {
                        setSelectedValues(values)
                    }}
                    options={options} />
            <div className="d-flex justify-content-center mt-3">
                <Button 
                    style={Style.Filled}
                    size={Size.Medium}
                    role={Role.Primary}
                    title={"Save team members"}
                    onClick={() => {
                        updateTeamMembers()
                        hideModal()
                    }} />
            </div>
        </div>
    )
}