import { CentralLayout } from "../layouts/CentralLayout";
import { Alignment, SideBySideLayout } from "../layouts/SideBySideLayout";

export function Administration(){
    return <CentralLayout 
                centralComponent={
                    <SideBySideLayout 
                        rightSide={undefined}
                        leftSide={undefined}
                        alignment={Alignment.SideItemRight} />
                } />
}