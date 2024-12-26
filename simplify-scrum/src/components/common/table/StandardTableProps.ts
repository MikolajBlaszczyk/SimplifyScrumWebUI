import React from "react"
import { StandardSwipeElementProps } from "../swipe/StandardSwipeElementProps"

export interface StandardTableValuesProps {
    values: string[]
    columnValuesClassNames?: string[]
    swipeProps?: StandardSwipeElementProps
}

export interface StandardTableProps {
    className?: string
    headers: string[]
    valuesDefinition: StandardTableValuesProps[]
    footer?: React.JSX.Element 
    swipeEnabled?: boolean
   
}