import { StandardHeader } from "../components/ComponentsIndex";

export interface SplitLayoutProps {
    title: string,
    leftContent: JSX.Element,
    rightContent: JSX.Element,
    className?: string
}

export function SplitLayout({title, leftContent, rightContent, className}: SplitLayoutProps){
    return (
        <div className={"d-flex mb-5 mt-5 flex-column rounded s-bg-dark  overflow-hidden s-board " + className} >
            <StandardHeader title={title}/>
            <div className="d-flex w-100 overflow-auto  ">
                {leftContent}
                {rightContent}
            </div>
        </div>
    )
}

