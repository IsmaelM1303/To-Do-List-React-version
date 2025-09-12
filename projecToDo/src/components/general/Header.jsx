import { useNavigate, useLocation } from "react-router-dom"
import "../../styles/Header.css"

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

    const mostrarCerrarSesion =
        datos && datos.correo && !rutasSinSesion.includes(ruta)
    const mostrarIrAPerfil =
        datos && datos.correo && !rutasSinPerfil.includes(ruta)

    return (
        <header className="header">
            <h1 className="header__titulo">To do App</h1>
            <div className="header__acciones">
                {mostrarIrAPerfil && (
                    <button
                        className="header__boton header__boton--perfil"
                        onClick={irAPerfil}
                    >
                        Ir a Perfil
                    </button>
                )}
                {mostrarCerrarSesion && (
                    <button
                        className="header__boton header__boton--cerrar"
                        onClick={cerrarSesion}
                    >
                        Cerrar Sesión
                    </button>
                )}
            </div>
        </header>
    )
}

export default Header
