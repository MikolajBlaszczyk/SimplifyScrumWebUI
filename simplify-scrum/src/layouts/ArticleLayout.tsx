import { ReactNode } from "react"

interface ArticleLayoutProps{
    sections: ReactNode[]
}

export function ArticleLayout(props: ArticleLayoutProps){
    return (
        <main className="d-flex w-100 h-100 bg-dark justify-content-center">
            {
                props.sections.map(section => section)
            }
        </main>
    )
}