import { useNavigate } from "react-router-dom"

function BotonVolver() {
    const navigate = useNavigate()

    const volver = () => {
        navigate(-1)
    }

    return (
        <div>
            <button onClick={volver}>Volver</button>
        </div>
    )
}

export default BotonVolver
