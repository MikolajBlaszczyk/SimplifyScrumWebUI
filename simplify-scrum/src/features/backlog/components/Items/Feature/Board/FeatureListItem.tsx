import { useEffect, useRef, useState } from "react"
import { EnumService } from "../../../../../../services/enum/StateEnumService"
import { Feature } from '../../../../data/Feature';
import { useSwipeable } from "react-swipeable"
import { BacklogService } from "../../../../../../services/CommonServicesIndex"
import { useBacklog } from "../../../../../../hooks/useContexts"
import { BacklogAction, DetailType } from '../../../../../../context/BacklogContext';

interface Props{ 
    feature: Feature
    index: number
}

export function FeatureListItem({index, feature}:Props){
    const {state, setState} = useBacklog()
    const [swipeAmount, setSwipeAmount] = useState(0)
    const [isRemoved, setIsRemoved] = useState(false)
    const rowRef = useRef<HTMLTableRowElement>(null)

    const editFeature = () => {
        setState({...state, action: BacklogAction.EditFeature, parentGuid: feature.projectGuid,  item:{
            itemGuid: feature.guid, 
            itemType: DetailType.Feature
        }})
    };

    const deleteFeature = async () => {
        setIsRemoved(true)
        const response  = BacklogService.deleteFeature(feature.guid)
       
    };

    const swipeHandlers = useSwipeable({
        onSwiping: (eventData) => {
            setSwipeAmount(eventData.deltaX)
        },
        onSwiped: () => {
            if (swipeAmount > 100) {
                deleteFeature()
            } else if (swipeAmount < -100) {
                editFeature()
            }
            setSwipeAmount(0)
        },
        trackMouse: true
    });

    useEffect(() => {
        if (rowRef.current) {
            rowRef.current.style.setProperty('--swipe-amount', `${swipeAmount}px`)
        }
    }, [swipeAmount])

    return isRemoved == true ? 
        <div></div>
        :
        <tr 
            {...swipeHandlers} 
            ref={rowRef}
            className={`d-flex w-100 swipeable-row ${swipeAmount !== 0 ? 'swiping' : ''}`}
            style={{
                touchAction: 'none',
                userSelect: 'none',
                cursor: 'grab',
            }}
        >
            <th className="col">{index}</th>
            <td  className="col">{feature.name}</td>
            <td  className="col">{EnumService.convertExtendedStatusToString(feature.state)}</td>
            <td  className="col">{feature.points}</td>
        </tr>
}