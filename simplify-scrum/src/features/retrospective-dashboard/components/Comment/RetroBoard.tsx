import { Note } from "../../data/Note";
import { NoteItem } from "./NoteItem";
import { Button, SimpleButton } from "../../../../components/ComponentsIndex";
import { NoteTypeEnum } from "../../data/NoteTypeEnum";
import { useRetro } from "../../../../hooks/useContexts";
import { useEffect, useState } from "react";



export function RetroBoard() {
    const {state, setState} = useRetro();

    const [notes, setNotes] = useState<Note[]>(state.Comments.filter(note => note.type === NoteTypeEnum.Conclusions));
    const [goodNotes, setGoodNotes] = useState<Note[]>(state.Comments.filter(note => note.type === NoteTypeEnum.Good));
    const [badNotes, setBadNotes] = useState<Note[]>(state.Comments.filter(note => note.type === NoteTypeEnum.Bad));

    const addNote = (note: Note) => {
        const updatedComments = [...state.Comments, note];
        setState({...state, Comments: updatedComments});
    }


    useEffect(() => {
        setNotes(state.Comments.filter(note => note.type === NoteTypeEnum.Conclusions));
        setGoodNotes(state.Comments.filter(note => note.type === NoteTypeEnum.Good));
        setBadNotes(state.Comments.filter(note => note.type === NoteTypeEnum.Bad));
    }, [state.Comments]);

    return (
        <section className="d-flex s-retro-board p-4 w-100 h-100 justify-content-between rounded">
            <div className="border d-flex flex-column w-25 h-100">
                <div className="d-flex s-h-10 border justify-content-center align-items-center bg-success">
                    <h3 className="m-0">Good</h3>
                </div>
                <div className="d-flex flex-column s-h-90 border overflow-auto" style={{ maxHeight: "600px" }}>
                    {goodNotes.map((note, index) => (
                        <NoteItem key={index} note={note} />
                    ))}
                    <div className="w-100 mt-1 d-flex justify-content-center">
                        <SimpleButton
                            type={Button.Borderless}
                            title={"Add"}
                            icon="bi-plus-lg"
                            onClick={() => addNote(new Note("", "", new Date(), NoteTypeEnum.Good))}
                        />
                    </div>
                </div>
            </div>

            <div className="border d-flex flex-column w-25 h-100">
                <div className="d-flex s-h-10 border justify-content-center align-items-center bg-danger">
                    <h3 className="m-0">Bad</h3>
                </div>
                <div className="d-flex flex-column s-h-90 border overflow-auto" style={{ maxHeight: "600px" }}>
                    {badNotes.map((note, index) => (
                        <NoteItem key={index}  note={note} />
                    ))}
                    <div className="w-100 mt-1 d-flex justify-content-center">
                        <SimpleButton
                            type={Button.Borderless}
                            title={"Add"}
                            icon="bi-plus-lg"
                            onClick={() => addNote(new Note("", "", new Date(), NoteTypeEnum.Bad))}
                        />
                    </div>
                </div>
            </div>

            <div className="border d-flex flex-column justify-content-start align-items-center w-25 h-100">
                <div className="d-flex w-100 s-h-10 border justify-content-center align-items-center bg-dark-subtle">
                    <h3 className="m-0">Notes</h3>
                </div>
                <div className="d-flex flex-column s-h-90 border w-100 overflow-auto" style={{ maxHeight: "600px" }}>
                    {notes.map((note, index) => (
                        <NoteItem key={index}  note={note} />
                    ))}
                    <div className="w-100 mt-1 d-flex justify-content-center">
                        <SimpleButton
                            type={Button.Borderless}
                            title={"Add"}
                            icon="bi-plus-lg"
                            onClick={() => addNote(new Note("", "", new Date(), NoteTypeEnum.Conclusions))}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}