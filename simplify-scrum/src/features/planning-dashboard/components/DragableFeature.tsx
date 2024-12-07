import { useDrag } from "react-dnd";
import { Feature } from "../../backlog/data/Feature";
import { SimpleCard } from "../../../components/ComponentsIndex";
import { useEffect, useMemo, useState } from "react";
import { AccountService } from "../../account-settings/service/AccountService";


export const DragableTypes = {
    Feature: 'Feature',
}

interface Props {
    feature: Feature
    setFeatures: (feature: Feature) => void;
}

export function DragableFeature({feature, setFeatures}: Props){
    const [userName, setUserName] = useState<string>("")

    const [{ isDragging }, drag] = useDrag({
        type: DragableTypes.Feature,
        item: { id: feature.guid},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      })



    const fetchData = async () => {
        const users = await AccountService.getUsers()
        const user = users.find(u => u.id == feature.createdBy)
        setUserName(user?.nickname || "")
    }



    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="d-flex w-100 justify-content-center mb-4">
            <div ref={drag} className="card w-75">
                <div className="card-body s-card-body">
                    <h4 className="card-title common-header">
                        Name: {feature.name}
                    </h4>
                    <p className="card-text mt-1">
                        Points:{feature.points}
                    </p>
                    <p className="card-text s-card-addon mt-2">
                        CreatedBy {userName}
                    </p>
                </div>
            </div>
        </div>
        
    )
}