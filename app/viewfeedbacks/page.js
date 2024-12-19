"use client";
import React, { useState, useEffect } from 'react';
import Sidech from '../components/sidech';

const ViewFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    setFeedbacks(storedFeedbacks);

    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    setCustomers(storedCustomers);
  }, []);

  const getCustomerName = (customerID) => {
    const customer = customers.find(cust => cust.id === parseInt(customerID));
    return customer ? customer.customerName : 'Unknown';
  };

  return (
    <div className="flex h-screen">
      <Sidech />
      <div className="w-3/4 p-4">
        <div className="bg-orange-600 p-4 mb-4 h-full">
          <h2 className="text-xl font-bold mb-4">Customer Feedbacks</h2>
          <table className="w-full bg-white text-balck">  
            <thead>
              <tr>
                <th className="border  bg-gray-800 border-gray-600 p-2 text-white">Customer ID</th>
                <th className="border  bg-gray-800 border-gray-600 p-2 text-white">Customer Name</th>
                <th className="border  bg-gray-800 border-gray-600 p-2 text-white">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(feedback => (
                <tr key={feedback.id}>
                  <td className="border border-gray-600 p-2">{feedback.customerID}</td>
                  <td className="border border-gray-600 p-2">{getCustomerName(feedback.customerID)}</td>
                  <td className="border border-gray-600 p-2">{feedback.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedbacks;