import React from 'react'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from '../Routes'
import Login from './screens/Login'
import Create from './screens/Create'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    {routes.map(({ path, screen }, index) => (
                        <Route key={index} path={path} element={screen} />
                    ))}
                    <Route path='/create-account' element={<Create/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default App
