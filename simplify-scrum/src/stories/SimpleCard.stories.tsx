import {SimpleCard} from "../components/ComponentsIndex";
import type { Meta, StoryObj } from '@storybook/react';

export default {
    title: "Simple Card",
    component: SimpleCard 
} as Meta

type Story = StoryObj<typeof SimpleCard>;


export const Basic: Story = {
    args: {
        title: "Project One",
        description: "Initialize story book for Simplify Scrum project",
        footer: "Created at 13.10.2024"
    }
}

