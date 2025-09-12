import BotonVolver from "../components/general/BotonVolver"
import Header from "../components/general/Header"
import EditarPerfil from "../components/perfil/EditarPerfil"
import MostrarPerfil from "../components/perfil/MostrarPerfil"


function PagePerfil() {

    return (
        <div>
            <Header/>
            <BotonVolver/>
            <MostrarPerfil/>
            <EditarPerfil/>
        </div>
    )
}

export default PagePerfil
