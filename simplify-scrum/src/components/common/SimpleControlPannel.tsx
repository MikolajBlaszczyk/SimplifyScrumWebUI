import { ReactElement } from "react"

interface Props {
    children: ReactElement[]
}

export function SimpleControlPannel({children}: Props) {
    return ( 
        <div className="d-flex flex-column justify-content-start s-bg-dark-darker border-start p-3 pt-4 pb-4 border-2 w-25  ">
            {
                children.map(child => (
                    <div className="d-flex w-100 h-100  justify-content-center align-items-center">
                        {child}
                    </div>)
                )
            }
        </div>
    )
}