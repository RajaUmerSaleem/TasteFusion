"use client";
import React, { useState, useEffect, useRef } from 'react';
import Sidech from '../components/sidech';

const Page = () => {
  const [products, setProducts] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [type, setType] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
    const maxId = storedProducts.reduce((max, product) => Math.max(max, product.id), 0);
    setIdCounter(maxId + 1);
  }, []);

  const handleAdd = () => {
    if (!productID || !productName || !type || !stock || !price || !status || !imagePath) {
      alert('All fields are required.');
      return;
    }
    const newProduct = { id: idCounter, productID, productName, type, stock, price, status, imagePath };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setIdCounter(idCounter + 1);
    clearFields();
  };

  const handleUpdate = () => {
    if (!productID || !productName || !type || !stock || !price || !status || !imagePath) {
      alert('All fields are required.');
      return;
    }
    const updatedProducts = products.map(product =>
      product.id === selectedProductId ? { ...product, productID, productName, type, stock, price, status, imagePath } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    clearFields();
  };

  const handleDelete = () => {
    const updatedProducts = products.filter(product => product.id !== selectedProductId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    clearFields();
  };

  const clearFields = () => {
    setProductID('');
    setProductName('');
    setType('');
    setStock('');
    setPrice('');
    setStatus('');
    setImagePath('');
    setSelectedProductId(null);
  };

  const handleRowClick = (product) => {
    setSelectedProductId(product.id);
    setProductID(product.productID);
    setProductName(product.productName);
    setType(product.type);
    setStock(product.stock);
    setPrice(product.price);
    setStatus(product.status);
    setImagePath(product.imagePath);
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
    <div className="bg-white text-black">
      <div className="h-screen w-screen flex">
        <Sidech />
        <div className="w-[75%] m-2">
          <div className="bg-orange-600 h-[48%] text-white text-xl font-semibold px-4 py-2 mb-1">
            Data Of Products
            <div className="w-full bg-white mb-6 border">
              <table className="w-full bg-white text-black ">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-2  border">Product ID</th>
                    <th className="p-2  border">Product Name</th>
                    <th className="p-2  border">Type</th>
                    <th className="p-2  border">Stock</th>
                    <th className="p-2  border">Price</th>
                    <th className="p-2  border">Status</th>
                    <th className="p-2  border">Image Path</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} onClick={() => handleRowClick(product)} className="border-t cursor-pointer ">
                      <td className="p-2 font-light  text-center">{product.productID}</td>
                      <td className="p-2 font-light text-center">{product.productName}</td>
                      <td className="p-2 font-light text-center">{product.type}</td>
                      <td className="p-2 font-light text-center">{product.stock}</td>
                      <td className="p-2 font-light text-center">{product.price}</td>
                      <td className="p-2 font-light text-center">{product.status}</td>
                      <td className="p-2 font-light text-center">image path</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full bg-orange-600 text-white p-6">
            <div className="flex gap-6 mb-6">
              <div className="flex-1 grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="productID" className="block font-bold mb-1">Product ID:</label>
                  <input
                    id="productID"
                    type="text"
                    className="w-full bg-white text-black border px-2 py-1 mb-4"
                    value={productID}
                    onChange={(e) => setProductID(e.target.value)}
                  />
                  <label htmlFor="productName" className="block font-bold mb-1">Product Name:</label>
                  <input
                    id="productName"
                    type="text"
                    className="w-full bg-white text-black border px-2 py-1 mb-4"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <label htmlFor="type" className="block font-bold mb-1">Type:</label>
                  <select
                    id="type"
                    className="w-full bg-white text-black border px-2 py-1 mb-4"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="type1">Type 1</option>
                    <option value="type2">Type 2</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="stock" className="block font-bold mb-1">Stock:</label>
                  <input
                    id="stock"
                    type="text"
                    className="w-full bg-white text-black border px-2 py-1 mb-4"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                  <label htmlFor="price" className="block font-bold mb-1">Price($):</label>
                  <input
                    id="price"
                    type="text"
                    className="w-full bg-white text-black border px-2 py-1 mb-4"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label htmlFor="status" className="block font-bold mb-1">Status:</label>
                  <select
                    id="status"
                    className="w-full bg-white text-black border px-2 py-1 mb-4"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-yellow-400 border mb-2">
                  {imagePath && <img src={imagePath} alt="Product" className="w-full h-full object-cover" />}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImport}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button className="bg-gray-300 text-black px-4 py-2 font-semibold" onClick={handleImportButtonClick}>
                  Import
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 w-[75%]">
              <button className="bg-gray-300 text-black px-6 py-2 font-semibold" onClick={handleAdd}>Add</button>
              <button className="bg-gray-300 text-black px-6 py-2 font-semibold" onClick={handleUpdate}>Update</button>
              <button className="bg-gray-300 text-black px-6 py-2 font-semibold" onClick={handleDelete}>Delete</button>
              <button className="bg-gray-300 text-black px-6 py-2 font-semibold" onClick={clearFields}>Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;