import Header from '../components/general/Header'
import GoToLogin from '../components/Login/GoToLogin'
import GotoRegister from '../components/Register/GoToRegister'

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
