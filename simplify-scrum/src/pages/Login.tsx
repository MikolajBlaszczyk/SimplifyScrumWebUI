import { AuthForm } from "../features/authorization/components/AuthForm"
import {CentralLayout} from "../layouts/LayoutIndex"

export function Login(){
    return(
        <CentralLayout centralComponent={<AuthForm/>} />
    )
}