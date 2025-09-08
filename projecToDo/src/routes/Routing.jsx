import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Index from '../pages/Index'
import PageLogin from '../pages/PageLogin'
import PageRegister from '../pages/PageRegister'
import PageIndexLists from '../pages/PageIndexLists'
import PagePerfil from '../pages/PagePerfil'

function Routing() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Index/>} />
                <Route path='/Login' element={<PageLogin/>} />
                <Route path='/Register' element={<PageRegister/>} />
                <Route path='/Listas' element={<PageIndexLists/>} />
                <Route path='/Perfil' element={<PagePerfil/>} />

            </Routes>
        </Router>
    )
}

export default Routing
