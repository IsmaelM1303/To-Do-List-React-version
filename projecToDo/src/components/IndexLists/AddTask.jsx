import { useState } from "react"
import { create } from "../api/Crud"
import "../../styles/Lists/Add.css"

function CrearTarea() {
    const datos = localStorage.getItem('usuario');
    const usuario = JSON.parse(datos);
    

    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [activa, setActiva] = useState(false)
    const [fecha, setFecha] = useState("")

    const manejoSubmit = (e) => {
        e.preventDefault()

        const nuevaTarea = {
            nombre,
            descripcion,
            activa,
            fecha,
            idUsuario: usuario.usuarioEncontrado.id,
            completa: false
        }

        console.log("Tarea creada:", nuevaTarea)
        create("tareas", nuevaTarea)
        window.location.reload()
    }

    return (
        <div>
            <form onSubmit={manejoSubmit}>
                <label htmlFor="nombre">Nombre de la tarea:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    rows="4"
                    cols="50"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>

                <label htmlFor="activa">
                    <input
                        type="checkbox"
                        id="activa"
                        name="activa"
                        checked={activa}
                        onChange={(e) => setActiva(e.target.checked)}
                    />
                    Activar tarea
                </label>

                <label htmlFor="fecha">Fecha de finalización:</label>
                <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />

                <button type="submit">Crear Tarea</button>
            </form>
        </div>
    )
}

export default CrearTarea
