import { useNavigate } from "react-router-dom"

function Header() {
    const navigate = useNavigate()

    let usuario = {}
    const guardado = localStorage.getItem("usuario")

    if (guardado) {
        try {
            usuario = JSON.parse(guardado)
        } catch {
            usuario = {}
        }
    }

    const cerrarSesion = () => {
        localStorage.removeItem("usuario")
        navigate("/")
    }

    const datos = usuario.usuarioEncontrado

    return (
        <div>
            <h1>Header</h1>
            {datos && datos.correo && (
                <button onClick={cerrarSesion}>Cerrar Sesión</button>
            )}
        </div>
    )
}

export default Header
