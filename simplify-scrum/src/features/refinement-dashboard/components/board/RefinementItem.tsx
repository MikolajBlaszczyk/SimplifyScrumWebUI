import { MouseEvent, useEffect, useRef, useState } from "react"
import { Button } from "../../../../components/ComponentsIndex"
import { Feature } from "../../../backlog/data/Feature"
import { useSwipeable } from "react-swipeable"
import { EnumService } from "../../../../services/CommonServicesIndex"
import { useRefinement } from "../../../../hooks/useContexts"
import { RefinementAction } from "../../../../context/ContextsIndex"

interface Props {
    feature: Feature
    index: number
}

export function RefinementItem({feature, index}: Props){
    const {state, setState} = useRefinement()

    const [swipeAmount, setSwipeAmount] = useState(0)
    const rowRef = useRef<HTMLTableRowElement>(null)

    const swipeHandlers = useSwipeable({
        onSwiping: (eventData) => {
            setSwipeAmount(eventData.deltaX)
        },
        onSwiped: () => {
            if (swipeAmount > 100) {
                setState({...state, action: RefinementAction.Refine, itemGuid: feature.guid})
            } else if (swipeAmount < -100) {
                setState({...state, action: RefinementAction.EditItem, itemGuid: feature.guid})
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

    return(

        
        <tr 
            {...swipeHandlers} 
            ref={rowRef}
            className={`d-flex w-100 swipeable-row-refinement ${swipeAmount !== 0 ? 'swiping' : ''}`}
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
    )
}