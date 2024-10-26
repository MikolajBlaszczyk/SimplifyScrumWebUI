import "../../assets/styles/StyleIndex.scss"

interface Props {
    title: string
    description: string
    footer: string
}

export function SimpleCard(prop: Props){
    return (
        <div className="card s-card">
            <div className="card-body s-card-body">
                <h4 className="card-title common-header">
                    {prop.title}
                </h4>
                <p className="card-text mt-1">
                    {prop.description}
                </p>
                <p className="card-text s-card-addon mt-2">
                    {prop.footer}
                </p>
            </div>
        </div>
    )
}