import { Tooltip } from "bootstrap";
import { useEffect } from "react";

export const useTooltip = (initializer: any ) => {
     useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))


    return () => {
        tooltipList.map(t => t.dispose())
        }
    }, [initializer]); 

    return 
}