import { useDrag } from "react-dnd";
import { Feature } from "../../backlog/data/Feature";
import { SimpleCard } from "../../../components/ComponentsIndex";
import { useEffect } from "react";

export const DragableTypes = {
    Feature: 'Feature',
}

interface Props {
    feature: Feature
    setFeatures: React.Dispatch<React.SetStateAction<Feature[]>> 
}

export function DragableFeature({feature, setFeatures}: Props){
    const [{ isDragging }, drag] = useDrag({
        type: DragableTypes.Feature,
        item: { id: feature.guid},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      })

    useEffect(() => {
        if(isDragging)
            setFeatures(prev => [...prev.filter(f => f.guid != feature.guid)])
    }, [isDragging])

    return (
        <div ref={drag} className="card ">
            <div className="card-body s-card-body">
                <h4 className="card-title common-header">
                    {feature.title}
                </h4>
                <p className="card-text mt-1">
                    {feature.description}
                </p>
                <p className="card-text s-card-addon mt-2">
                    {''}
                </p>
            </div>
        </div>
    )
}