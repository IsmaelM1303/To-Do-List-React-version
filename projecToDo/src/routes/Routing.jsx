import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Index from '../pages/Index'
import PageLogin from '../pages/PageLogin'
import PageRegister from '../pages/PageRegister'
import PageIndexLists from '../pages/PageIndexLists'

function Routing() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Index/>} />
                <Route path='/Login' element={<PageLogin/>} />
                <Route path='/Register' element={<PageRegister/>} />
                <Route path='/Listas' element={<PageIndexLists/>} />
            </Routes>
        </Router>
    )
}

export default Routing
