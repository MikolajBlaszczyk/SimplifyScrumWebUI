import { useNavigate } from "react-router-dom"
import { Destination, destinationPaths } from "../utils/UtilsIndex"

export const useNavigateTo = () => {
    const navigate = useNavigate()
    
    const naviagteTo = (destination: Destination) => {
        const path = destinationPaths[destination]
        navigate(path)
    }

    return naviagteTo
}