import { DailyBoard } from "../features/daily-helper/components/DailyBoard";
import { CentralLayout } from "../layouts/CentralLayout";

export function Daily() {


    return (
        <CentralLayout 
            className="s-central-layout-daily"
            centralComponent={<DailyBoard />} />
    )
}