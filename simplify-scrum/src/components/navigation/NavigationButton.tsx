import { off } from "process"

interface Props {
    offcanvas? :boolean
    icon: string
    title?: string
    onClick: () => void
}

export function NavigationButton({offcanvas, icon, title, onClick}: Props){
    return (
        <button type="button" className="d-flex align-items-center" onClick={onClick} data-bs-toggle={(offcanvas && ('offcanvas')) ?? undefined} data-bs-target={(offcanvas && ('#offcanvasNavbar')) ?? undefined}>
             {title &&  (<p className="me-2 mb-0">{title}</p>)}
            <i className={`bi ${icon}`}></i>
        </button>
    )
}
