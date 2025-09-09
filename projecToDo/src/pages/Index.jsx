import Header from '../components/general/Header'
import ValidacionLogin from '../components/general/ValidacionLogin'
import GoToLogin from '../components/login/GoToLogin'
import GotoRegister from '../components/register/GoToRegister'

function Index() {
    return (
        <div>
            <ValidacionLogin/>
            <Header/>
            <h1>Pagina inicio</h1>

            <div>
                <GoToLogin/>
                <GotoRegister />
            </div>
        </div>
    )
}

export default Index
