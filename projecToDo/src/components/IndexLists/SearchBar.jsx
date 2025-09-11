import React, { useState, useEffect } from "react";
import { getAll, remove, update } from "../api/Crud";
import Render from "./Render";
import "../../styles/Lists/Bar.css"

function SearchBar() {
  const [tareasUsuario, setTareasUsuario] = useState([]);
  const [tareasFiltradas, setTareasFiltradas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Carga inicial de tareas del usuario
  useEffect(() => {
    const datos = localStorage.getItem("usuario");
    if (!datos) return;

    const usuario = JSON.parse(datos);
    if (!usuario?.usuarioEncontrado?.id) return;

    async function obtenerDatos() {
      try {
        const tareas = await getAll("tareas");
        const propias = tareas.filter(t => t.idUsuario === usuario.usuarioEncontrado.id);
        setTareasUsuario(propias);
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    }

    obtenerDatos();
  }, []);

  // Filtrado por nombre
  useEffect(() => {
    if (busqueda === "") {
      setTareasFiltradas([]);
      return;
    }

    const term = busqueda.toLowerCase();
    const coincidencias = tareasUsuario.filter(tarea =>
      (tarea.nombre || "").toLowerCase().includes(term)
    );

    // Clonamos para permitir edición sin afectar el original directamente
    const clon = coincidencias.map(t => ({ ...t }));
    setTareasFiltradas(clon);
  }, [busqueda, tareasUsuario]);

  // Actualiza campo localmente y en servidor
  async function handleFieldUpdate(id, field, value) {
    setTareasFiltradas(prev =>
      prev.map(t => (t.id === id ? { ...t, [field]: value } : t))
    );
    setTareasUsuario(prev =>
      prev.map(t => (t.id === id ? { ...t, [field]: value } : t))
    );

    try {
      await update("tareas", id, { [field]: value });
      console.log(`Campo '${field}' actualizado:`, id, value);
    } catch (error) {
      console.error(`Error actualizando '${field}':`, error);
    }
  }

  // Elimina tarea
  async function handleDelete(id) {
    try {
      await remove("tareas", id);
      setTareasUsuario(prev => prev.filter(t => t.id !== id));
      setTareasFiltradas(prev => prev.filter(t => t.id !== id));
      console.log("Tarea eliminada:", id);
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  }

  // Contadores
  const totalCompletas = tareasFiltradas.filter(t => t.completa === true).length;
  const totalIncompletas = tareasFiltradas.filter(t => t.completa !== true).length;

  return (
    <div className="search-bar">
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      {/* Renderiza resultados solo si hay búsqueda */}
      <div className={`divContenedor ${busqueda !== "" && tareasFiltradas.length > 0 ? "visible" : "oculto"}`}>
        <div className="divContenido">
          {busqueda !== "" && tareasFiltradas.length > 0 && (
            <Render
              tareasFiltradas={tareasFiltradas}
              totalCompletas={totalCompletas}
              totalIncompletas={totalIncompletas}
              mostrarCompletas={true}
              mostrarActivas={true}
              mostrarFiltroFecha={false}
              fechaInicio={""}
              fechaFin={""}
              setFechaInicio={() => { }}
              setFechaFin={() => { }}
              setMostrarFiltroFecha={() => { }}
              filtrarTodas={() => { }}
              filtrarCompletasIncompletas={() => { }}
              filtrarActivasInactivas={() => { }}
              aplicarFiltroFecha={() => { }}
              limpiarFiltros={() => { }}
              handleFieldUpdate={handleFieldUpdate}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </div>

    </div>
  );
}

export default SearchBar;
