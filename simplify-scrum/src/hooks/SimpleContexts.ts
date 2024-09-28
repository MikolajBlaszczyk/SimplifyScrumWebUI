import { useContext } from "react";
import { LoadingContext, UserContext } from "../context/Index"

export function useLoading(){
    return useContext(LoadingContext)
}

export function useSettings(){
    return useContext(UserContext)
}