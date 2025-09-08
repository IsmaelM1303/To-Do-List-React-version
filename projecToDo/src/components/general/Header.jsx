import { useNavigate, useLocation } from "react-router-dom"

function Header() {
    const navigate = useNavigate()
    const location = useLocation()

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

    const irAPerfil = () => {
        navigate("/Perfil")
    }

    const datos = usuario.usuarioEncontrado
    const ruta = location.pathname

    const rutasSinSesion = ["/", "/Login", "/Register"]
    const rutasSinPerfil = [...rutasSinSesion, "/Perfil"]

    const mostrarCerrarSesion = datos && datos.correo && !rutasSinSesion.includes(ruta)
    const mostrarIrAPerfil = datos && datos.correo && !rutasSinPerfil.includes(ruta)

    return (
        <div>
            <h1>To do App</h1>
            {mostrarCerrarSesion && <button onClick={cerrarSesion}>Cerrar Sesión</button>}
            {mostrarIrAPerfil && <button onClick={irAPerfil}>Ir a Perfil</button>}
        </div>
    )
}

export default Header
