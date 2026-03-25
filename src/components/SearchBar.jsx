"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // [IMPORT] ดึง Router มาใช้
import { HiOutlineHome, HiOutlineTag, HiOutlineCurrencyDollar } from 'react-icons/hi';

const SearchBar = () => {
    const router = useRouter(); // [DECLARE] เรียกใช้งาน Router
    const [category, setCategory] = useState('ทั้งหมด');
    const [serviceType, setServiceType] = useState('ซื้อ');
    const [priceRange, setPriceRange] = useState('ทั้งหมด');

    const handleSearch = (e) => {
        e.preventDefault();

        // [LOGIC UPGRADE] สร้าง Query String และสั่ง Redirect ไปหน้า /search
        const params = new URLSearchParams({
            category,
            serviceType,
            priceRange
        }).toString();

        router.push(`/search?${params}`); // สั่งให้หน้าเว็บกระโดดไปที่หน้าค้นหา
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-anuphan relative z-30">
            <form
                onSubmit={handleSearch}
                className="bg-white p-4 md:p-5 rounded-2xl shadow-xl border border-red-600 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
            >
                {/* 1. ประเภททรัพย์สิน */}
                <div className="space-y-1.5">
                    <label className="text-xs font-black text-gray-900 uppercase ml-1 flex items-center gap-1 tracking-wider italic">
                        <HiOutlineHome className="text-red-700" size={14} /> ประเภท
                    </label>
                    <select
                        className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-red-700 outline-none text-sm font-bold text-gray-900 cursor-pointer"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="ทั้งหมด">ทั้งหมด</option>
                        <option value="บ้าน">บ้าน</option>
                        <option value="คอนโด">คอนโด</option>
                        <option value="ทาวน์โฮม">ทาวน์โฮม</option>
                    </select>
                </div>

                {/* 2. ประเภทบริการ */}
                <div className="space-y-1.5">
                    <label className="text-xs font-black text-gray-900 uppercase ml-1 flex items-center gap-1 tracking-wider italic">
                        <HiOutlineTag className="text-red-700" size={14} /> บริการ
                    </label>
                    <select
                        className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-red-700 outline-none text-sm font-bold text-gray-900 cursor-pointer"
                        value={serviceType}
                        onChange={(e) => {
                            setServiceType(e.target.value);
                            setPriceRange('ทั้งหมด');
                        }}
                    >
                        <option value="ซื้อ">ซื้อ (ขายขาด)</option>
                        <option value="เช่า">เช่ารายเดือน</option>
                    </select>
                </div>

                {/* 3. ช่วงราคา */}
                <div className="space-y-1.5 animate-in fade-in duration-500">
                    <label className="text-xs font-black text-gray-900 uppercase ml-1 flex items-center gap-1 tracking-wider italic">
                        <HiOutlineCurrencyDollar className="text-red-700" size={14} /> ช่วงราคา
                    </label>
                    <select
                        className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-red-700 outline-none text-sm font-bold text-gray-900 cursor-pointer"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                    >
                        <option value="ทั้งหมด">ทั้งหมด</option>
                        {serviceType === 'ซื้อ' && (
                            <>
                                <option value="0-1000000">น้อยกว่า 1 ล้าน</option>
                                <option value="1000000-2000000">1 ล้าน - 2 ล้าน</option>
                                <option value="2000000-3000000">2 ล้าน - 3 ล้าน</option>
                                <option value="3000000-4000000">3 ล้าน - 4 ล้าน</option>
                                <option value="4000000-5000000">4 ล้าน - 5 ล้าน</option>
                                <option value="5000000-999999999">5 ล้านขึ้นไป</option>
                            </>
                        )}
                        {serviceType === 'เช่า' && (
                            <>
                                <option value="0-10000">น้อยกว่า 1 หมื่น</option>
                                <option value="10000-20000">1 หมื่น - 2 หมื่น</option>
                                <option value="20000-30000">2 หมื่น - 3 หมื่น</option>
                                <option value="30000-9999999">มากกว่า 3 หมื่น</option>
                            </>
                        )}
                    </select>
                </div>

                {/* 4. ปุ่มค้นหา */}
                <button
                    type="submit"
                    className="bg-red-700 hover:bg-black text-white font-black py-3 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 uppercase text-sm tracking-widest italic"
                >
                    ค้นหาอสังหาฯ
                </button>
            </form>
        </div>
    );
};

export default SearchBar;