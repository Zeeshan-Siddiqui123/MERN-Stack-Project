import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

const ProductDetails = () => {
  const { id } = useParams();
   const [products, setProducts] = useState([]);

   const fetchProducts = () => {
       axios
         .get('http://localhost:3000/getproducts', { withCredentials: true })
         .then((res) => setProducts(res.data))
         .catch((err) => console.error('Error fetching products:', err));
     };
   
     useEffect(() => {
       fetchProducts();
     }, []);

  return (
    <div>

    </div>
  )
}

export default ProductDetails
