import BotonVolver from "../components/general/BotonVolver"
import Header from "../components/general/Header"
import EditarPerfil from "../components/perfil/EditarPerfil"
import MostrarPerfil from "../components/perfil/MostrarPerfil"


function PagePerfil() {

    return (
        <div>
            <Header/>
            <MostrarPerfil/>
            <EditarPerfil/>
            <BotonVolver/>
        </div>
    )
}

export default PagePerfil
