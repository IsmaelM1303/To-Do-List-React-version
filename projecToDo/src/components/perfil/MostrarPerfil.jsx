import "../../styles/Perfil/Mostrar.css"

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
                    <li className="perfil__item" key={clave + "-" + subClave}>
                        <strong className="perfil__clave">{subClave}:</strong>
                        <span className="perfil__valor">{String(subValor)}</span>
                    </li>
                )
            }
            return <ul className="perfil__sublista">{subLista}</ul>
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
                        <li className="perfil__item" key={subClave}>
                            <strong className="perfil__clave">{subClave}:</strong>
                            <span className="perfil__valor">{String(subValor)}</span>
                        </li>
                    )
                }
            }
        } else {
            listaElementos.push(
                <li className="perfil__item" key={clave}>
                    <strong className="perfil__clave">{clave}:</strong>
                    <span className="perfil__valor">{renderValor(clave, usuario[clave])}</span>
                </li>
            )
        }
    }

    return (
        <div className="perfil">
            <h2 className="perfil__titulo">Datos del usuario</h2>
            <ul className="perfil__lista">{listaElementos}</ul>
        </div>
    )
}

export default MostrarPerfil
