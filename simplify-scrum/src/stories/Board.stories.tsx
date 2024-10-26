
import { Button, SimpleCard } from "../components/ComponentsIndex";
import type { Meta, StoryObj } from '@storybook/react';
import { useArgTypes } from '@storybook/api';
import { useMemo } from "react";
import NoteBoard from "../features/backlog/components/board/NoteBoard";
import { Feature } from "../features/backlog/data/Feature";
import { ExtendedStatus } from "../features/backlog/data/State";
import { StateEnumService } from "../features/backlog/service/StateEnumService";
import { Board, BoardType } from "../features/backlog/components/board/Board";
import { FeatureListItem } from "../features/backlog/components/board/FeatureListItem";

type BoardPropsAndCustomArgs = React.ComponentProps<typeof Board> & { numberOfChildren: number }

const meta: Meta<BoardPropsAndCustomArgs> = {
    title: "Board",
    component: Board
} as Meta

export default meta
type Story = StoryObj<BoardPropsAndCustomArgs>;

const getExtendedStatus = (index: number) => {
    switch(index % 10){
        case 0: 
            return ExtendedStatus.New
        case 1: 
            return ExtendedStatus.ReadyForRefinement
        case 2: 
            return ExtendedStatus.Refined
        case 3: 
            return ExtendedStatus.ReadyForImplementation
        case 4: 
            return ExtendedStatus.Implementation
        case 5: 
            return ExtendedStatus.ReadyForDocumentation
        case 6:
            return ExtendedStatus.Documentation
        case 7: 
            return ExtendedStatus.ReadyForTesting
        case 8: 
            return ExtendedStatus.Testing
        case 9: 
            return ExtendedStatus.Done
        default: 
            return ExtendedStatus.New
    }
}

const BoardTemplate: Story = {
    render: ({numberOfChildren, type, ...args}) => { 
        const childrenArray = useMemo(() => {
            if(type == BoardType.Notes){
                return Array.from({ length: numberOfChildren  }, (_, index) => (
                    <SimpleCard key={index} title={`Card ${index + 1}`} description={`Some long Description ${index + 1}`} footer={`15.10.2024`} />
                ));
            } else if(type == BoardType.Lines) {
                return Array.from({length: numberOfChildren}, (_, index) => 
                    <FeatureListItem  feature={new Feature( '', `Title ${index}`, '' , getExtendedStatus(index % 8), index % 8, '', '','' )} />
                )
            }
        }, [numberOfChildren]);

        return (
            <Board type={type}>
                {childrenArray}
            </Board>
        );
    },
    args: {
        numberOfChildren: 2
    },
    argTypes: {
        numberOfChildren: {
            control: {
                type: "range",
                min: 1,
                max: 10,
                step: 1
            },
        },
        children: {
            table: {
                disable: true
            }
        },
        type: {
            options:[0, 1, 2],
            mapping:[BoardType.Notes, BoardType.Lines, BoardType.Details],
            control: {
                type: "select",
                labels: ["Notes", "Lines", "Details"]
            }
        }
    }
}

export const Notes = {
    ...BoardTemplate,
    type: BoardType.Notes
}


