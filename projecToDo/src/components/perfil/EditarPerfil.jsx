import { useState, useEffect } from "react"
import { update } from "../api/Crud"
import "../../styles/Perfil/Editar.css"

function EditarPerfil() {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}")
    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    const [DatosOriginales, setDatosOriginales] = useState({
        nombreCompleto: "",
        correo: "",
        contrasena: ""
    })

    const [DatosUsuario, setDatosUsuario] = useState({
        nombreCompleto: "",
        correo: "",
        contrasena: ""
    })

    const [ConfirmarDatos, setConfirmarDatos] = useState({
        nombreCompleto: "",
        correo: "",
        contrasena: ""
    })

    useEffect(() => {
        const guardado = localStorage.getItem("usuario")
        if (guardado) {
            try {
                const datos = JSON.parse(guardado)
                const inicial = {
                    nombreCompleto: datos.nombreCompleto || "",
                    correo: datos.correo || "",
                    contrasena: datos.contrasena || ""
                }
                setDatosOriginales(inicial)
                setDatosUsuario(inicial)
                setConfirmarDatos(inicial)
            } catch { }
        }
    }, [])

    const handleChange = e => {
        const { name, value } = e.target
        setDatosUsuario(prev => ({ ...prev, [name]: value }))
    }

    const handleConfirmChange = e => {
        const { name, value } = e.target
        setConfirmarDatos(prev => ({ ...prev, [name]: value }))
    }

    const guardarCambios = () => {
        const updates = {}
        for (const key in DatosUsuario) {
            const nuevo = DatosUsuario[key] || ""
            const confirmado = ConfirmarDatos[key] || ""
            const original = DatosOriginales[key] || ""
            if (nuevo !== original && nuevo === confirmado) {
                updates[key] = nuevo
            }
        }

        if (
            Object.keys(updates).length > 0 &&
            usuario.usuarioEncontrado &&
            usuario.usuarioEncontrado.id
        ) {
            update("usuarios", usuario.usuarioEncontrado.id, updates)

            const nuevoUsuario = usuario
            const datosActualizados = updates

            for (const clave in datosActualizados) {
                nuevoUsuario.usuarioEncontrado[clave] = datosActualizados[clave]
            }

            const texto = JSON.stringify(nuevoUsuario)
            localStorage.setItem("usuario", texto)

            window.location.reload()
        }
    }

    return (
        <div className="editar-perfil">
            <button
                className="editar-perfil__toggle"
                onClick={() => setMostrarFormulario(prev => !prev)}
            >
                Editar perfil
            </button>

            {mostrarFormulario && (
                <div className="editar-perfil__contenido">
                    <div className="editar-perfil__bloque">
                        <h3 className="editar-perfil__subtitulo">Ingresar datos</h3>
                        <label className="editar-perfil__label">
                            Nombre completo
                            <input
                                className="editar-perfil__input"
                                name="nombreCompleto"
                                value={DatosUsuario.nombreCompleto || ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="editar-perfil__label">
                            Correo
                            <input
                                className="editar-perfil__input"
                                name="correo"
                                type="email"
                                value={DatosUsuario.correo || ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="editar-perfil__label">
                            Contraseña
                            <input
                                className="editar-perfil__input"
                                name="contrasena"
                                type="password"
                                value={DatosUsuario.contrasena || ""}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="editar-perfil__bloque">
                        <h3 className="editar-perfil__subtitulo">Confirmar datos</h3>
                        <label className="editar-perfil__label">
                            Nombre completo
                            <input
                                className="editar-perfil__input"
                                name="nombreCompleto"
                                value={ConfirmarDatos.nombreCompleto || ""}
                                onChange={handleConfirmChange}
                            />
                        </label>
                        <label className="editar-perfil__label">
                            Correo
                            <input
                                className="editar-perfil__input"
                                name="correo"
                                type="email"
                                value={ConfirmarDatos.correo || ""}
                                onChange={handleConfirmChange}
                            />
                        </label>
                        <label className="editar-perfil__label">
                            Contraseña
                            <input
                                className="editar-perfil__input"
                                name="contrasena"
                                type="password"
                                value={ConfirmarDatos.contrasena || ""}
                                onChange={handleConfirmChange}
                            />
                        </label>
                    </div>

                    <button className="editar-perfil__boton" onClick={guardarCambios}>
                        Guardar cambios
                    </button>
                </div>
            )}
        </div>
    )
}

export default EditarPerfil
