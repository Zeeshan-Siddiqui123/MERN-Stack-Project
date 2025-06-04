import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/product/${id}`)
      .then(res => {
        const product = res.data;
        setData({
          title: product.title,
          price: product.price,
          description: product.description,
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

    try {
      await axios.post(`http://localhost:3000/product/update/${id}`, data);
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
      className="max-w-lg mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

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
