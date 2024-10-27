import { ReactNode, useContext } from "react"
import { AlertContext, AlertingState } from "../context/Index"

interface ArticleLayoutProps{
    sections: ReactNode[]
}

export function ArticleLayout(props: ArticleLayoutProps){
    const {alerting} = useContext(AlertContext) as AlertingState
    
    return (
        <>
            {alerting.showAlert && (alerting.alertComponent)}
            <main className="d-flex flex-column w-100 h-100 align-items-center">
                <div className="d-flex justify-center w-75 mt-5">
                    {
                        props.sections.map(section => section)
                    }
                </div>
           
            </main>
        </>
    )
}