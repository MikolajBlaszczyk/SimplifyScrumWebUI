import { ReactElement } from 'react';
export interface StandardSwipeElementProps {
    content?: ReactElement
    onSwipeLeft?: () => void
    onSwipeRight?: () => void
    onLeftSwipeContent?: string;
    onRightSwipeContent?: string;
}