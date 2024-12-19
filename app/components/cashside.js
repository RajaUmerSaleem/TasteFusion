import React from 'react';
import Link from 'next/link';
const Cashside = () => {
  return (
    <div className="w-1/4 h-[100vh] bg-orange-600 text-white flex flex-col items-center py-6 m-1">
      <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center text-black text-lg font-bold border-2 border-blue-500">
        <img src="/logo.png" width={100} height={100} alt="logo" />
      </div>
      <h1 className="font-bold text-xl mb-2">Cashier Portal</h1>
      <Link href="/cashierdash" className="w-4/5">
        <button className="w-full bg-gray-300 text-black py-2 mb-4 font-semibold">Dashboard</button>
      </Link>
      <Link href="/addcustomer" className="w-4/5">
        <button className="w-full bg-gray-300 text-black py-2 mb-4 font-semibold">Add Customers</button>
      </Link>
      <Link href="/takeorders" className="w-4/5">
        <button className="w-full bg-gray-300 text-black py-2 mb-4 font-semibold">Take Orders</button>
      </Link>
      <Link href="/addfeedback" className="w-4/5">
        <button className="w-full bg-gray-300 text-black py-2 mb-4 font-semibold">Add Feedback</button>
      </Link>
      <div className="mt-auto w-4/5">
        <Link href="/">
          <button className="w-full bg-gray-300 text-black py-2 font-semibold">LogOut</button>
        </Link>
      </div>
    </div>
  );
};

export default Cashside;