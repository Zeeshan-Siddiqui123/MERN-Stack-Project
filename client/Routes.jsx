import React from "react";
import About from "./src/screens/About";
import Contact from "./src/screens/Contact";
import Home from "./src/screens/Index";
import Product from "./src/screens/Product";

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
        path: '/contact',
        screen : <Contact/>,
        label: 'Contact'
    },
]