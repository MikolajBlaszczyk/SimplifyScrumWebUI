import { useRefinement } from '../../../../hooks/useContexts';
import FeatureEdit from '../../../backlog/components/Items/Feature/Edit/FeatureEdit';

export function RefinementEdit(){
    const {state, setState} = useRefinement()

    return(
        <div className="d-flex flex-column bg-dark rounded p-3 w-75 ">
            <FeatureEdit projectGuid={state.itemGuid} /> 
        </div>
    )
}