import React, { useState, useEffect } from "react"
import { getAll, remove, update } from "../api/Crud"

function SearchBar() {
  const [tareasUsuario, setTareasUsuario] = useState([])
  const [tareasFiltradas, setTareasFiltradas] = useState([])
  const [busqueda, setBusqueda] = useState("")

  // 1. Carga inicial de tareas del usuario
  useEffect(function () {
    const datos = localStorage.getItem("usuario")
    if (datos === null) return

    const usuario = JSON.parse(datos)
    if (
      usuario === null ||
      usuario.usuarioEncontrado === undefined ||
      usuario.usuarioEncontrado.id === undefined
    ) {
      return
    }

    async function obtenerDatos() {
      try {
        const tareas = await getAll("tareas")
        const propias = tareas.filter(function (tarea) {
          return tarea.idUsuario === usuario.usuarioEncontrado.id
        })
        setTareasUsuario(propias)
      } catch (error) {
        console.error("Error al obtener tareas:", error)
      }
    }

    obtenerDatos()
  }, [])

  // 2. Filtrado por nombre cuando cambie busqueda o tareasUsuario
  useEffect(function () {
    if (busqueda === "") {
      setTareasFiltradas([])
      return
    }

    const term = busqueda.toLowerCase()
    const coincidencias = tareasUsuario.filter(function (tarea) {
      let nombre = ""
      if (tarea.nombre !== undefined) {
        nombre = tarea.nombre.toLowerCase()
      }
      return nombre.indexOf(term) !== -1
    })

    // Clonamos para permitir edición en el array filtrado
    const clon = coincidencias.map(function (tarea) {
      return {
        id: tarea.id,
        nombre: tarea.nombre,
        descripcion: tarea.descripcion,
        fecha: tarea.fecha,
        completa: tarea.completa,
        activa: tarea.activa,
        idUsuario: tarea.idUsuario
      }
    })

    setTareasFiltradas(clon)
  }, [busqueda, tareasUsuario])

  // 3. Actualiza campo localmente y en servidor automáticamente
  async function handleFieldUpdate(id, field, value) {
    // Actualización local en filtradas
    setTareasFiltradas(function (prev) {
      return prev.map(function (tarea) {
        if (tarea.id === id) {
          return { ...tarea, [field]: value }
        }
        return tarea
      })
    })
    // Actualización local en todas
    setTareasUsuario(function (prev) {
      return prev.map(function (tarea) {
        if (tarea.id === id) {
          return { ...tarea, [field]: value }
        }
        return tarea
      })
    })

    // Persistir en servidor
    try {
      await update("tareas", id, { [field]: value })
      console.log(
        "Campo '" + field + "' actualizado:",
        id,
        value
      )
    } catch (error) {
      console.error(
        "Error actualizando '" + field + "':",
        error
      )
    }
  }

  // 4. Elimina tarea en servidor y en estados locales
  async function handleDelete(id) {
    try {
      await remove("tareas", id)

      setTareasUsuario(function (prev) {
        return prev.filter(function (tarea) {
          return tarea.id !== id
        })
      })

      setTareasFiltradas(function (prev) {
        return prev.filter(function (tarea) {
          return tarea.id !== id
        })
      })

      console.log("Tarea eliminada:", id)
    } catch (error) {
      console.error("Error al eliminar tarea:", error)
    }
  }

  return (
    <div className="search-bar">
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={function (e) {
          setBusqueda(e.target.value)
        }}
      />

      {/* Solo renderiza resultados después de escribir algo */}
      {busqueda !== "" && (
        <div className="results-section">
          <div className="status">
            Buscando “{busqueda}” — {tareasFiltradas.length} resultados
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
                        handleFieldUpdate(
                          tarea.id,
                          "nombre",
                          e.target.value
                        )
                      }}
                    />

                    <label htmlFor={"descripcion-" + tarea.id}>
                      Descripción:
                    </label>
                    <textarea
                      id={"descripcion-" + tarea.id}
                      value={tarea.descripcion}
                      onChange={function (e) {
                        handleFieldUpdate(
                          tarea.id,
                          "descripcion",
                          e.target.value
                        )
                      }}
                    />

                    <label htmlFor={"fecha-" + tarea.id}>Fecha:</label>
                    <input
                      id={"fecha-" + tarea.id}
                      type="date"
                      value={tarea.fecha || ""}
                      onChange={function (e) {
                        handleFieldUpdate(
                          tarea.id,
                          "fecha",
                          e.target.value
                        )
                      }}
                    />

                    <label htmlFor={"completa-" + tarea.id}>
                      Completa:
                    </label>
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

                    <label htmlFor={"activa-" + tarea.id}>
                      Activa:
                    </label>
                    <input
                      id={"activa-" + tarea.id}
                      type="checkbox"
                      checked={tarea.activa === true}
                      onChange={function (e) {
                        handleFieldUpdate(
                          tarea.id,
                          "activa",
                          e.target.checked
                        )
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
            <div className="no-results">
              No se encontraron tareas.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
