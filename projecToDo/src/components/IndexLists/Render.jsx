import "../../styles/Lists/Render.css"

function Render({
    tareasFiltradas = [],
    totalCompletas = 0,
    totalIncompletas = 0,
    mostrarFiltroFecha = false,
    fechaInicio = "",
    fechaFin = "",
    setFechaInicio = () => { },
    setFechaFin = () => { },
    aplicarFiltroFecha = () => { },
    handleFieldUpdate = () => { },
    handleDelete = () => { }
}) {
    return (
        <div className="contenedor-tareas">
            {mostrarFiltroFecha && (
                <div className="bloque-fechas">
                    <div>
                        <label>Inicio:</label>
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={e => setFechaInicio(e.target.value)}
                        />
                        <label>Fin:</label>
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={e => setFechaFin(e.target.value)}
                        />
                        <button onClick={aplicarFiltroFecha}>Aplicar</button>
                    </div>
                </div>
            )}

            <div className="bloque-resultados">
                <div className="estado-tareas">
                    Resultados: {tareasFiltradas.length} | ✅ Completas: {totalCompletas} | ⏳ Incompletas: {totalIncompletas}
                </div>

                {tareasFiltradas.length > 0 ? (
                    <ul className="lista-tareas">
                        {tareasFiltradas.map(tarea => {
                            const estiloTachado = tarea.completa
                                ? { textDecoration: "line-through", opacity: 0.6 }
                                : {}

                            return (
                                <li key={tarea.id} className="tarea-item" style={estiloTachado}>
                                    <label htmlFor={`nombre-${tarea.id}`}>Nombre:</label>
                                    <input
                                        id={`nombre-${tarea.id}`}
                                        type="text"
                                        value={tarea.nombre}
                                        onChange={e => handleFieldUpdate(tarea.id, "nombre", e.target.value)}
                                    />

                                    <label htmlFor={`descripcion-${tarea.id}`}>Descripción:</label>
                                    <textarea
                                        id={`descripcion-${tarea.id}`}
                                        value={tarea.descripcion}
                                        onChange={e => handleFieldUpdate(tarea.id, "descripcion", e.target.value)}
                                    />

                                    <label htmlFor={`fecha-${tarea.id}`}>Fecha:</label>
                                    <input
                                        id={`fecha-${tarea.id}`}
                                        type="date"
                                        value={tarea.fecha || ""}
                                        onChange={e => handleFieldUpdate(tarea.id, "fecha", e.target.value)}
                                    />

                                    <label htmlFor={`completa-${tarea.id}`}>Completa:</label>
                                    <input
                                        id={`completa-${tarea.id}`}
                                        type="checkbox"
                                        checked={tarea.completa === true}
                                        onChange={e => handleFieldUpdate(tarea.id, "completa", e.target.checked)}
                                    />

                                    <label htmlFor={`activa-${tarea.id}`}>Activa:</label>
                                    <input
                                        id={`activa-${tarea.id}`}
                                        type="checkbox"
                                        checked={tarea.activa === true}
                                        onChange={e => handleFieldUpdate(tarea.id, "activa", e.target.checked)}
                                    />

                                    <button onClick={() => handleDelete(tarea.id)}>Eliminar</button>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <p className="tareasVacias">No hay tareas para mostrar.</p>
                )}
            </div>
        </div>
    )
}

export default Render
