import { ReactElement, ReactNode } from "react"

interface CentralLayoutProps {
    centralComponent: ReactNode
}

export function CentralLayout(props: CentralLayoutProps){
    return (
        <main className="d-flex w-100 h-100 justify-content-center align-items-center">
            {
                props.centralComponent
            }
        </main>
    )
}