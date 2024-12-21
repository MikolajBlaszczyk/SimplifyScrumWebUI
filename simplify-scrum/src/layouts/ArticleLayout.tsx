import { ReactNode, useContext } from "react"
import { AlertContext, AlertingState } from "../context/ContextsIndex"
import { useModalForm } from "../hooks/useContexts"
import { ModalState } from '../context/ModalContext';

interface ArticleLayoutProps{
    sections: ReactNode[]
}

export function ArticleLayout(props: ArticleLayoutProps){
    const {alerting} = useContext(AlertContext) as AlertingState
    const {modal} = useModalForm()

    return (
        <>
            {alerting.showAlert && (alerting.alertComponent)}
            {modal.showModal && (modal.modalComponent)}
            <main className="d-flex flex-column min-vw-100 min-vh-100 align-items-center">
                {
                    props.sections.map(section =>(  
                            <div className={`d-flex justify-content-center  s-layout-article ${props.sections.indexOf(section) == 0 && ('mt-5')}`}>
                                {section}
                            </div>
                            )
                        )
                }           
            </main>
        </>
    )
}