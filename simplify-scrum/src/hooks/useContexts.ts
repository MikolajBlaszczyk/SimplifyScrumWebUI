import { useContext } from "react";
import { AlertContext, AlertingState, LoadingContext, UserContext } from "../context/ContextsIndex"
import { ModalContext } from "../context/ModalContext";

export function useLoading(){
    return useContext(LoadingContext)
}

export function useSettings(){
    return useContext(UserContext)
}

export function useAlerting(){ 
    return useContext(AlertContext) as AlertingState
}

export function useModalForm(){
    return useContext(ModalContext)
}