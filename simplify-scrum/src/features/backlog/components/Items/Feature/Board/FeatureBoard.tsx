import { v4 } from "uuid";
import { Button, Color, Placeholder, SimpleButton } from "../../../../../../components/ComponentsIndex";
import { BacklogAction } from "../../../../../../context/BacklogContext";
import { useBacklog } from "../../../../../../hooks/useContexts";
import { Fonts } from "../../../../../../utils/UtilsIndex";
import { Feature } from "../../../../data/DataIndex";
import { Board, BoardType } from "../../../board/Board";
import { ListBoard } from "../../../board/ListBoard";
import { FeatureListItem } from "./FeatureListItem";


interface Props {
    isEmpty: boolean
    placeholder: boolean
    features: Feature[]
}

export function FeatureBoard({isEmpty, placeholder, features}: Props){
    const {state, setState} = useBacklog()

    const addFeature = async () => {
        setState({...state, action: BacklogAction.EditFeature, guid:''})
    }
    
    if(placeholder !== false){
        return (
            <div className="container-fluid bg-dark mt-5 shadow border border-2 rounded s-board p-5 d-flex justify-content-center align-items-center position-relative" >
                <Placeholder />
            </div>
        )
    } 

    return(
        <Board  key={v4()} boardType={BoardType.Lines} title={"Features"}>
            <table className="table mb-0 d-flex flex-column overflow-hidden "> 
                <thead className="" style={{width: '100% !important'}} >
                    <tr className="d-flex w-100  "> 
                        <th className="col bg-dark-subtle">number</th>
                        <th className="col bg-dark-subtle">Name</th>
                        <th className="col bg-dark-subtle">Status</th>
                        <th className="col bg-dark-subtle">Points</th>
                    </tr>
                </thead>
                <tbody  style={{width: '100% !important'}}>   
                    {
                        features.map(feature => (<FeatureListItem key={v4()} index={features.indexOf(feature)} feature={feature}/>))
                    }
                </tbody>
            </table>
            <div className="swipeable-row  d-flex justify-content-end w-100
             pe-2 bg-dark-subtle">
                <SimpleButton
                        type={Button.Borderless}
                        title=""
                        fontColor={Color.Light}
                        font={Fonts.H6}
                        icon="bi-plus-lg" 
                        onClick={() =>{addFeature()}}/>
            </div>
        </Board>
    )
}