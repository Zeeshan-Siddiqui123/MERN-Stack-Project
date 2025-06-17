import React from 'react'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from '../Routes'
// import Login from './screens/Login'
// import Create from './screens/Create'
import ProductDetails from './screens/ProductDetails'
import Footer from './components/Footer'
import Men from './screens/Men'
import Women from './screens/Women'
import Couple from './screens/Couple'
import Product from './screens/Product'
import Cart from './screens/Cart'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    {routes.map(({ path, screen }, index) => (
                        <Route key={index} path={path} element={screen} />
                    ))}
                    <Route path='/products' element={<Product/>}>
                        <Route path='/products/men' element={<Men />} />
                        <Route path='/products/women' element={<Women />} />
                        <Route path='/products/couple' element={<Couple />} />
                    </Route>
                    {/* <Route path='/create-account' element={<Create/>}/>
                    <Route path='/login' element={<Login/>}/>  */}
                     <Route path='/product-details/:id' element={<ProductDetails/>}/> 
                     <Route path='/cart' element={<Cart/>}/>
                </Routes>
                <Footer />
            </BrowserRouter>

        </div>
    )
}

export default App
