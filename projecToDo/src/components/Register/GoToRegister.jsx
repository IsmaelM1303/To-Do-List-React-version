import { useNavigate } from 'react-router-dom'
import "../../styles/Buttons.css"


function GoToLogin() {
    const navigate = useNavigate()

    const irARegister = () => {
        navigate('/Register')
    }

    return (
        <div className="boton-contenedor">
            <button className="boton" onClick={irARegister}>
                Registrarse
            </button>
        </div>
    )
}

export default GoToLogin
