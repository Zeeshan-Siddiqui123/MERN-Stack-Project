import React, { useState, useRef, useEffect } from 'react';
import { Modal, Spin, message, Table, Button, Input, Upload } from 'antd';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API } from '../../API';


const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileRef = useRef();


  const [data, setData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setData({ ...data, image: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const fetchProducts = () => {
    axios.get(`${API}/getproducts`)
      .then(res => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        message.error('Failed to fetch products');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    const { title, price, description, category, image } = data;

    if (!title || !price || !description || !category || !image) {
      message.error('All fields are required');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('file', image);

      const res = await axios.post(`${API}/products`, formData);
      message.success(res.data.message || 'Product added successfully');
      setData({ title: '', price: '', description: '', category: '', image: null });
      fileRef.current.value = '';
      fetchProducts();
      setShowModal(false);
    } catch (err) {
      message.error(err.response?.data?.message || 'Error adding product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Are you sure?',
      content: 'This action cannot be undone.',
      okText: 'Yes, delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await axios.delete(`${API}/product/delete/${id}`);
          message.success('Product deleted successfully');
          setProducts(products.filter(p => p._id !== id));
        } catch {
          message.error('Failed to delete product');
        }
      }
    });
  };

  const columns = [
  {
    title: 'S. No',
    key: 'index',
    render: (_, __, index) => index + 1,
    width: 80,
  },
  {
    title: 'Image',
    dataIndex: 'file',
    key: 'file',
    render: (file) => (
      <img
        src={`${API}/images/uploads/${file}`}
        alt="product"
        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
      />
    )
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Price (Rs)',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category'
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, product) => (
      <div className="flex gap-3">
        <Link to={`/edit/${product._id}`}>
          <Button icon={<FiEdit />} type="primary" />
        </Link>
        <Button
          icon={<MdDelete />}
          danger
          onClick={() => handleDelete(product._id)}
        />
      </div>
    )
  }
];


  if (loading) {
    return <div className="text-center mt-20"><Spin size="large" /></div>;
  }

  return (
    <div className=" min-h-screen bg-[#121212] p-6 mt-16 ml-60">
      <h1 className='text-white text-center'>Products</h1>
      {/* Add New Product Button */}
      <div className="flex justify-end mb-6 mt-12">
        
        <Button type="primary" onClick={() => setShowModal(true)}>
          + Add New Product
        </Button>
      </div>

      {/* Table */}
      <Table
        dataSource={products}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 7 }}
      />

      {/* Modal Form */}
      <Modal
        title="Add New Product"
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleSubmit}
        okText="Add"
        confirmLoading={submitting}
      >
        <div className="space-y-3">
          <Input
            placeholder="Title"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <Input
            type="number"
            placeholder="Price"
            name="price"
            value={data.price}
            onChange={handleChange}
          />
          <Input.TextArea
            rows={3}
            placeholder="Description"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
          <Input
            placeholder="Category"
            name="category"
            value={data.category}
            onChange={handleChange}
          />
          <input
            type="file"
            name="image"
            ref={fileRef}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Product;
