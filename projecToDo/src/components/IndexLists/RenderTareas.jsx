import React, { useState, useEffect } from "react"
import { getAll, remove, update } from "../api/Crud"
import Buttons from "./Buttons"
import Render from "./Render"

function RenderTareas() {
    const [tareasUsuario, setTareasUsuario] = useState([])
    const [tareasFiltradas, setTareasFiltradas] = useState([])
    const [mostrarCompletas, setMostrarCompletas] = useState(true)
    const [mostrarActivas, setMostrarActivas] = useState(true)
    const [mostrarFiltroFecha, setMostrarFiltroFecha] = useState(false)
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFin, setFechaFin] = useState("")

    useEffect(() => {
        const datos = localStorage.getItem("usuario")
        if (!datos) return
        const usuario = JSON.parse(datos)
        if (!usuario?.usuarioEncontrado?.id) return

        (async function cargar() {
            try {
                const todas = await getAll("tareas")
                const propias = todas.filter(t => t.idUsuario === usuario.usuarioEncontrado.id)
                setTareasUsuario(propias)
                setTareasFiltradas(propias)
            } catch (error) {
                console.error("Error obtener tareas:", error)
            }
        })()
    }, [])

    function filtrarTodas() {
        setTareasFiltradas(tareasUsuario)
    }

    function filtrarCompletasIncompletas() {
        const lista = tareasUsuario.filter(t =>
            mostrarCompletas ? t.completa === true : t.completa === false
        )
        setTareasFiltradas(lista)
        setMostrarCompletas(!mostrarCompletas)
    }

    function filtrarActivasInactivas() {
        const lista = tareasUsuario.filter(t =>
            mostrarActivas ? t.activa === true : t.activa === false
        )
        setTareasFiltradas(lista)
        setMostrarActivas(!mostrarActivas)
    }

    function aplicarFiltroFecha() {
        if (!fechaInicio || !fechaFin) return
        const inicio = new Date(fechaInicio)
        const fin = new Date(fechaFin)
        const lista = tareasUsuario.filter(t => {
            if (!t.fecha) return false
            const f = new Date(t.fecha)
            return f >= inicio && f <= fin
        })
        setTareasFiltradas(lista)
        setMostrarFiltroFecha(false)
    }

    function limpiarFiltros() {
        setTareasFiltradas(tareasUsuario)
        setFechaInicio("")
        setFechaFin("")
        setMostrarCompletas(true)
        setMostrarActivas(true)
    }

    async function handleFieldUpdate(id, field, value) {
        try {
            const actualizar = tarea =>
                tarea.id === id ? { ...tarea, [field]: value } : tarea

            setTareasFiltradas(prev => prev.map(actualizar))
            setTareasUsuario(prev => prev.map(actualizar))
            await update("tareas", id, { [field]: value })
        } catch (error) {
            console.error(`Error actualizando '${field}':`, error)
        }
    }

    async function handleDelete(id) {
        try {
            await remove("tareas", id)
            setTareasUsuario(prev => prev.filter(t => t.id !== id))
            setTareasFiltradas(prev => prev.filter(t => t.id !== id))
        } catch (error) {
            console.error("Error eliminar tarea:", error)
        }
    }

    const totalCompletas = tareasFiltradas.filter(t => t.completa).length
    const totalIncompletas = tareasFiltradas.length - totalCompletas

    return (
        <div>
            <Buttons
                mostrarCompletas={mostrarCompletas}
                mostrarActivas={mostrarActivas}
                mostrarFiltroFecha={mostrarFiltroFecha}
                setMostrarFiltroFecha={setMostrarFiltroFecha}
                setFechaInicio={setFechaInicio}
                setFechaFin={setFechaFin}
                filtrarTodas={filtrarTodas}
                filtrarCompletasIncompletas={filtrarCompletasIncompletas}
                filtrarActivasInactivas={filtrarActivasInactivas}
                limpiarFiltros={limpiarFiltros}
            />

            <Render
                tareasFiltradas={tareasFiltradas}
                totalCompletas={totalCompletas}
                totalIncompletas={totalIncompletas}
                mostrarFiltroFecha={mostrarFiltroFecha}
                fechaInicio={fechaInicio}
                fechaFin={fechaFin}
                setFechaInicio={setFechaInicio}
                setFechaFin={setFechaFin}
                aplicarFiltroFecha={aplicarFiltroFecha}
                handleFieldUpdate={handleFieldUpdate}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default RenderTareas
