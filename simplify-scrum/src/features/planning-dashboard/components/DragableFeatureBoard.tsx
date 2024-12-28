import { useEffect, useState } from "react";
import { ListBoard } from "../../backlog/components/board/ListBoard";
import { Feature } from "../../backlog/data/DataIndex";
import { DragableFeature, DragableTypes } from "./DragableFeature";
import { useDrop } from "react-dnd";

interface Props {
    features: Feature[]
    plannedItems: Feature[];
    onDropFeature: (feature: Feature) => void;
    onRemoveFeature: (feature: Feature) => void;
}

export function DragableFeatureBoard({features, plannedItems, onDropFeature, onRemoveFeature}: Props){
  

    const [{ isOver }, drop] = useDrop({
        accept: DragableTypes.Feature,
        drop: (item: { id: string }) => {
          const feature = plannedItems.find(f => f.guid === item.id);
          if (feature) {
              onRemoveFeature(feature);
          }
        },
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
        }),
      });


    return (
    <div ref={drop} className="d-flex w-100 h-100 s-bg-dark">
        <ListBoard >
        {features.map(feature => <DragableFeature feature={feature} setFeatures={onDropFeature} />)}
        </ListBoard>
    </div>
    )
}