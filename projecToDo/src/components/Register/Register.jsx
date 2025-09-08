import { useState } from "react"
import { create } from "../api/Crud"
import { useNavigate } from "react-router-dom"

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
                nombreCompleto: value.trim() + " " + apellido.trim()
            })
        }

        if (name === "apellido") {
            setApellido(value)
            setnuevoUsuario({
                ...nuevoUsuario,
                nombreCompleto: nombre.trim() + " " + value.trim()
            })
        }

        if (name === "correo") {
            setnuevoUsuario({ ...nuevoUsuario, correo: value })
        }

        if (name === "contrasena") {
            setnuevoUsuario({ ...nuevoUsuario, contrasena: value })
        }

        if (name === "confirmCorreo") {
            setConfirmCorreo(value)
        }

        if (name === "confirmContrasena") {
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

        const datosFinales = {
            nombreCompleto: nuevoUsuario.nombreCompleto,
            correo: nuevoUsuario.correo,
            contrasena: nuevoUsuario.contrasena
        }

        console.log("Datos registrados:", datosFinales)
        create("usuarios", nuevoUsuario)
        navigate("/Login")
        
    }

    return (
        <form onSubmit={manejoSubmit}>
            <h2>Registro de Usuario</h2>

            <label htmlFor="nombre">Nombre:</label>
            <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={nombre}
                onChange={cambioEstado}
            />

            <label htmlFor="apellido">Apellido:</label>
            <input
                type="text"
                id="apellido"
                name="apellido"
                required
                value={apellido}
                onChange={cambioEstado}
            />

            <label htmlFor="correo">Correo electrónico:</label>
            <input
                type="email"
                id="correo"
                name="correo"
                required
                value={nuevoUsuario.correo}
                onChange={cambioEstado}
            />

            <label htmlFor="confirmCorreo">Confirmar correo:</label>
            <input
                type="email"
                id="confirmCorreo"
                name="confirmCorreo"
                required
                value={confirmCorreo}
                onChange={cambioEstado}
            />

            <label htmlFor="contrasena">Contraseña:</label>
            <input
                type="password"
                id="contrasena"
                name="contrasena"
                required
                minLength="8"
                value={nuevoUsuario.contrasena}
                onChange={cambioEstado}
            />

            <label htmlFor="confirmContrasena">Confirmar contraseña:</label>
            <input
                type="password"
                id="confirmContrasena"
                name="confirmContrasena"
                required
                minLength="8"
                value={confirmContrasena}
                onChange={cambioEstado}
            />

            <button type="submit">Registrar</button>
        </form>
    )
}

export default Register
