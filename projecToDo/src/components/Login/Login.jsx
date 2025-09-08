import { useState } from "react"

function Login() {
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

    const manejoSubmit = (e) => {
        
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
