import { v4 } from "uuid";
import { StandardTableProps } from "./StandardTableProps";
import { StandardSwipeElement } from "../swipe/StandardSwipeElement";

export function StandardTable({headers, valuesDefinition, footer, swipeEnabled,   className }: StandardTableProps){
    if(valuesDefinition.length != 0 && headers.length != valuesDefinition[0].values.length){
        throw new Error("Headers and values must have the same length")
    }

    return (
        <table className={"table s-table h-100 table-hover w-100  d-flex flex-column overflow-hidden " + className}> 
                <thead >
                    <tr className="d-flex w-100 bg-transparent border-bottom"> 
                        {
                            valuesDefinition.length != 0  &&
                            headers.map(header => (
                                <th className="col p-1 s-table-header" key={header}>
                                    {header}
                                </th>
                                )
                            )  
                        }
                    </tr>
                </thead>
                <tbody className="s-table-body h-100 overflow-y-auto overflow-hidden" >   
                    {   
                        valuesDefinition.length === 0 ?
                        <tr className="d-flex w-100 justify-content-center bg-transparent">
                            No data
                        </tr>
                        :
                        valuesDefinition.map((definition) => (
                            <tr className="d-flex w-100 bg-transparent" key={v4()}>
                                {
                                    swipeEnabled === true ?
                                        <StandardSwipeElement 
                                            {...definition.swipeProps}
                                            content={
                                                <>
                                                    {definition.values.map((columnValue, index) => (
                                                        <td className={"col p-1  " + (
                                                            definition.columnValuesClassNames !== undefined &&
                                                            definition.columnValuesClassNames.length !== headers[index].length
                                                            ?
                                                            definition.columnValuesClassNames![index] 
                                                            :
                                                            ' ') } key={v4()}>
                                                            <span>
                                                                {columnValue}
                                                            </span>
                                                        </td>
                                                    ))}
                                                </>
                                            }/>
                                    :
                                    <>
                                        {definition.values.map((columnValue) => (
                                            <td className="col" key={v4()}>
                                                {columnValue}
                                            </td>
                                        ))}
                                    </>
                                }
                            </tr>
                        ))
                    }
                </tbody>
                <div className="h-100"></div>
                {
                    footer
                }
        </table>
    )
}