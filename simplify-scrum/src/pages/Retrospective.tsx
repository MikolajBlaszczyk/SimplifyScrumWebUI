import { MouseEvent, useEffect, useMemo, useState } from "react";
import { Button, SimpleControlPannel } from "../components/ComponentsIndex";
import { RetroBoard } from "../features/retrospective-dashboard/components/Comment/RetroBoard";
import { CentralLayout } from "../layouts/CentralLayout";
import { Alignment, SideBySideLayout } from "../layouts/SideBySideLayout";
import { BacklogService } from "../services/CommonServicesIndex";
import { Sprint } from "../data/CommonDataIndex";
import { NavigationButton } from "../components/navigation/NavigationButton";
import { RateBoard } from "../features/retrospective-dashboard/components/Rate/RateBoard";
import { Note } from "../features/retrospective-dashboard/data/Note";
import { useRetro } from "../hooks/useContexts";
import { RetroService } from "../features/retrospective-dashboard/services/RetroService";
import { SprintNote } from "../features/retrospective-dashboard/data/SprintNote";
import { AccountService } from "../features/account-settings/service/AccountService";
import { NoteTypeEnum } from "../features/retrospective-dashboard/data/NoteTypeEnum";
import { SplitLayout } from "../layouts/SplitLayout";
import { Role, Size, Style } from "../components/common/button/ButtonProps";
import { useNavigateTo } from "../hooks/useNavigation";
import { Destination } from "../utils/UtilsIndex";
import { useAlert } from "../hooks/useAlert";
import { AlertStyle } from "../features/alerting/components/Alert";

export function Retrospective() {
    const navigate = useNavigateTo()
    const showAlert = useAlert()
    const {state, setState} = useRetro();


    const [sprint, setSprint] = useState<Sprint | null>(null);

    const [board, setBoard] = useState<JSX.Element>(<RetroBoard  />);

    const submitRetro = async () => {
        const user = await AccountService.getInfo();

        const sprintFinalNote = new SprintNote(state, user.id, sprint!.guid); 
        const finishedSprint =  await RetroService.finishSprint(sprintFinalNote);
        if(finishedSprint != null) {
            navigate(Destination.Main)
        } else {
            showAlert(AlertStyle.Danger, "Could not finish sprint", "Failure")
        }
    }

    const fetchData = async () => {
        const sprintInfo = await BacklogService.getSprintInfo();
        setSprint(sprintInfo);
    };

    useEffect(() => {
        fetchData();
    }, []);

  

    return (
        <CentralLayout
            centralComponent={
                <SplitLayout 
                    className="s-layout-retro"
                    title={"Retrospective"} 
                    leftContent={board}
                    rightContent={<SimpleControlPannel children={[
                        <div className="d-flex flex-column position-relative w-100 h-100">
                            <div className="d-flex w-100 justify-content-center align-items-center">
                                <h5 className="text-center">
                                    {sprint?.name} <br /> Sprint no
                                </h5>
                            </div>
                            <div className="d-flex mb-3 flex-column w-100 align-items-center">
                                <Button 
                                    className="w-100"
                                    style={Style.Filled}
                                    role={Role.Normal}
                                    size={Size.Large}
                                    icon="bi-chat"
                                    title="Comment"
                                    onClick={() => {
                                        setBoard(<RetroBoard />)
                                    }} />
                           
                                <Button 
                                    className="mt-3 w-100"
                                    style={Style.Filled}
                                    role={Role.Normal}
                                    size={Size.Large}
                                    icon="bi-star-fill"
                                    title="Rate Sprint"
                                    onClick={() => {
                                        setBoard(<RateBoard />)
                                    }} />

                            </div>
                            <div className="w-100 d-flex justify-content-center bottom-0 start-50 translate-middle-x position-absolute">
                                <Button
                                    style={Style.Filled}
                                    size={Size.Large}
                                    role={Role.Primary}
                                    title={'Submit'}
                                    onClick={() => { submitRetro() }} />
                            </div>
                        </div>,
                    ]} />} />
            }
        />
    );
}