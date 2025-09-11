import { useNavigate } from "react-router-dom"
import "../../styles/GoBack.css"

function BotonVolver() {
    const navigate = useNavigate()

    const volver = () => {
        navigate(-1)
    }

    return (
        <div className="boton-volver-contenedor">
            <button className="boton-volver" onClick={volver}>
                Volver
            </button>
        </div>
    )
}

export default BotonVolver
