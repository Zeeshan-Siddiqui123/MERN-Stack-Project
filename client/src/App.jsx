import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from '../Routes';
import ProductDetails from './screens/ProductDetails';
import Footer from './components/Footer';
import Men from './screens/Men';
import Women from './screens/Women';
import Couple from './screens/Couple';
import Product from './screens/Product';
import Cart from './screens/Cart';
// import OrderTransactions from './screens/OrderTransactions';
import Payment from './Payment';

const App = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <BrowserRouter>
                <Header />

                {/* Main Content Area */}
                <main className="flex-grow">
                    <Routes>
                        {routes.map(({ path, screen }, index) => (
                            <Route key={index} path={path} element={screen} />
                        ))}
                        <Route path='/products' element={<Product />}>
                            <Route path='/products/men' element={<Men />} />
                            <Route path='/products/women' element={<Women />} />
                            <Route path='/products/couple' element={<Couple />} />
                        </Route>
                        <Route path='/product-details/:id' element={<ProductDetails />} />
                        <Route path='/payment' element={<Payment />} />
                        <Route path='/cart' element={<Cart />} />
                    </Routes>
                </main>

                {/* Footer */}
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
