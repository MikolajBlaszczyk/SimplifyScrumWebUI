import { useContext } from "react";
import { AlertContext, AlertingState, BacklogContext, DailyContext, LoadingContext, RefinementContext, UserContext } from "../context/ContextsIndex"
import { ModalContext } from "../context/ModalContext";
import { RetroContext } from "../context/RetroContext";

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

export function useBacklog(){
    return useContext(BacklogContext)
}

export function useRefinement(){
    return useContext(RefinementContext)
}

export function useRetro() {
    return useContext(RetroContext)
}

export function useDaily() {
    return useContext(DailyContext)
}