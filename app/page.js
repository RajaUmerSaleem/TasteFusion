"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('admin');

  const handleLogin = async () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(user => user.username === username && user.password === password && user.role === role);

    if (user) {
      if (role === 'admin') {
        router.push('/admindash'); // Redirect to the admin dashboard
      } else if (role === 'cashier') {
        router.push('/cashierdash'); // Redirect to the cashier dashboard
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-black">
        <div className="flex w-[50vw] h-3/4 border border-gray-300 shadow-lg">
          <div className="w-1/2 bg-orange-600 flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center text-black text-lg font-bold border-2 border-blue-500">
              <Image src="/logo.png" width={100} height={100} alt="logo" />
            </div>
            <h1 className="text-3xl font-bold text-black mt-4">Taste Fusion</h1>
          </div>
          <div className="w-1/2 bg-gray-100 flex flex-col justify-center p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">SIGN IN</h2>
            <label className="block mb-2 text-gray-600" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="block mb-2 text-gray-600" htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="show-password"
                className="mr-2"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show-password" className="text-gray-600 text-sm">Show Password</label>
            </div>
            <div className="flex items-center mb-6">
              <input
                type="radio"
                name="role"
                id="admin"
                className="mr-2"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
              />
              <label htmlFor="admin" className="text-gray-600 text-sm mr-4">Admin</label>
              <input
                type="radio"
                name="role"
                id="cashier"
                className="mr-2"
                checked={role === 'cashier'}
                onChange={() => setRole('cashier')}
              />
              <label htmlFor="cashier" className="text-gray-600 text-sm">Cashier</label>
            </div>
            <button
              className="w-full bg-gray-300 text-gray-800 font-semibold py-2 rounded hover:bg-gray-400 transition duration-300"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}