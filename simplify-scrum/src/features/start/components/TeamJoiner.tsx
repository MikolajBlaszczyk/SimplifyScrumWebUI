import { MouseEvent, useEffect, useState } from "react";
import { Button, SelectionInput } from "../../../components/ComponentsIndex";
import { AccountService } from "../../account-settings/service/AccountService";
import { useAlert } from "../../../hooks/HooksIndex";
import { AlertStyle } from "../../alerting/components/Alert";
import { Role, Style } from "../../../components/common/button/ButtonProps";
import { SelectItem } from "../../../components/form/selection-input/SelectionInputProps";

export function TeamJoiner(){
    const showAlert = useAlert()
    const [options, setOptions] = useState<SelectItem[]>([])
    const [selectedValue, setSelectedValue] = useState<string>('')

    const fetchData = async () => {
        const teams = await AccountService.getTeams()
        const users = await AccountService.getUsers()

        const managers = users.filter(user => teams.some(team => team.managerGUID == user.id))

        setOptions(managers.map(manager => {
            return {
                value: manager.id,
                description: manager.nickname
            }
        }))

    }

    useEffect(() => {
        fetchData()
    }, [])

    const askToJoin = () => {
        showAlert(AlertStyle.Warning, "Not implemented yet", "Warning")
    }

    return (
        <div className="w-100 d-flex flex-column">
            <SelectionInput 
                className="mt-3"
                selectedValue={selectedValue}
                onSelectedValueChange={(value) => {
                    setSelectedValue(value)
                }} 
                options={options}/>

            <div className="mt-3 d-flex justify-content-center">
                <Button 
                   
                    role={Role.Primary}
                    style={Style.Filled}
                    title="Ask to join"
                    onClick={() => {}} />
            </div>
        </div>
    )
}