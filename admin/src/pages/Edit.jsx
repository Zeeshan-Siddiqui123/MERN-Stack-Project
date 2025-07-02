import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../API';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: '',
    price: '',
    description: '',
    category: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API}/product/${id}`)
      .then(res => {
        const product = res.data;
        setData({
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
        });
      })
      .catch(err => {
        console.error('Error fetching product:', err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, price, description, category } = data;

    if (!title || !price || !description || !category) {
      setError('All fields are required');
      setTimeout(() => setError(''), 2000);
      return;
    }

    try {
      await axios.post(`${API}/product/update/${id}`, data);
      alert('Product updated successfully');
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert('Failed to update product');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded shadow mt-10"
    >
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <input
        type="text"
        name="title"
        value={data.title}
        onChange={handleChange}
        placeholder="Product Title"
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="number"
        name="price"
        value={data.price}
        onChange={handleChange}
        placeholder="Rs:"
        className="w-full mb-3 p-2 border rounded"
      />

      <textarea
        name="description"
        value={data.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="text"
        name="category"
        value={data.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full mb-3 p-2 border rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update Product
      </button>
    </form>
  );
};

export default Edit;
