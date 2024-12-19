export function Placeholder(){
    return (
        <div className="opacity-100">
            <div className="spinner-border text-dark s-h4 s-spinner" style={{width: '5rem', height: '5rem'}} role="status">
                <h1 className="visually-hidden">Loading...</h1>
            </div>
        </div>
    )
}