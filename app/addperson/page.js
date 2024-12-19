"use client";
import React, { useState, useEffect, useRef } from 'react';
import Sidech from '../components/sidech';

const Page = () => {
  const [users, setUsers] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [dateRegistered, setDateRegistered] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
    const maxId = storedUsers.reduce((max, user) => Math.max(max, user.id), 0);
    setIdCounter(maxId + 1);
  }, []);

  const handleAdd = () => {
    if (!username || !password || !role || !status || !imagePath) {
      alert('All fields are required.');
      return;
    }
    const newUser = { id: idCounter, username, password, role, status, imagePath, dateRegistered: new Date().toLocaleDateString() };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setIdCounter(idCounter + 1);
    clearFields();
  };

  const handleUpdate = () => {
    if (!username || !password || !role || !status || !imagePath) {
      alert('All fields are required.');
      return;
    }
    const updatedUsers = users.map(user =>
      user.id === selectedUserId ? { ...user, username, password, role, status, imagePath, dateRegistered } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    clearFields();
  };

  const handleDelete = () => {
    const updatedUsers = users.filter(user => user.id !== selectedUserId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    clearFields();
  };

  const clearFields = () => {
    setUsername('');
    setPassword('');
    setRole('');
    setStatus('');
    setImagePath('');
    setDateRegistered('');
    setSelectedUserId(null);
  };

  const handleRowClick = (user) => {
    setSelectedUserId(user.id);
    setUsername(user.username);
    setPassword(user.password);
    setRole(user.role);
    setStatus(user.status);
    setImagePath(user.imagePath);
    setDateRegistered(user.dateRegistered);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePath(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImportButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="h-[100vh]">
      <div className="flex">
        <Sidech />
        <div className="w-3/4 p-4 flex">
          <div className="w-1/3 bg-orange-600 p-4 mr-4">
            <div className='flex items-center flex-col justify-center mb-4'>
              <div className="bg-yellow-400 w-20 h-20 mb-4">
                {imagePath && <img src={imagePath} alt="Imported" className="w-full h-full object-cover" />}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImport}
                ref={fileInputRef}
                className="mb-4 hidden"
              />
              <button
                className="bg-gray-300 text-black py-2 px-4 mb-4"
                onClick={handleImportButtonClick}
              >
                Import
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">Username:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">Password:</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">Role:</label>
              <select
                className="w-full p-2 border border-gray-300"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="cashier">Cashier</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">Status:</label>
              <select
                className="w-full p-2 border border-gray-300"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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

          {/* Table Section */}
          <div className="w-2/3 bg-orange-600 p-4">
            <h2 className="text-center text-2xl mb-4 text-white">Data of System Users</h2>
            <table className="w-full border-collapse border border-gray-300 bg-white">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-black text-white p-2">ID</th>
                  <th className="border border-gray-300 bg-black text-white p-2">Username</th>
                  <th className="border border-gray-300 bg-black text-white p-2">Password</th>
                  <th className="border border-gray-300 bg-black text-white p-2">Role</th>
                  <th className="border border-gray-300 bg-black text-white p-2">Status</th>
                  <th className="border border-gray-300 bg-black text-white p-2">Image Path</th>
                  <th className="border border-gray-300 bg-black text-white p-2">Date Reg.</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} onClick={() => handleRowClick(user)}>
                    <td className="border border-gray-300 p-2">{user.id}</td>
                    <td className="border border-gray-300 p-2">{user.username}</td>
                    <td className="border border-gray-300 p-2">{user.password}</td>
                    <td className="border border-gray-300 p-2">{user.role}</td>
                    <td className="border border-gray-300 p-2">{user.status}</td>
                    <td className="border border-gray-300 p-2">image path</td>
                    <td className="border border-gray-300 p-2">{user.dateRegistered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;