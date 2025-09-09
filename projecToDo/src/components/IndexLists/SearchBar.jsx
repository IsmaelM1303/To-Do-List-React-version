import { useEffect } from "react"
import { getAll } from "../api/Crud"

function SearchBar() {
    const datos = localStorage.getItem("usuario")
    const usuario = JSON.parse(datos)

    useEffect(() => {
        const tareasUsuario = []
        const obtenerDatos = async () => {
            try {
                const tareas = await getAll("tareas")
                tareas.map(tarea => {
                    if (tarea.idUsuario === usuario.usuarioEncontrado.id) {
                        tareasUsuario.push(tarea)
                    }
                })
                
                
            } catch (error) {
                console.error("Error al obtener tareas:", error)
            }
        }
        console.log(tareasUsuario);

        if (usuario?.usuarioEncontrado?.id) {
            obtenerDatos()
        }
    }, [])
    
    return <div></div>
}

export default SearchBar
