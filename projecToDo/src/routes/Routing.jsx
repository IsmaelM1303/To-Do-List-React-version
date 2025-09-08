import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Index from '../pages/Index'
import PageLogin from '../pages/PageLogin'
import PageRegister from '../pages/PageRegister'

function Routing() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Index/>} />
                <Route path='/Login' element={<PageLogin/>} />
                <Route path='/Register' element={<PageRegister/>} />
            </Routes>
        </Router>
    )
}

export default Routing
