import { useEffect, useState } from "react"

interface Props {
    moveNext: () => void
}

export function WelcomeView({moveNext}: Props){
    useEffect(() => {
        setTimeout(() => {
            var clickToMove = document.getElementById('clickToMove')
            clickToMove?.classList.remove('invisible')
            clickToMove?.classList.add('fade-in')
        },2000)

    }, [])

    return (
        <main className={`sliding-component d-flex w-100 h-100 justify-content-center align-items-center flex-column bg-dark`} onClick={() => moveNext()}>
            <h1 className="fade-in user-select-none">Welcome !</h1>
            <h6 id="clickToMove" className="mt-4 invisible user-select-none">click to move next</h6>
        </main>
    )
}