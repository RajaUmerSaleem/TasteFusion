"use client";
import React, { useState, useEffect } from 'react';
import Sidech from '../components/sidech';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidech />
      <div className="w-3/4 p-4 flex flex-col">
        <div className="bg-orange-600 text-white p-4 mb-4 h-full">
          <h2 className="text-xl font-bold mb-4">Data of Orders</h2>
          <table className="w-full bg-white text-black ">
            <thead>
              <tr>
                <th className="border bg-gray-800 border-gray-600 p-2 text-white">Customer_ID</th>
                <th className="border bg-gray-800 border-gray-600 p-2 text-white">Total_Price</th>
                <th className="border bg-gray-800 border-gray-600 p-2 text-white">Amount</th>
                <th className="border bg-gray-800 border-gray-600 p-2 text-white">Change</th>
                <th className="border bg-gray-800 border-gray-600 p-2 text-white">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
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
      </div>
    </div>
  );
};

export default ViewOrders;