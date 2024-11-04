import { useState } from "react"
import { Feature } from "../../backlog/data/DataIndex"
import { DragableFeature, DragableTypes } from "./DragableFeature";
import { useDrop } from "react-dnd";

interface Props {
    features: Feature[]
}

export function PlannedBoard({features}: Props){
  
    const [plannedItems, setPlannedItems] = useState<Feature[]>([])

    const [{ isOver }, drop] = useDrop({
        accept: DragableTypes.Feature,
        drop: (item: { id: string }) => {setPlannedItems(prev => [...prev, ...features.filter(f => f.guid == item.id)])},
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      });

    return (
        <div ref={drop} className="s-planned-board rounded shadow d-flex flex-column w-100 h-100 bg-dark justify-content-center align-items-center">
           <div className="d-flex w-100 justify-content-center mt-3 mb-3">
                <h3>
                    Sprint no. 1
                </h3>
           </div>
           
            {plannedItems.length == 0 ? (
                <div className="s-planned-board-placeholder">
                    <div className=" d-flex flex-column justify-content-center align-items-center w-50 text-center p-2 ">
                        <i className="bi bi-dropbox s-h3"></i>
                        <h6>
                            Drag and drop features to the sprint 
                        </h6>
                    </div>
               
                </div>
            ) : (
                plannedItems.map(feature => <DragableFeature feature={feature} setFeatures={setPlannedItems} /> )
            )}
            
        </div>
    )
}