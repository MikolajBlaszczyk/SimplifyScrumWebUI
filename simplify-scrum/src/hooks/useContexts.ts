import { useContext } from "react";
import { AlertContext, AlertingState, LoadingContext, UserContext } from "../context/ContextsIndex"

export function useLoading(){
    return useContext(LoadingContext)
}

export function useSettings(){
    return useContext(UserContext)
}

export function useAlerting(){ 
    return useContext(AlertContext) as AlertingState
}