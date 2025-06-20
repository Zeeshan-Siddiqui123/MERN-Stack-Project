import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { MdDelete } from "react-icons/md";
import { Modal, Button } from 'antd';
import { Link } from 'react-router-dom'

const Cart = () => {
  const { cart, removeFromCart, updateCart, clearCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const subtotal = cart.reduce((acc, product) => {
      return acc + product.price * (product.quantity || 1);
    }, 0);
    setTotal(subtotal);
  }, [cart]);

  const increase = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    updateCart(updatedCart);
  };

  const decrease = (index) => {
    const updatedCart = [...cart];
    if ((updatedCart[index].quantity || 1) > 1) {
      updatedCart[index].quantity -= 1;
      updateCart(updatedCart);
    }
  };

  const deleteItem = (product) => {
    Modal.confirm({
      title: 'Are you sure?',
      content: (
        <span>
          Are you sure you want to remove <b>{product.title}</b> from your cart?
        </span>
      ),
      okText: 'Yes, Remove',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        removeFromCart(product.id);
      },
    });
  };

  const confirmClearCart = () => {
    Modal.confirm({
      title: 'Are you sure?',
      content: 'This will remove all items from your cart.',
      okText: 'Yes, Clear Cart',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        clearCart();
      },
    });
  };

  return (
    <div className="w-full mt-22  px-4 py-6 bg-[#121212] text-white  shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">🛒 Your Cart</h1>
        <p className="text-gray-400 mt-2">Manage your selected products</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl text-gray-400 font-medium">Your cart is empty</h2>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {cart.map((product, index) => (
              <div key={product.id} className="bg-[#1f1f1f] p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full md:w-1/2">
                    <img
                      src={`http://localhost:3000/images/uploads/${product.file}`}
                      alt={product.title}
                      className="w-[60px] h-[60px] object-cover rounded-lg bg-black"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{product.title}</h3>
                      <p className="text-sm text-gray-400">Rs: {product.price.toFixed(2)} each</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrease(index)}
                        disabled={(product.quantity || 1) <= 1}
                        className="bg-gray-700 cursor-pointer hover:bg-gray-600 text-white px-3 py-1 rounded-full disabled:opacity-50 transition-all"
                      >
                        −
                      </button>
                      <span className="text-lg font-semibold">{product.quantity || 1}</span>
                      <button
                        onClick={() => increase(index)}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-3 cursor-pointer py-1 rounded-full transition-all"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-semibold text-green-400 text-lg">
                      Rs: {(product.price * (product.quantity || 1)).toFixed(2)}
                    </p>

                    <button
                      onClick={() => deleteItem(product)}
                      className="hover:text-red-600 transition-all"
                      title="Remove"
                    >
                      <MdDelete size={24} className="text-red-400 cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-white">
            <h2 className="text-2xl font-bold mb-4">💳 Cart Summary</h2>
            <div className="bg-[#1f1f1f] rounded-lg p-6 space-y-4 shadow-md">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-lg font-medium">Subtotal</span>
                <span className="text-lg">Rs: {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-lg font-medium">Delivery</span>
                <span className="text-green-400 font-medium">Free</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-xl font-bold">Total</span>
                <span className="text-xl font-bold text-green-400">Rs: {total.toFixed(2)}</span>
              </div>
              <div className='flex flex-col gap-3'>
                <Link to='/payment'>
                  <button className='w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-5 py-2 rounded-md'>
                    Pay
                  </button>
                </Link>
                <button onClick={confirmClearCart} className="w-full mt-4 bg-red-400 cursor-pointer hover:bg-red-500  text-white px-5 py-2 rounded-md">
                  Clear Cart
                </button>
              </div>
            </div>
          </div>


        </>
      )}
    </div>
  );
};

export default Cart;
