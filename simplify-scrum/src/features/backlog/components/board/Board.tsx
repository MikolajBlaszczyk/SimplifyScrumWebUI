import React, { useEffect, useRef } from "react"
import "../../../assets/styles/StyleIndex.scss"
import { SimpleButton, Button } from "../../../../components/ComponentsIndex";
import NoteBoard from './NoteBoard';
import { ListBoard } from "./ListBoard";

export enum BoardType { 
    Notes,
    Lines,
    Details
} 


interface BoardProps {
    children: React.ReactNode,
    type: BoardType
}

export function Board({children, type}: BoardProps){
    const boardRef = useRef<HTMLDivElement>(null)
    let renderedContent;

    if(type == BoardType.Notes){
        renderedContent = (
            <NoteBoard>
                {children}
            </NoteBoard>
            )
    } else if (type == BoardType.Lines) {
        renderedContent = (
            <ListBoard>
                {children}
            </ListBoard>
        )
    } else if (type == BoardType.Details) {

    }


    useEffect(() => {
        if(!boardRef) 
            return
        
        const boardResizeObserver = new ResizeObserver((entries) => {
            console.log(entries)
            const boardEntry = entries.find((entry) => entry.target.id == 'board')
            
            if(boardEntry){
                const menu = document.getElementById('board-menu')!
                menu.style.top = `${(boardEntry.contentRect.height) + menu.offsetHeight - 30 }px`
            }
           
        })

        boardResizeObserver.observe(boardRef.current!)

        return () => {
            if(boardRef.current){ 
                boardResizeObserver.unobserve(boardRef.current!)
            }
        }
    })
    
    return (
        <div id="board" ref={boardRef} className="container-fluid s-board p-5 min-vh-100 justify-content-center align-items-center position-relative">
            <section className="s-board-section">
                {
                    renderedContent
                }
            </section>
            <menu id="board-menu" className="nav nav-pills nav-fill s-board-menu  rounded position-absolute start-50 translate-middle">
                <li className="nav-item me-3">
                    <SimpleButton 
                        type={Button.Primary}
                        title="Add"
                        onClick={e => {}}
                        minWidth="6em"/>
                </li>
                <li className="nav-item ms-3">
                    <SimpleButton 
                        type={Button.Danger}
                        title="Remove"
                        onClick={e => {}}
                        minWidth="6em"/>
                </li>
            </menu>
        </div>
    )
}

