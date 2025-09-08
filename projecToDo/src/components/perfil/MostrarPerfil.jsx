function MostrarPerfil() {
    const guardado = localStorage.getItem("usuario")
    let usuario = {}

    if (guardado) {
        try {
            const datos = JSON.parse(guardado)
            for (const clave in datos) {
                usuario[clave] = datos[clave]
            }
        } catch {
            usuario = {}
        }
    }

    const renderValor = (clave, valor) => {
        if (clave === "contrasena") {
            return "********"
        }
        if (typeof valor === "object" && valor !== null) {
            const subLista = []
            for (const subClave in valor) {
                let subValor = valor[subClave]
                if (subClave === "contrasena") {
                    subValor = "********"
                }
                subLista.push(
                    <li key={clave + "-" + subClave}>
                        <strong>{subClave}:</strong> {String(subValor)}
                    </li>
                )
            }
            return <ul>{subLista}</ul>
        }
        return String(valor)
    }

    const listaElementos = []
    for (const clave in usuario) {
        if (clave === "usuarioEncontrado") {
            const interno = usuario[clave]
            if (typeof interno === "object" && interno !== null) {
                for (const subClave in interno) {
                    let subValor = interno[subClave]
                    if (subClave === "contrasena") {
                        subValor = "********"
                    }
                    listaElementos.push(
                        <li key={subClave}>
                            <strong>{subClave}:</strong> {String(subValor)}
                        </li>
                    )
                }
            }
        } else {
            listaElementos.push(
                <li key={clave}>
                    <strong>{clave}:</strong> {renderValor(clave, usuario[clave])}
                </li>
            )
        }
    }

    return (
        <div>
            <h2>Datos del usuario</h2>
            <ul>{listaElementos}</ul>
        </div>
    )
}

export default MostrarPerfil
