import React, { useState, useRef, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axios from 'axios';
import { Link } from 'react-router-dom'

const Product = () => {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState({
    title: '',
    price: '',
    description: '',
    image: null
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setData({ ...data, image: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, price, description, image } = data;

    if (!title || !price || !description || !image) {
      setError('All fields are required');
      setTimeout(() => setError(''), 2000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('file', image);

      const res = await axios.post('http://localhost:3000/products', formData);
      setMessage(res.data.message);

      setData({ title: '', price: '', description: '', image: null });
      fileRef.current.value = '';
      fetchProducts(); // Refresh product list

      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setTimeout(() => setError(''), 3000);
    }
  };

  const fetchProducts = () => {
    axios
      .get('http://localhost:3000/getproducts', { withCredentials: true })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:3000/product/delete/${id}`);
    setProducts(products.filter((product) => product._id !== id));
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Failed to delete product");
  }
};



  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto mb-10 p-8 bg-white rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add New Product
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="number"
            name="price"
            value={data.price}
            onChange={handleChange}
            placeholder="Rs:"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-md h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="file"
            name="image"
            ref={fileRef}
            onChange={handleChange}
            className="w-full text-sm text-gray-700"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Add Product
          </button>

          {message && <p className="text-green-600 text-center mt-3">{message}</p>}
          {error && <p className="text-red-600 text-center mt-3">{error}</p>}
        </div>
      </form>

      {/* Product Cards */}
      <h1 className='text-center font-bold mb-1'>Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No products found</p>
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              {product.file ? (
                <img
                  src={`http://localhost:3000/images/uploads/${product.file}`}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <h3 className="text-xl font-bold mb-1">{product.title}</h3>
              <p className="text-blue-600 font-semibold">Rs: {product.price}</p>
              <div className="btn flex justify-between">
                <Link to={`/edit/${product._id}`}>
                  <button><FiEdit size={20} color="orange" /></button>
                </Link>
                <button onClick={() => handleDelete(product._id)}>
                  <MdDelete size={25} color="red" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Product;
