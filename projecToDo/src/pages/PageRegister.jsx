import BotonVolver from '../components/general/BotonVolver'
import Header from '../components/general/Header'
import ValidacionLogin from '../components/general/ValidacionLogin'
import Register from '../components/register/Register'
import "../styles/Register/RegisterPage.css"

function PageRegister() {
    return (
        <div>
            <ValidacionLogin/>
            <Header/>
            <div className='Contenido'>
            <Register/>
            <BotonVolver/>
            </div>
        </div>
    )
}

export default PageRegister