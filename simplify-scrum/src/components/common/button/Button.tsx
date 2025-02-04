import { ButtonProps, Role, roleClasses, Size, sizeClasses, Style, styleClasses } from "./ButtonProps"



export function Button({style, role, size, title, icon, autoadvance, disabled, onClick, className, ref}: ButtonProps) {

    const sizeClass = sizeClasses[size ?? Size.Medium]
    const styleClass = styleClasses[style ?? Style.Filled]
    const roleClass = roleClasses[role ?? Role.Normal]

    return (<button
        ref={ref}
        tabIndex={autoadvance ? -1 : 0}
        type="button"
        className={"s-button " + sizeClass + " " + styleClass + " " + roleClass + " " + className}
        onClick={onClick}
        disabled={disabled}>
        {icon && <i className={`bi ${icon} me-0`}></i>}
        {title && <span>{title}</span> }
    </button>)
}