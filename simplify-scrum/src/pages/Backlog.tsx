import { SimpleCard } from "../components/ComponentsIndex";
import { Board, BoardType } from "../features/backlog/components/board/Board";
import { CentralLayout } from "../layouts/CentralLayout";

export function Backlog(){
    return (
        <CentralLayout 
            centralComponent={
            <Board  type={BoardType.Notes} >
                <SimpleCard title={"Test"} description={"Test description"} footer={"Created on 123"} />
            </Board>}            />)
}