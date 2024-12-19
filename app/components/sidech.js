import React from 'react'
import Link from 'next/link'

const Sidech = () => {
    return (
        <>
            <div className="w-1/4 h-[98vh] bg-orange-600 text-white flex flex-col items-center py-6 m-1">
                <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center text-black text-lg font-bold border-2 border-blue-500">
                    <img src="/logo.png" width={100} height={100} alt="logo" />
                </div>
                <h1 className="font-bold text-xl mb-2">Admin Portal</h1>
                <Link href="/admindash" className="w-4/5">
                    <button className="w-full bg-gray-300 text-black py-2 mb-4 font-semibold">Dashboard</button>
                </Link>
                <Link href="/addperson" className="w-4/5">
                    <button className="w-full bg-gray-300 text-black py-2 mb-4 font-semibold">Add Cashier/Admin</button>
                </Link>
                <Link href="/addproducts" className="w-4/5">
                    <button className="w-full bg-gray-300 text-black py-2 mb-4 font-semibold">Add Products</button>
                </Link>
                <Link href="/vieworders" className="w-4/5">
                    <button className="w-full bg-gray-300 text-black py-2 mb-4 font-semibold">View Orders</button>
                </Link>
                <Link href="/viewfeedbacks" className="w-4/5">
                    <button className="w-full bg-gray-300 text-black py-2 mb-4 font-semibold">View Feedback</button>
                </Link>
                <div className="mt-auto w-4/5">
                    <Link href="/">
                        <button className="w-full bg-gray-300 text-black py-2 font-semibold">LogOut</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Sidech
