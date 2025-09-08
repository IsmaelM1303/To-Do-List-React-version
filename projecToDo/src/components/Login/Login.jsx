import { useState } from "react"
import { getAll } from "../api/Crud"
import {useNavigate} from "react-router-dom"

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
                console.log("Sesión iniciada");
                localStorage.setItem('usuario', JSON.stringify({ usuarioEncontrado}))                
                navigate("/Listas")
                
            } else {
                console.log("Credenciales incorrectas")
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error)
        }
    }

    return (
        <div>
            <form onSubmit={manejoSubmit}>
                <label htmlFor="correo">Correo electrónico:</label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    required
                    value={inputLogin.correo}
                    onChange={cambioEstado}
                />

                <label htmlFor="contrasena">Contraseña:</label>
                <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    required
                    value={inputLogin.contrasena}
                    onChange={cambioEstado}
                />

                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    )
}

export default Login
