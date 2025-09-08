const BASE_URL = "http://localhost:3001"

//Esto obtiene todo de un endpoint
export async function getAll(endpoint) {
    try {
        const res = await fetch(BASE_URL + "/" + endpoint)
        return await res.json()
    } catch (error) {
        console.error("Error al obtener todos:", error)
        return []
    }
}

//Esto obtiene por Id
export async function getById(endpoint, id) {
    try {
        const res = await fetch(BASE_URL + "/" + endpoint + "/" + id)
        return await res.json()
    } catch (error) {
        console.error("Error al obtener por ID:", error)
        return null
    }
}

//Esto crea una entrada nueva
export async function create(endpoint, data) {
    try {
        const res = await fetch(BASE_URL + "/" + endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        return await res.json()
    } catch (error) {
        console.error("Error al crear:", error)
        return null
    }
}

//Esto actualiza los datos
export async function update(endpoint, id, data) {
    try {
        const res = await fetch(BASE_URL + "/" + endpoint + "/" + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        return await res.json()
    } catch (error) {
        console.error("Error al actualizar:", error)
        return null
    }
}

//Esto elimina
export async function remove(endpoint, id) {
    try {
        const res = await fetch(BASE_URL + "/" + endpoint + "/" + id, {
            method: "DELETE"
        })
        return await res.json()
    } catch (error) {
        console.error("Error al eliminar:", error)
        return null
    }
}
