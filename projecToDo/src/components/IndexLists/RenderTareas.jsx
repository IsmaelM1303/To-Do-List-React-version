import React, { useState, useEffect } from "react"
import { getAll, remove, update } from "../api/Crud"

function RenderTareas() {
    const [tareasUsuario, setTareasUsuario] = useState([])
    const [tareasFiltradas, setTareasFiltradas] = useState([])
    const [mostrarCompletas, setMostrarCompletas] = useState(true)
    const [mostrarActivas, setMostrarActivas] = useState(true)
    const [mostrarFiltroFecha, setMostrarFiltroFecha] = useState(false)
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFin, setFechaFin] = useState("")

    useEffect(function () {
        const datos = localStorage.getItem("usuario")
        if (datos === null) return

        const usuario = JSON.parse(datos)
        if (!usuario || !usuario.usuarioEncontrado || usuario.usuarioEncontrado.id === undefined) {
            return
        }

        async function cargar() {
            try {
                const todas = await getAll("tareas")
                const propias = todas.filter(function (t) {
                    return t.idUsuario === usuario.usuarioEncontrado.id
                })
                setTareasUsuario(propias)
                setTareasFiltradas(propias)
            } catch (error) {
                console.error("Error obtener tareas:", error)
            }
        }

        cargar()
    }, [])

    function filtrarTodas() {
        setTareasFiltradas(tareasUsuario)
    }

    function filtrarCompletasIncompletas() {
        const lista = tareasUsuario.filter(function (t) {
            if (mostrarCompletas === true) {
                return t.completa === true
            }
            return t.completa === false
        })
        setTareasFiltradas(lista)
        setMostrarCompletas(!mostrarCompletas)
    }

    function filtrarActivasInactivas() {
        const lista = tareasUsuario.filter(function (t) {
            if (mostrarActivas === true) {
                return t.activa === true
            }
            return t.activa === false
        })
        setTareasFiltradas(lista)
        setMostrarActivas(!mostrarActivas)
    }

    function aplicarFiltroFecha() {
        if (fechaInicio === "" || fechaFin === "") return

        const inicio = new Date(fechaInicio)
        const fin = new Date(fechaFin)
        const lista = tareasUsuario.filter(function (t) {
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
            setTareasFiltradas(function (prev) {
                return prev.map(function (t) {
                    if (t.id === id) {
                        return { ...t, [field]: value }
                    }
                    return t
                })
            })
            setTareasUsuario(function (prev) {
                return prev.map(function (t) {
                    if (t.id === id) {
                        return { ...t, [field]: value }
                    }
                    return t
                })
            })

            await update("tareas", id, { [field]: value })
            console.log("Campo '" + field + "' actualizado:", id, value)
        } catch (error) {
            console.error("Error actualizando '" + field + "':", error)
        }
    }

    async function handleDelete(id) {
        try {
            await remove("tareas", id)
            setTareasUsuario(function (prev) {
                return prev.filter(function (t) {
                    return t.id !== id
                })
            })
            setTareasFiltradas(function (prev) {
                return prev.filter(function (t) {
                    return t.id !== id
                })
            })
            console.log("Tarea eliminada:", id)
        } catch (error) {
            console.error("Error eliminar tarea:", error)
        }
    }

    function textoCompletas() {
        if (mostrarCompletas === true) {
            return "Completas"
        }
        return "Incompletas"
    }
    function textoActivas() {
        if (mostrarActivas === true) {
            return "Activas"
        }
        return "Inactivas"
    }

    // 📊 Contadores de tareas completas e incompletas
    const totalCompletas = tareasFiltradas.filter(function (t) {
        return t.completa === true
    }).length

    const totalIncompletas = tareasFiltradas.filter(function (t) {
        return t.completa !== true
    }).length

    return (
        <div className="task-manager">
            <div className="filter-buttons">
                <button onClick={filtrarTodas}>Todas</button>
                <button onClick={filtrarCompletasIncompletas}>
                    {textoCompletas()}
                </button>
                <button onClick={filtrarActivasInactivas}>
                    {textoActivas()}
                </button>
                <button onClick={function () {
                    setMostrarFiltroFecha(!mostrarFiltroFecha)
                }}>
                    Rango Fechas
                </button>
                <button onClick={limpiarFiltros}>Limpiar</button>
            </div>

            {mostrarFiltroFecha && (
                <div className="date-filter">
                    <label>Inicio:</label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={function (e) {
                            setFechaInicio(e.target.value)
                        }}
                    />
                    <label>Fin:</label>
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={function (e) {
                            setFechaFin(e.target.value)
                        }}
                    />
                    <button onClick={aplicarFiltroFecha}>Aplicar</button>
                </div>
            )}

            <div className="results-section">
                <div className="status">
                    Resultados: {tareasFiltradas.length} | ✅ Completas: {totalCompletas} | ⏳ Incompletas: {totalIncompletas}
                </div>

                {tareasFiltradas.length > 0 && (
                    <ul className="task-list">
                        {tareasFiltradas.map(function (tarea) {
                            return (
                                <li key={tarea.id} className="task-item">
                                    <label htmlFor={"nombre-" + tarea.id}>Nombre:</label>
                                    <input
                                        id={"nombre-" + tarea.id}
                                        type="text"
                                        value={tarea.nombre}
                                        onChange={function (e) {
                                            handleFieldUpdate(tarea.id, "nombre", e.target.value)
                                        }}
                                    />

                                    <label htmlFor={"descripcion-" + tarea.id}>Descripción:</label>
                                    <textarea
                                        id={"descripcion-" + tarea.id}
                                        value={tarea.descripcion}
                                        onChange={function (e) {
                                            handleFieldUpdate(tarea.id, "descripcion", e.target.value)
                                        }}
                                    />

                                    <label htmlFor={"fecha-" + tarea.id}>Fecha:</label>
                                    <input
                                        id={"fecha-" + tarea.id}
                                        type="date"
                                        value={tarea.fecha || ""}
                                        onChange={function (e) {
                                            handleFieldUpdate(tarea.id, "fecha", e.target.value)
                                        }}
                                    />

                                    <label htmlFor={"completa-" + tarea.id}>Completa:</label>
                                    <input
                                        id={"completa-" + tarea.id}
                                        type="checkbox"
                                        checked={tarea.completa === true}
                                        onChange={function (e) {
                                            handleFieldUpdate(
                                                tarea.id,
                                                "completa",
                                                e.target.checked
                                            )
                                        }}
                                    />

                                    <label htmlFor={"activa-" + tarea.id}>Activa:</label>
                                    <input
                                        id={"activa-" + tarea.id}
                                        type="checkbox"
                                        checked={tarea.activa === true}
                                        onChange={function (e) {
                                            handleFieldUpdate(tarea.id, "activa", e.target.checked)
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={function () {
                                            handleDelete(tarea.id)
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                )}

                {tareasFiltradas.length === 0 && (
                    <div className="no-results">No se encontraron tareas.</div>
                )}
            </div>
        </div>
    )
}

export default RenderTareas
