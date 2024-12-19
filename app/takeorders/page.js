"use client";
import React, { useState, useEffect } from 'react';
import Cashside from '../components/cashside';

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [customerID, setCustomerID] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [change, setChange] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
    const maxId = storedOrders.reduce((max, order) => Math.max(max, order.id), 0);
    setIdCounter(maxId + 1);
  }, []);
  useEffect(() => {
    const calculatedChange = (parseFloat(totalPrice))-parseFloat(amount).toFixed(2);
    setChange(calculatedChange);
  }, [totalPrice, amount]);
  const handleAdd = () => {
    if (!customerID || !totalPrice || !amount || !change) {
      alert('All fields are required.');
      return;
    }
    const newOrder = { id: idCounter, customerID, totalPrice, amount, change, date: new Date().toLocaleDateString() };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setIdCounter(idCounter + 1);
    clearFields();
  };

  const handleUpdate = () => {
    if (!customerID || !totalPrice || !amount || !change) {
      alert('All fields are required.');
      return;
    }
    const updatedOrders = orders.map(order =>
      order.id === selectedOrderId ? { ...order, customerID, totalPrice, amount, change, date: new Date().toLocaleDateString() } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    clearFields();
  };

  const handleDelete = () => {
    const updatedOrders = orders.filter(order => order.id !== selectedOrderId);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    clearFields();
  };

  const clearFields = () => {
    setCustomerID('');
    setTotalPrice('');
    setAmount('');
    setChange('');
    setSelectedOrderId(null);
  };

  const handleRowClick = (order) => {
    setSelectedOrderId(order.id);
    setCustomerID(order.customerID);
    setTotalPrice(order.totalPrice);
    setAmount(order.amount);
    setChange(order.change);
  };

  return (
    <div className="flex h-screen">
      <Cashside />
      <div className="w-3/4 p-4 flex flex-col">
        <div className="bg-orange-600 text-white p-4 mb-4 h-[50vh]">
          <h2 className="text-xl font-bold mb-4">Data of Orders</h2>
          <table className="w-full bg-white text-black  overflow-y-scroll">
            <thead>
              <tr className='bg-gray-600'>
                <th className="border border-white p-2">Customer_ID</th>
                <th className="border border-white p-2">Total_Price</th>
                <th className="border border-white p-2">Amount</th>
                <th className="border border-white p-2">Change</th>
                <th className="border border-white p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} onClick={() => handleRowClick(order)} className='cursor-pointer hover:bg-gray-200 h-[20px]'>
                  <td className="border border-gray-600 p-2">{order.customerID}</td>
                  <td className="border border-gray-600 p-2">{order.totalPrice}</td>
                  <td className="border border-gray-600 p-2">{order.amount}</td>
                  <td className="border border-gray-600 p-2">{order.change}</td>
                  <td className="border border-gray-600 p-2">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='bg-orange-600 p-4'>
          <div className="flex">
            <div className="w-1/2 pr-4">
              <div className="mb-4 pr-10">
                <label htmlFor="customerId" className="block mb-2">Customer ID:</label>
                <input
                  type="text"
                  id="customerId"
                  className="w-full p-2 text-black"
                  value={customerID}
                  onChange={(e) => setCustomerID(e.target.value)}
                />
              </div>
              <div className="mb-4 pr-10">
                <label htmlFor="totalPrice" className="block mb-2">Total Price ($):</label>
                <input
                  type="text"
                  id="totalPrice"
                  className="w-full p-2 text-black"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                />
              </div>
              <div className="mb-4 pr-10">
                <label htmlFor="amount" className="block mb-2">Amount ($):</label>
                <input
                  type="text"
                  id="amount"
                  className="w-full p-2 text-black"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="w-1/2 pl-4 justify-center flex items-center">
              <div className="bg-yellow-400 h-[40%] w-[90%] p-4 text-black mb-4 flex justify-center items-center">
                Change ($$): {change?change:'0.00'}
              </div>
            </div>
          </div>
          <div className="flex space-x-2 mt-4 justify-center items-center w-[70%] px-[20px]">
            <button className="bg-gray-300 text-black py-2 px-4 w-[25%]" onClick={handleAdd}>Add</button>
            <button className="bg-gray-300 text-black py-2 px-4 w-[25%]" onClick={handleUpdate}>Update</button>
            <button className="bg-gray-300 text-black py-2 px-4 w-[25%]" onClick={handleDelete}>Delete</button>
            <button className="bg-gray-300 text-black py-2 px-4 w-[25%]" onClick={clearFields}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;