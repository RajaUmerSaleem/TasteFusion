"use client";
import React, { useState, useEffect } from 'react';
import Cashside from '../components/cashside';

const Page = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [todaysIncome, setTodaysIncome] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

    setTotalProducts(storedProducts.length);
    setTotalCustomers(storedCustomers.length);

    const today = new Date().toLocaleDateString();
    const todaysOrders = storedOrders.filter(order => order.date === today);
    const todaysIncome = todaysOrders.reduce((sum, order) => sum + parseFloat(order.totalPrice), 0);
    setTodaysIncome(todaysIncome);

    const totalIncome = storedOrders.reduce((sum, order) => sum + parseFloat(order.totalPrice), 0);
    setTotalIncome(totalIncome);
  }, []);

  return (
    <div className="flex h-[100vh]">
      <Cashside />
      <div className="flex-1 p-5">
        <div className="grid grid-cols-4 gap-4 mb-5 h-[25vh]">
          <div className="bg-orange-300 font-bold p-4 rounded shadow border h-[100%] border-gray-600 flex flex-col items-center justify-center">
            <div className="text-lg">Number of total Products:</div>
            <div className="text-4xl mt-2">{totalProducts}</div>
          </div>
          <div className="bg-orange-300 font-bold p-4 rounded shadow border h-[100%] border-gray-600 flex flex-col items-center justify-center">
            <div className="text-lg">Number of Customers:</div>
            <div className="text-4xl mt-2">{totalCustomers}</div>
          </div>
          <div className="bg-orange-300 font-bold p-4 rounded shadow border h-[100%] border-gray-600 flex flex-col items-center justify-center">
            <div className="text-lg">Todays Income:</div>
            <div className="text-4xl mt-2">${todaysIncome.toFixed(2)}</div>
          </div>
          <div className="bg-orange-300 font-bold p-4 rounded shadow border h-[100%] border-gray-600 flex flex-col items-center justify-center">
            <div className="text-lg">Total Income:</div>
            <div className="text-4xl mt-2">${totalIncome.toFixed(2)}</div>
          </div>
        </div>
        <div className="flex items-center justify-center h-[60%]">
          <img src="/th.jpg" className="object-cover h-full w-full" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Page;