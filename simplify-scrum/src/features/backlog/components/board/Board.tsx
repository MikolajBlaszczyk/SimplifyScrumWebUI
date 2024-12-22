import React, { useEffect, useRef } from "react"
import { Button } from "../../../../components/ComponentsIndex";
import NoteBoard from './NoteBoard';
import { ListBoard } from "./ListBoard";
import { v4 } from 'uuid';
import { useModal } from "../../../../hooks/HooksIndex";
import { randomInt, randomUUID } from "crypto";
export enum BoardType { 
    Notes,
    Lines,
    Details
} 

export enum ItemType {
    Project,
}

interface BoardProps {
    children: React.ReactNode,
    boardType: BoardType,
    title: String
}



export function Board({title, children, boardType: type}: BoardProps){
 
    let renderedContent;

    if(type == BoardType.Notes){
        renderedContent = (
            <NoteBoard key={v4()}>
                {children}
            </NoteBoard>
            )
    } else if (type == BoardType.Lines) {
        renderedContent = (
            <ListBoard key={v4()}>
                {children}
            </ListBoard>
        )
    } else if (type == BoardType.Details) {

    }


    
    return (
        <div key={v4()} className="  mt-4 shadow border border-2 rounded s-board  justify-content-center align-items-center position-relative">
            <div className=" user-select-none d-flex p-3 justify-content-center border-bottom">
                <h2>
                    {title}
                </h2>
            </div>
            
            <section className="mb-3 p-3 pb-5 ps-5 pe-5 mt-3 overflow-auto  ">
                {
                    renderedContent
                }
            </section>
        </div>
    )
}

