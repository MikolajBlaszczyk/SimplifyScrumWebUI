import { off } from "process"

interface Props {
    offcanvas? :boolean
    className?: string
    icon: string
    title?: string
    onClick: () => void
}

export function NavigationButton({offcanvas, icon, title, onClick, className}: Props){
    return (
        <button type="button" className={"s-normal s-button mt-1 me-3 s-filled d-flex align-items-center" + " " + className} onClick={onClick} data-bs-toggle={(offcanvas && ('offcanvas')) ?? undefined} data-bs-target={(offcanvas && ('#offcanvasNavbar')) ?? undefined}>
             {title &&  (<p className="me-2 mb-0">{title}</p>)}
            <i className={`bi ${icon}`}></i>
        </button>
    )
}
