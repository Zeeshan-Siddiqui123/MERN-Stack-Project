import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { MdDelete } from "react-icons/md";
import { Modal, Button } from 'antd';

const Cart = () => {
  const { cart, removeFromCart, updateCart, clearCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  useEffect(() => {
    const subtotal = cart.reduce((acc, product) => {
      return acc + product.price * (product.quantity || 1);
    }, 0);
    setTotal(subtotal);
  }, [cart]);

  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    removeFromCart(selectedProduct.id);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mt-5">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="text-center mt-6">
          <h2 className="text-xl font-medium">Your cart is empty</h2>
        </div>
      ) : (
        <>
          <div className="flex flex-row items-center justify-around w-full p-2 mt-4 bg-gray-100 rounded-lg flex-wrap">
            <h3 className="font-bold">Product</h3>
            <h3 className="font-bold">Title</h3>
            <h3 className="font-bold">Price</h3>
            <h3 className="font-bold">Quantity</h3>
            <h3 className="font-bold">Remove</h3>
          </div>

          {cart.map((product, index) => (
            <div key={product.id} className="flex flex-col items-center justify-evenly">
              <div className="flex flex-row items-center justify-around gap-4 w-full mt-4 p-3 border border-gray-300 rounded-lg bg-white shadow-sm flex-wrap">
                <img src={product.image} alt={product.title} className="w-[50px] h-[50px] object-cover rounded-md shadow-sm" />
                <div className="w-[160px]">
                  <h3 className="font-medium">{product.title}</h3>
                </div>
                <p className="text-lg font-semibold">
                  ${(product.price * (product.quantity || 1)).toFixed(2)}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrease(index)}
                    disabled={(product.quantity || 1) <= 1}
                    className="bg-gray-300 hover:bg-gray-400 text-black p-2 w-[40px] h-[40px] rounded-full transition-all disabled:opacity-50"
                  >
                    −
                  </button>
                  <span className="text-lg">{product.quantity || 1}</span>
                  <button
                    onClick={() => increase(index)}
                    className="bg-gray-300 hover:bg-gray-400 text-black p-2 w-[40px] h-[40px] rounded-full transition-all"
                  >
                    +
                  </button>
                </div>
                <button onClick={() => showModal(product)} className="hover:text-red-700 transition-all">
                  <MdDelete size={30} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}

          <div className="text-center mt-6">
            <h2 className="text-2xl font-semibold">Cart Totals</h2>
          </div>

          <div className="flex flex-col gap-4 items-center mt-4 bg-gray-50 p-4 rounded-lg shadow-md w-full">
            <div className="flex flex-row items-center justify-between w-[300px] p-2 border-b border-gray-300">
              <h3 className="font-medium">Subtotal</h3>
              <h3 className="font-medium">${total.toFixed(2)}</h3>
            </div>
            <div className="flex flex-row items-center justify-between w-[300px] p-2 border-b border-gray-300">
              <h3 className="font-medium">Delivery Fee</h3>
              <h3 className="font-medium text-green-600">Free</h3>
            </div>
            <div className="flex flex-row items-center justify-between w-[300px] p-2 border-b border-gray-300">
              <h3 className="font-bold">Total</h3>
              <h3 className="font-bold">${total.toFixed(2)}</h3>
            </div>
            <Button danger onClick={clearCart}>Clear Cart</Button>
          </div>

          <Modal
            title="Confirm Removal"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Yes, Remove"
            cancelText="Cancel"
          >
            <p>Are you sure you want to remove <b>{selectedProduct?.title}</b> from the cart?</p>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Cart;
