import Header from '../components/general/Header'
import GoToLogin from '../components/login/GoToLogin'
import GotoRegister from '../components/register/GoToRegister'

function Index() {
    return (
        <div>
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
