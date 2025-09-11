import { useState } from "react"
import { create } from "../api/Crud"
import { useNavigate } from "react-router-dom"
import "../../styles/Register/Register.css"

function Register() {
    const navigate = useNavigate()
    const [nuevoUsuario, setnuevoUsuario] = useState({
        nombreCompleto: "",
        correo: "",
        contrasena: ""
    })

    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [confirmCorreo, setConfirmCorreo] = useState("")
    const [confirmContrasena, setConfirmContrasena] = useState("")

    const cambioEstado = (e) => {
        const { name, value } = e.target
        if (name === "nombre") {
            setNombre(value)
            setnuevoUsuario({
                ...nuevoUsuario,
                nombreCompleto: `${value.trim()} ${apellido.trim()}`
            })
        } else if (name === "apellido") {
            setApellido(value)
            setnuevoUsuario({
                ...nuevoUsuario,
                nombreCompleto: `${nombre.trim()} ${value.trim()}`
            })
        } else if (name === "correo") {
            setnuevoUsuario({ ...nuevoUsuario, correo: value })
        } else if (name === "contrasena") {
            setnuevoUsuario({ ...nuevoUsuario, contrasena: value })
        } else if (name === "confirmCorreo") {
            setConfirmCorreo(value)
        } else if (name === "confirmContrasena") {
            setConfirmContrasena(value)
        }
    }

    const manejoSubmit = (e) => {
        e.preventDefault()
        if (nuevoUsuario.correo !== confirmCorreo) {
            alert("El correo no coincide con su confirmación")
            return
        }
        if (nuevoUsuario.contrasena !== confirmContrasena) {
            alert("La contraseña no coincide con su confirmación")
            return
        }
        create("usuarios", nuevoUsuario)
        navigate("/Login")
    }

    return (
        <div className="register-contenedor">
            <form className="register-formulario" onSubmit={manejoSubmit}>
                <h2 className="register-titulo">Registro de Usuario</h2>

                <label htmlFor="nombre" className="register-etiqueta">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={nombre}
                    onChange={cambioEstado}
                    className="register-input"
                />

                <label htmlFor="apellido" className="register-etiqueta">Apellido:</label>
                <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    required
                    value={apellido}
                    onChange={cambioEstado}
                    className="register-input"
                />

                <label htmlFor="correo" className="register-etiqueta">Correo electrónico:</label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    required
                    value={nuevoUsuario.correo}
                    onChange={cambioEstado}
                    className="register-input"
                />

                <label htmlFor="confirmCorreo" className="register-etiqueta">Confirmar correo:</label>
                <input
                    type="email"
                    id="confirmCorreo"
                    name="confirmCorreo"
                    required
                    value={confirmCorreo}
                    onChange={cambioEstado}
                    className="register-input"
                />

                <label htmlFor="contrasena" className="register-etiqueta">Contraseña:</label>
                <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    required
                    minLength="8"
                    value={nuevoUsuario.contrasena}
                    onChange={cambioEstado}
                    className="register-input"
                />

                <label htmlFor="confirmContrasena" className="register-etiqueta">Confirmar contraseña:</label>
                <input
                    type="password"
                    id="confirmContrasena"
                    name="confirmContrasena"
                    required
                    minLength="8"
                    value={confirmContrasena}
                    onChange={cambioEstado}
                    className="register-input"
                />

                <button type="submit" className="register-boton">Registrar</button>
            </form>
        </div>
    )
}

export default Register
