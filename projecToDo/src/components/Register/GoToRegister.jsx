import { useNavigate } from 'react-router-dom'

function GoToLogin() {
    const navigate = useNavigate()

    const irALogin = () => {
        navigate('/Register')
    }

    return (
        <button onClick={irALogin}>Registrarse</button>
    )
}

export default GoToLogin
