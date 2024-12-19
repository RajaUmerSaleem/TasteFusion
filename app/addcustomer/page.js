"use client"
import React, { useState, useEffect } from 'react';
import Cashside from '../components/cashside';

const Page = () => {
  const [customers, setCustomers] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    setCustomers(storedCustomers);
    const maxId = storedCustomers.reduce((max, customer) => Math.max(max, customer.id), 0);
    setIdCounter(maxId + 1);
  }, []);

  const handleAdd = () => {
    if (!customerName || !phone || !address) {
      alert('All fields are required.');
      return;
    }
    const newCustomer = { id: idCounter, customerName, phone, address };
    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setIdCounter(idCounter + 1);
    clearFields();
  };

  const handleUpdate = () => {
    if (!customerName || !phone || !address) {
      alert('All fields are required.');
      return;
    }
    const updatedCustomers = customers.map(customer =>
      customer.id === selectedCustomerId ? { ...customer, customerName, phone, address } : customer
    );
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    clearFields();
  };

  const handleDelete = () => {
    const updatedCustomers = customers.filter(customer => customer.id !== selectedCustomerId);
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    clearFields();
  };

  const clearFields = () => {
    setCustomerName('');
    setPhone('');
    setAddress('');
    setSelectedCustomerId(null);
  };

  const handleRowClick = (customer) => {
    setSelectedCustomerId(customer.id);
    setCustomerName(customer.customerName);
    setPhone(customer.phone);
    setAddress(customer.address);
  };

  return (
    <div className="bg-white text-black">
      <div className="flex h-screen">
        <Cashside />
        <div className="w-1/4 bg-orange-600 p-4 m-2">
          <div className="mb-4">
            <label htmlFor="customerName" className="block mb-2">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              className="w-full p-2 text-black"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2">Phone:</label>
            <input
              type="text"
              id="phone"
              className="w-full p-2 text-black"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-2">Address:</label>
            <input
              type="text"
              id="address"
              className="w-full p-2 text-black"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className='w-[100%] flex flex-col justify-center items-center'>
            <div className="flex w-[100%]">
              <button className="bg-gray-300 text-black py-2 px-4 m-2 w-[50%]" onClick={handleAdd}>Add</button>
              <button className="bg-gray-300 text-black py-2 px-4 m-2 w-[50%]" onClick={handleUpdate}>Update</button>
            </div>
            <div className="flex w-[100%]">
              <button className="bg-gray-300 text-black py-2 px-4 m-2 w-[50%]" onClick={handleDelete}>Delete</button>
              <button className="bg-gray-300 text-black py-2 px-4 m-2 w-[50%]" onClick={clearFields}>Clear</button>
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-orange-600 p-4 m-2">
          <h2 className="text-xl font-bold mb-4">Data of Customers</h2>
          <table className="w-full bg-white text-black">
            <thead>
              <tr>
                <th className="border border-gray-600 p-2">Customer_ID</th>
                <th className="border border-gray-600 p-2">Customer_Name</th>
                <th className="border border-gray-600 p-2">Customer_Phone</th>
                <th className="border border-gray-600 p-2">Customer_Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id} onClick={() => handleRowClick(customer)}>
                  <td className="border border-gray-600 p-2">{customer.id}</td>
                  <td className="border border-gray-600 p-2">{customer.customerName}</td>
                  <td className="border border-gray-600 p-2">{customer.phone}</td>
                  <td className="border border-gray-600 p-2">{customer.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;