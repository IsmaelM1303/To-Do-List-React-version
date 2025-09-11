import Header from '../components/general/Header'
import Login from '../components/login/Login'
import BotonVolver from '../components/general/BotonVolver'
import ValidacionLogin from '../components/general/ValidacionLogin'
import "../styles/Login/LoginPage.css"

function PageLogin() {
    return (
        <div>
            <ValidacionLogin/>
            <Header/>
            <div className='Contenido'>
            <Login/>
            <BotonVolver/>
            </div>
        </div>
    )
}

export default PageLogin
