import { StandardListProps } from "./StandardListProps";

export function StandardList({content, title, className}: StandardListProps){

    return(
        <div className={"d-flex flex-column w-100 h-100 " + className}>
            <h5 className="w-100 text-start">{title}</h5>

            <ul className="s-list list-group w-100 ">
            {
                content.map((item, index) => {
                    return(
                        <li className={"list-group-item s-list-item " +  (index == content.length - 1 ? " " : " border-bottom")} key={index}>
                            {item}
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}