import { MouseEvent, ReactElement } from "react"
import { useModalForm } from "../../hooks/useContexts"
import { Button, SimpleButton } from "../../components/ComponentsIndex"
import { Color } from '../../components/common/SimpleButton';
import { Fonts } from "../../utils/UtilsIndex";

interface Props {
    title: string 
    innerComponent: ReactElement
}

export function Modal({innerComponent, title}: Props) {
    const {modal, setModal} = useModalForm()

    return(
        <>
            <div className="backdrop"></div>
            <div className="s-modal w-auto  bg-dark rounded p-4 d-flex flex-column">
                <div className="d-flex w-100 justify-content-between border-bottom border-2 align-items-center">
                    <h3 className="mb-2 text-light me-4">
                        {title}
                    </h3>

                    <div className="mb-2">

                        <SimpleButton 
                            type={Button.Borderless} 
                            title=""
                            icon="bi-x-lg"
                            font={Fonts.H5}
                            fontColor={Color.Light} 
                            onClick={() => {setModal({showModal: false, modalComponent: <></>})}}/>
                    </div>
                </div>
                <div className="d-flex w-100 h-100">

                    {innerComponent}
                </div>
            </div>
        </>
        
    )
}