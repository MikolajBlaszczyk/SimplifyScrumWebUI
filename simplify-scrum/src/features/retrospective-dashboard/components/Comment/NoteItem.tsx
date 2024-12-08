import React, { useEffect, useRef, useState } from 'react';
import { Note } from '../../data/Note';
import { useSwipeable } from 'react-swipeable';
import { set } from 'date-fns';
import { useRetro } from '../../../../hooks/HooksIndex';

interface Props {
    note: Note;
}

export function NoteItem({ note }: Props) {
    const {state, setState} = useRetro();


    const [swipeAmount, setSwipeAmount] = useState(0);
    const rowRef = useRef<HTMLDivElement>(null);

    const removeNote = (note: Note) => {
        setState({...state, Comments: state.Comments.filter(n => n.uuid !== note.uuid)});
    }

    const changeTitle = (value: string) => {
        const newComments = state.Comments.map(n => n.uuid === note.uuid ? {...n, title: value} : n)
        setState({...state, Comments: newComments});
    }

    const changeContent = (value: string) => {
        const newComments = state.Comments.map(n => n.uuid === note.uuid ? {...n, content: value} : n)
        setState({...state, Comments: newComments});
    }

    const swipeHandlers = useSwipeable({
        onSwiping: (eventData) => {
            setSwipeAmount(eventData.deltaX);
        },
        onSwiped: () => {
            if (swipeAmount > 100) {
                removeNote(note);
            }
            setSwipeAmount(0);
        },
        trackMouse: true
    });

    useEffect(() => {
        if (rowRef.current) {
            rowRef.current.style.setProperty('--swipe-amount', `${swipeAmount}px`);
        }
    }, [swipeAmount]);

    return (
        <div
            {...swipeHandlers}
            ref={rowRef}
            className={`d-flex flex-column m-2 swipeable-row-retro-card justify-content-center align-items-center border rounded p-2 ${swipeAmount !== 0 ? 'swiping' : ''}`}
        >
            <div className="d-flex mb-2 justify-content-between align-items-center w-100">
                <h6 className="mb-0 me-2">Title</h6>
                <input
                    type="text"
                    value={note.title}
                    className="w-100"
                    onChange={e => {changeTitle(e.target.value)}}
                />
            </div>

            <div className="d-flex w-100">
                <textarea
                    value={note.content}
                    onChange={e => {changeContent(e.target.value)}}
                    rows={3}
                    className="w-100"
                    style={{ maxHeight: '5em', overflowY: 'auto', resize: 'none' }}
                />
            </div>
        </div>
    );
}