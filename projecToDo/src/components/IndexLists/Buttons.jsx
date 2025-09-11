import React, { useState } from "react"
import "../../styles/Lists/Render.css"

function Buttons({
    mostrarCompletas,
    mostrarActivas,
    mostrarFiltroFecha,
    setMostrarFiltroFecha,
    setFechaInicio,
    setFechaFin,
    filtrarTodas,
    filtrarCompletasIncompletas,
    filtrarActivasInactivas,
    limpiarFiltros
}) {
    const [botonActivo, setBotonActivo] = useState("")

    const textoCompletas = () => mostrarCompletas ? "Incompletas" : "Completas"
    const textoActivas = () => mostrarActivas ? "Inactivas" : "Activas"

    const manejarClick = (id, accion) => {
        if (id !== "limpiar") setBotonActivo(id)
        if (id !== "fechas") {
            setMostrarFiltroFecha(false)
            setFechaInicio("")
            setFechaFin("")
        }
        accion()
    }

    const obtenerClase = id => botonActivo === id ? "activo" : ""

    return (
        <div className="grupo-botones">
            <button
                className={obtenerClase("todas")}
                onClick={() => manejarClick("todas", filtrarTodas)}
            >
                Todas
            </button>

            <button
                className={obtenerClase("completas")}
                onClick={() => manejarClick("completas", filtrarCompletasIncompletas)}
            >
                {textoCompletas()}
            </button>

            <button
                className={obtenerClase("activas")}
                onClick={() => manejarClick("activas", filtrarActivasInactivas)}
            >
                {textoActivas()}
            </button>

            <button
                className={obtenerClase("fechas")}
                onClick={() => manejarClick("fechas", () => setMostrarFiltroFecha(!mostrarFiltroFecha))}
            >
                Rango Fechas
            </button>

            <button
                className={obtenerClase("limpiar")}
                onClick={() => manejarClick("limpiar", limpiarFiltros)}
            >
                Limpiar
            </button>
        </div>
    )
}

export default Buttons
