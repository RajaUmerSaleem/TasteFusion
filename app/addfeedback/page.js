"use client";
import React, { useState, useEffect } from 'react';
import Cashside from '../components/cashside';

const Page = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [customerID, setCustomerID] = useState('');
  const [feedback, setFeedback] = useState('');
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    setFeedbacks(storedFeedbacks);
    const maxId = storedFeedbacks.reduce((max, feedback) => Math.max(max, feedback.id), 0);
    setIdCounter(maxId + 1);

    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    setCustomers(storedCustomers);
  }, []);

  const handleAdd = () => {
    if (!customerID || !feedback) {
      alert('All fields are required.');
      return;
    }
    const newFeedback = { id: idCounter, customerID, feedback };
    const updatedFeedbacks = [...feedbacks, newFeedback];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
    setIdCounter(idCounter + 1);
    clearFields();
  };

  const handleUpdate = () => {
    if (!customerID || !feedback) {
      alert('All fields are required.');
      return;
    }
    const updatedFeedbacks = feedbacks.map(fb =>
      fb.id === selectedFeedbackId ? { ...fb, customerID, feedback } : fb
    );
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
    clearFields();
  };

  const handleDelete = () => {
    const updatedFeedbacks = feedbacks.filter(fb => fb.id !== selectedFeedbackId);
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
    clearFields();
  };

  const clearFields = () => {
    setCustomerID('');
    setFeedback('');
    setSelectedFeedbackId(null);
  };

  const handleRowClick = (fb) => {
    setSelectedFeedbackId(fb.id);
    setCustomerID(fb.customerID);
    setFeedback(fb.feedback);
  };

  const getCustomerName = (customerID) => {
    const customer = customers.find(cust => cust.id === parseInt(customerID));
    return customer ? customer.customerName : 'Unknown';
  };

  return (
    <div className="text-white">
      <div className="flex h-screen">
        <Cashside />
        <div className="w-1/4 bg-orange-600 p-4 m-1 flex flex-col justify-center items-center">
          <div className="mb-4 w-full">
            <label htmlFor="customerId" className="block mb-2">Customer ID:</label>
            <input
              type="text"
              id="customerId"
              className="w-full p-2 text-black"
              value={customerID}
              onChange={(e) => setCustomerID(e.target.value)}
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="feedback" className="block mb-2">Feedback:</label>
            <input
              type="text"
              id="feedback"
              className="w-full p-2 text-black h-32"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          <div className='w-full flex flex-col justify-center items-center'>
            <div className="flex w-full">
              <button className="bg-gray-300 text-black py-2 px-4 m-2 w-1/2" onClick={handleAdd}>Add</button>
              <button className="bg-gray-300 text-black py-2 px-4 m-2 w-1/2" onClick={handleUpdate}>Update</button>
            </div>
            <div className="flex w-full">
              <button className="bg-gray-300 text-black py-2 px-4 m-2 w-1/2" onClick={handleDelete}>Delete</button>
              <button className="bg-gray-300 text-black py-2 px-4 m-2 w-1/2" onClick={clearFields}>Clear</button>
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-orange-600 p-4 m-1">
          <h2 className="text-xl font-bold mb-4">Data of Feedbacks</h2>
          <table className="w-full bg-white text-black ">
            <thead>
              <tr>
                <th className="border bg-gray-800 text-white border-white p-2">Customer_ID</th>
                <th className="border bg-gray-800 text-white border-white p-2">Customer_Name</th>
                <th className="border bg-gray-800 text-white border-white p-2">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(fb => (
                <tr key={fb.id} onClick={() => handleRowClick(fb)}>
                  <td className="border border-gray-600 p-2">{fb.customerID}</td>
                  <td className="border border-gray-600 p-2">{getCustomerName(fb.customerID)}</td>
                  <td className="border border-gray-600 p-2">{fb.feedback}</td>
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