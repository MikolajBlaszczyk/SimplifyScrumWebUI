import { DailyBoard } from "../features/daily-helper/components/DailyBoard";
import { CentralLayout } from "../layouts/CentralLayout";

export function Daily() {


    return (
        <CentralLayout 
            centralComponent={<DailyBoard />} />
    )
}