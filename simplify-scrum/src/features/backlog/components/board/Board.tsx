import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { Placeholder, StandardHeader, StandardHeaderProps } from "../../../../components/ComponentsIndex";
import { NoteBoard } from './NoteBoard';
import { ListBoard } from "./ListBoard";
import { DetailBoard, DetailBoardContent } from "./DetailBoardContent";

export enum BoardType { 
    Notes,
    Lines,
    Details,
    Empty
} 

interface BoardProps {
    headerConfig: StandardHeaderProps
    children: React.ReactElement,
    boardType: BoardType,
}

//TODO: Heigh transition
export function Board({ children, boardType, headerConfig }: BoardProps) {
    const [renderedContent, setRenderedContent] = useState<React.ReactElement>();

    useEffect(() => {
        const renderContent = () => {
            switch (boardType) {
                case BoardType.Notes:
                    return <NoteBoard key="note-board">{children}</NoteBoard>;
                case BoardType.Lines:
                    return <ListBoard  key="list-board">{children}</ListBoard>;
                case BoardType.Details:
                    return <DetailBoard  key="detail-board">{children}</DetailBoard>;
                case BoardType.Empty:
                    return <div className="w-100 h-100 d-flex justify-content-center align-items-center" style={{minHeight: 400}}> <Placeholder /> </div>
            }
        };

        setRenderedContent(renderContent());
    }, [boardType, children]);


    return (
        <div  key={v4()} className="mt-3 mb-3 shadow  d-flex flex-column rounded s-board  position-relative">
            <StandardHeader {...headerConfig} />
            <div className=" w-100 h-100 d-flex flex-column" >
                {renderedContent}
            </div>
        </div>
    );
}