import { useNavigate } from 'react-router-dom'

function GoToLogin() {
    const navigate = useNavigate()

    const irALogin = () => {
        navigate('/Login')
    }

    return (
        <button onClick={irALogin}>Iniciar Sesión</button>
    )
}

export default GoToLogin
