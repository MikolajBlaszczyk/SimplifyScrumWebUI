import { MouseEvent, useEffect, useMemo, useState } from "react";
import { Button, SimpleButton, SimpleControlPannel } from "../components/ComponentsIndex";
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

export function Retrospective() {
    const {state, setState} = useRetro();


    const [sprint, setSprint] = useState<Sprint | null>(null);

    const [board, setBoard] = useState<JSX.Element>(<RetroBoard  />);

    const submitRetro = async () => {
        const user = await AccountService.getInfo();

        const sprintFinalNote = new SprintNote(state, user.id, sprint!.guid); 
        const response =  await RetroService.finishSprint(sprintFinalNote);
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
                <SideBySideLayout
                    rightSide={ <SimpleControlPannel children={[
                        <div className="d-flex flex-column w-100 h-100">
                            <div className="d-flex w-100 mb-3 justify-content-center align-items-center">
                                <h4 className="text-center">
                                    {sprint?.name} <br /> Sprint no. {sprint?.iteration}
                                </h4>
                            </div>
                            <div className="d-flex s-navbar mb-3 flex-column w-100 align-items-center">
                                <NavigationButton
                                    icon={"bi-chat"}
                                    title="Comment Sprint"
                                    onClick={() => {
                                        setBoard(<RetroBoard />);
                                    }}
                                />
                                <NavigationButton
                                    icon={"bi-star-fill"}
                                    title="Rate Sprint"
                                    onClick={() => {
                                        setBoard(<RateBoard />);
                                    }}
                                />
                            </div>
                            <div className="w-100 d-flex justify-content-end">
                                <SimpleButton
                                    type={Button.Success}
                                    title={'Submit'}
                                    onClick={() => { submitRetro() }}
                                />
                            </div>
                        </div>,
                    ]} />}
                    leftSide={board}
                    alignment={Alignment.SideItemRight}
                />
            }
        />
    );
}