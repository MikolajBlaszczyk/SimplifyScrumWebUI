import "../../assets/styles/StyleIndex.scss"

interface Props {
    title: string
    description: string
    footer: string
    ref?: React.LegacyRef<HTMLDivElement> 
}

export function SimpleCard({title, description, footer, ref}: Props){
    return (
        <div ref={ref} className="card s-card">
            <div className="card-body s-card-body">
                <h4 className="card-title common-header">
                    {title}
                </h4>
                <p className="card-text mt-1">
                    {description}
                </p>
                <p className="card-text s-card-addon mt-2">
                    {footer}
                </p>
            </div>
        </div>
    )
}