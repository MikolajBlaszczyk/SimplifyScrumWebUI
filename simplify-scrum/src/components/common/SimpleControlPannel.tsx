import { ReactElement } from "react"

interface Props {
    children: ReactElement[]
}

export function SimpleControlPannel({children}: Props) {
    return ( 
        <div className="d-flex flex-column justify-content-start bg-dark-subtle w-100  pt-3 pb-5 s-retro-control-panel rounded">
            {
                children.map(child => (
                    <div className="d-flex w-100 ps-2 pe-2 mt-5 justify-content-center align-items-center">
                        {child}
                    </div>)
                )
            }
        </div>
    )
}