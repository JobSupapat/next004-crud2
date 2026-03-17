"use client";
import React, { useState } from 'react';
import { HiOutlineSearch, HiOutlineHome, HiOutlineTag } from 'react-icons/hi';

const SearchBar = ({ onSearch }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('ทั้งหมด');
    const [serviceType, setServiceType] = useState('ทั้งหมด');

    const handleSearch = (e) => {
        e.preventDefault();
        // ส่งค่ากลับไปให้หน้า Home เพื่อ Fetch ข้อมูลใหม่
        onSearch({ title, category, serviceType });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <form
                onSubmit={handleSearch}
                className="bg-white p-4 md:p-6 rounded-3xl shadow-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
            >
                {/* 1. ค้นหาตามชื่อ */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1 flex items-center gap-1">
                        <HiOutlineSearch className="text-red-700" /> ค้นหาโครงการ
                    </label>
                    <input
                        type="text"
                        placeholder="เช่น บ้านเดี่ยวหรู..."
                        className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-red-700 outline-none transition-all text-sm"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* 2. ประเภททรัพย์สิน */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1 flex items-center gap-1">
                        <HiOutlineHome className="text-red-700" /> ประเภท
                    </label>
                    <select
                        className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-red-700 outline-none text-sm"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="ทั้งหมด">ทั้งหมด</option>
                        <option value="บ้าน">บ้าน</option>
                        <option value="คอนโด">คอนโด</option>
                        <option value="ทาวน์โฮม">ทาวน์โฮม</option>
                    </select>
                </div>

                {/* 3. ประเภทบริการ */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1 flex items-center gap-1">
                        <HiOutlineTag className="text-red-700" /> บริการ
                    </label>
                    <select
                        className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-red-700 outline-none text-sm"
                        onChange={(e) => setServiceType(e.target.value)}
                    >
                        <option value="ทั้งหมด">ทั้งหมด</option>
                        <option value="ซื้อ">ซื้อ</option>
                        <option value="เช่า">เช่า</option>
                    </select>
                </div>

                {/* 4. ปุ่มค้นหา */}
                <button
                    type="submit"
                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    <HiOutlineSearch size={20} /> ค้นหาตอนนี้
                </button>
            </form>
        </div>
    );
};

export default SearchBar;