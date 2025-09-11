import { useState } from "react"
import { getAll } from "../api/Crud"
import { useNavigate } from "react-router-dom"
import "../../styles/Login/Login.css"

function Login() {
    const navigate = useNavigate()
    const [inputLogin, setInputLogin] = useState({
        correo: "",
        contrasena: ""
    })

    const cambioEstado = (e) => {
        const { name, value } = e.target
        if (name === "correo") {
            setInputLogin({ ...inputLogin, correo: value })
        }
        if (name === "contrasena") {
            setInputLogin({ ...inputLogin, contrasena: value })
        }
    }

    const manejoSubmit = async (e) => {
        e.preventDefault()
        try {
            const usuarios = await getAll("usuarios")
            const usuarioEncontrado = usuarios.find(
                u =>
                    u.correo === inputLogin.correo &&
                    u.contrasena === inputLogin.contrasena
            )
            if (usuarioEncontrado) {
                console.log("Sesión iniciada")
                localStorage.setItem("usuario", JSON.stringify({ usuarioEncontrado }))
                navigate("/Listas")
            } else {
                console.log("Credenciales incorrectas")
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error)
        }
    }

    return (
        <div className="login-contenedor">
            <form className="login-formulario" onSubmit={manejoSubmit}>
                <label htmlFor="correo" className="login-etiqueta">
                    Correo electrónico:
                </label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    className="login-input login-input--correo"
                    value={inputLogin.correo}
                    onChange={cambioEstado}
                    required
                />

                <label htmlFor="contrasena" className="login-etiqueta">
                    Contraseña:
                </label>
                <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    className="login-input login-input--contrasena"
                    value={inputLogin.contrasena}
                    onChange={cambioEstado}
                    required
                />

                <button type="submit" className="login-boton">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    )
}

export default Login
