import { ButtonProps } from '../button/ButtonProps';

export interface TabButtonsConfiguration{
    icon?: string
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
}

export interface StandardHeaderProps {
    className?: string
    title: string
    buttonConfigs?: TabButtonsConfiguration[]
}