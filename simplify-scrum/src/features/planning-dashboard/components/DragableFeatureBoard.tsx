import { useEffect, useState } from "react";
import { ListBoard } from "../../backlog/components/board/ListBoard";
import { Feature } from "../../backlog/data/DataIndex";
import { BacklogService } from "../../backlog/service/ServiceIndex";
import { DragableFeature, DragableTypes } from "./DragableFeature";
import { useDrop } from "react-dnd";

interface Props {
    intialFeatures: Feature[]
}

export function DragableFeatureBoard({intialFeatures}: Props){
    const [features, setFeatures] = useState(intialFeatures) 

    useEffect(() => {
      setFeatures(intialFeatures)
    }, [intialFeatures])

    const [{ isOver }, drop] = useDrop({
        accept: DragableTypes.Feature,
        drop: (item: { id: string }) => {setFeatures(prev => [...prev, ...intialFeatures.filter(f => f.guid == item.id)])},
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      });


    return (
    <div ref={drop} className="d-flex w-100 h-100 bg-dark">
        <ListBoard >
        {features.map(feature => <DragableFeature feature={feature} setFeatures={setFeatures} />)}
        </ListBoard>
    </div>
    )
}