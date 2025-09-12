import { useNavigate } from 'react-router-dom'
import "../../styles/Buttons.css"

function GoToLogin() {
    const navigate = useNavigate()

    const irALogin = () => {
        navigate('/Login')
    }

    return (
        <div className="boton-contenedor">
            <button className="boton" onClick={irALogin}>
                Iniciar Sesión
            </button>
        </div>
    )
}

export default GoToLogin
