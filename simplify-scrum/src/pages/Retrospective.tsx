import { MouseEvent, useMemo } from "react";
import { Button, SimpleButton, SimpleControlPannel } from "../components/ComponentsIndex";
import { RetroBoard } from "../features/retrospective-dashboard/components/RetroBoard";
import { CentralLayout } from "../layouts/CentralLayout";
import { Alignment, SideBySideLayout } from "../layouts/SideBySideLayout";

export function Retrospective(){

    const panel = useMemo(() => 
        (<SimpleControlPannel children={
            [
                <SimpleButton
                    type={Button.Primary} 
                    title={'Ideas'} 
                    onClick={() => {}} />,
                <SimpleButton
                    type={Button.Secondary} 
                    title={'Assesment'} 
                    onClick={() => {}} />,
            ] 
        } />)
    ,[]) 


    return(
        <CentralLayout 
            centralComponent={
                <SideBySideLayout 
                    rightSide={panel}
                    leftSide={<RetroBoard />} 
                    alignment={Alignment.SideItemRight} />
            } />
    )
}