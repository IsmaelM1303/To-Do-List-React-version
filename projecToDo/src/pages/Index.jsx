import Header from '../components/general/Header'
import ValidacionLogin from '../components/general/ValidacionLogin'
import GoToLogin from '../components/login/GoToLogin'
import GotoRegister from '../components/register/GoToRegister'
import "../styles/IndexStart.css"
function Index() {
    return (
        <div>
            <ValidacionLogin />
            <Header />
            <div className='divContenedorIndex'>
            <GoToLogin />
            <GotoRegister />
            </div>
        </div>
    )
}

export default Index
