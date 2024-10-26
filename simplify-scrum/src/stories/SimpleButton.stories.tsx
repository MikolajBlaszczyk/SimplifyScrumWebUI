import { Component } from "react";
import {SimpleButton, Button } from '../components/common/SimpleButton';
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof SimpleButton> = {
    title: "Simple Button",
    component: SimpleButton
}

export default meta


const Template: StoryObj<typeof SimpleButton> = {
    args: {
        title: 'Simple title',
        onClick: () => {
            console.log('clicked')
        },
        type: Button.Primary
    },
    argTypes: {
        onClick: {
            table: {
                disable: true
            }
        },
        type: {
            options: [0,1,2,3,4,5,6],
            mapping: [Button.Primary, Button.Secondary, Button.Success, Button.Danger, Button.Warning, Button.Info, Button.Transparent],
            control: {
                type: 'select',
                labels: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'default']
            }
        },
        minWidth: {
            control: {
                type: 'text'
            }
        }
    }
}

export const DefaultButton = {
    ...Template
}