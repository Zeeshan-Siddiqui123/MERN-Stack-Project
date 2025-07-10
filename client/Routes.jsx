import React from "react";
import About from "./src/screens/About";
import Contact from "./src/screens/Contact";
import Home from "./src/screens/Index";
import Product from "./src/screens/Product";
import Orders from "./src/screens/Orders";
import PrivateRoute from "./src/screens/PrivateRoute";

export const routes = [
    {
        path: '/',
        screen : <Home/>,
        label: 'Home'
    },
    {
        path: '/about',
        screen : <About/>,
        label: 'About'
    },
    {
        path: '/products',
        screen : <Product/>,
        label: 'Shop'
    },
    {
        path: '/orders',
        screen : <PrivateRoute><Orders/></PrivateRoute>,
        label: 'Your Orders'
    },
    {
        path: '/contact',
        screen : <Contact/>,
        label: 'Contact'
    },
]