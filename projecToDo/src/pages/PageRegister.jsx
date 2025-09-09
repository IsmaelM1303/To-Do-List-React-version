import BotonVolver from '../components/general/BotonVolver'
import Header from '../components/general/Header'
import ValidacionLogin from '../components/general/ValidacionLogin'
import Register from '../components/register/Register'

function PageRegister() {
    return (
        <div>
            <ValidacionLogin/>
            <Header/>
            <Register/>
            <BotonVolver/>
        </div>
    )
}

export default PageRegister