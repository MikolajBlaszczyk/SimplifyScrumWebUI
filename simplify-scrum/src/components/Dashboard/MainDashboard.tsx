import { useContext, useEffect, useState } from "react";
import SimpleCalendar from "../../Utils/Reusable/SimpleCalendar";
import { GlobalSettings, UserContext } from "../../Context/UserContext";
import { MockSchedule } from "../../Utils/Mocks/SchedulingMock";

export default function MainDashboard(){
    const [date, setDate] = useState(new Date())
    const {settings, setSettings} = useContext(UserContext) as GlobalSettings   

    useEffect(() => {
        setSettings({...settings, isInStartupScreen: false, })
    }, [])

    return (
        <main className="d-flex w-100 h-100 bg-dark justify-content-center align-items-center">
           <SimpleCalendar 
                schedule={MockSchedule}
                date={new Date()}
                className={"justify-content-center align-items-center"}
           />
        </main>
    )
}