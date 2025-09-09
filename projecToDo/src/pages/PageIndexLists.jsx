import Header from "../components/general/Header"
import AddTask from "../components/IndexLists/AddTask"
import RenderTareas from "../components/IndexLists/RenderTareas"
import SearchBar from "../components/IndexLists/SearchBar"

function PageIndexLists() {
    return (
        <div>
            <Header/>
            <SearchBar/>
            <AddTask/>
            <RenderTareas/>
        </div>
    )
}

export default PageIndexLists
