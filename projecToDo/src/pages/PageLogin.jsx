import Header from '../components/general/Header'
import Login from '../components/login/Login'
import BotonVolver from '../components/general/BotonVolver'
import ValidacionLogin from '../components/general/ValidacionLogin'

function PageLogin() {
    return (
        <div>
            <ValidacionLogin/>
            <Header/>
            <Login/>
            <BotonVolver/>
        </div>
    )
}

export default PageLogin
