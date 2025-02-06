import React, { useEffect, useMemo, useState } from 'react';
import { SelectionInput } from '../../../components/ComponentsIndex';
import { AccountService } from '../../account-settings/service/AccountService';
import { Role, User } from '../../../data/CommonDataIndex';
import { useLoading } from '../../../hooks/useContexts';


export function UserRoleSelection() {
    const [teamMembers, setTeamMembers] = useState<User[]>([]);
       const {shouldReload, setShouldReload} = useLoading()

    const list = useMemo(() => {
        return teamMembers.map((user, index) => {
            return (
                <li className={"list-group-item s-list-item d-flex justify-content-between " + (index === teamMembers.length - 1 ? " " : " border-bottom")} key={index}>
                    <h6 className="mt-2">{user.nickname}</h6>
                    <SelectionInput
                        className="ms-5"
                        selectedValue={user.role.toString()}
                        onSelectedValueChange={(newRole) => {
                            user.role = parseInt(newRole);
                            AccountService.updateUser(user).then(() => setShouldReload(shouldReload + 1));
                        }}
                        options={[
                            { value: Role.DevelopmentTeam.toString(), description: 'Development team' },
                            { value: Role.ProjectOwner.toString(), description: 'Project owner' },
                            { value: Role.ScrumMaster.toString(), description: 'Scrum master' }
                        ]}
                    />
                </li>
            );
        });
    }, [teamMembers, shouldReload]);

    const fetchData = async () => {
        const users = await AccountService.getTeamMembers();
        if (users != null) {
            setTeamMembers(users);
        }
    };

    useEffect(() => {
        fetchData();
    }, [shouldReload]);

    return (
        <div className="d-flex flex-column w-100 h-100">
            <h5 className="w-100 text-start">User Roles</h5>
            <ul className="s-list list-group w-100">
                {list}
            </ul>
        </div>
    );
}