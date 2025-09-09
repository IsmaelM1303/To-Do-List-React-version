import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function ValidacionLogin() {
    const navigate = useNavigate()

    useEffect(() => {
        const usuarios = localStorage.getItem("usuario")
        if (usuarios) {
            navigate("/Listas")
        }
    }, [])

    return null
}

export default ValidacionLogin;
