import { Note } from "../../data/Note";
import { NoteItem } from "./NoteItem";
import { Button } from "../../../../components/ComponentsIndex";
import { NoteTypeEnum } from "../../data/NoteTypeEnum";
import { useRetro } from "../../../../hooks/useContexts";
import { MouseEvent, useEffect, useState } from "react";
import { Role, Size, Style } from "../../../../components/common/button/ButtonProps";



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
        <div className="d-flex s-retro-board p-4 w-100  justify-content-around rounded">
            <div className="border position-relative d-flex flex-column w-25 h-100">
                <div className="d-flex p-2 border justify-content-center align-items-center bg-success">
                    <h4 className="m-0">Good</h4>
                </div>
                <div className="d-flex flex-column h-auto  overflow-hidden " >
                    {goodNotes.map((note, index) => (
                        <NoteItem key={index} note={note} />
                    ))}
                    <div className="mb-5"/>
                    <div className="w-100  bottom-0 start-50 translate-middle-x position-absolute overflow-hidden  d-flex justify-content-center">
                        <Button 
                            role={Role.Primary}
                            icon="bi-plus-lg"
                            size={Size.XLarge}
                            style={Style.Borderless} 
                            onClick={() => {addNote(new Note("", "", new Date(), NoteTypeEnum.Good))} } />
                    </div>
                </div>
            </div>

            <div className="border position-relative d-flex flex-column w-25 h-100">
                <div className="d-flex p-2 border justify-content-center align-items-center bg-danger">
                    <h4 className="m-0">Bad</h4>
                </div>
                <div className="d-flex flex-column h-auto overflow-hidden " >
                    {badNotes.map((note, index) => (
                        <NoteItem key={index}  note={note} />
                    ))}
                    <div className="mb-5"/>
                    <div className="w-100  d-flex justify-content-center  bottom-0 start-50 translate-middle-x position-absolute ">
                        <Button 
                            role={Role.Primary}
                            icon="bi-plus-lg"
                            size={Size.XLarge}
                            style={Style.Borderless} 
                            onClick={() => {addNote(new Note("", "", new Date(), NoteTypeEnum.Bad))} } />
                    </div>
                </div>
            </div>

            <div className="border position-relative d-flex flex-column w-25 h-100">
                <div className="d-flex w-100 p-2 border justify-content-center align-items-center bg-dark-subtle">
                    <h4 className="m-0">Notes</h4>
                </div>
                <div className="d-flex flex-column h-auto   overflow-hidden" >
                    {notes.map((note, index) => (
                        <NoteItem key={index}  note={note} />
                    ))}
                    <div className="mb-5"/>
                    <div className="w-100 d-flex justify-content-center bottom-0 start-50 translate-middle-x position-absolute">
                        <Button 
                            role={Role.Primary}
                            icon="bi-plus-lg"
                            size={Size.XLarge}
                            style={Style.Borderless} 
                            onClick={() => {addNote(new Note("", "", new Date(), NoteTypeEnum.Conclusions))} } />
                    </div>
                </div>
            </div>
        </div>
    );
}