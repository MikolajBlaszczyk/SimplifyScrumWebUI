import { AuthForm } from "../features/authorization/components/AuthForm"
import {CentralLayout} from "../layouts/LayoutIndex"

export function Start(){
    return(
        <CentralLayout centralComponent={<AuthForm/>} />
    )
}