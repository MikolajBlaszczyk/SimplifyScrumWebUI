import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { StandardHeader, StandardHeaderProps } from "../../../../components/ComponentsIndex";
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
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [renderedContent, setRenderedContent] = useState<React.ReactElement>();

    useEffect(() => {
        const renderContent = () => {
            switch (boardType) {
                case BoardType.Notes:
                    return <NoteBoard ref={contentRef} key="note-board">{children}</NoteBoard>;
                case BoardType.Lines:
                    return <ListBoard ref={contentRef} key="list-board">{children}</ListBoard>;
                case BoardType.Details:
                    return <DetailBoard ref={contentRef} key="detail-board">{children}</DetailBoard>;
                case BoardType.Empty:
                    return <div className="w-100 h-100 d-flex"></div>
            }
        };

        setRenderedContent(renderContent());
    }, [boardType, children]);


    return (
        <div  key={v4()} className="mt-3 mb-4 h-auto shadow rounded s-board h-auto justify-content-center align-items-center position-relative">
            <StandardHeader {...headerConfig} />
            <section
                ref={sectionRef}
                className="w-auto"
                >
                {renderedContent}
            </section>
        </div>
    );
}