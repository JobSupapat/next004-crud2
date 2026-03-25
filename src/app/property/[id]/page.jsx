"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaBed, FaBath, FaCar, FaMapMarkerAlt, FaShareAlt, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { HiOutlineBadgeCheck, HiOutlineCurrencyDollar } from 'react-icons/hi';
import { MdOutlineTimer } from 'react-icons/md';
import { useSession } from "next-auth/react";

export default function PropertyDetail() {
    const { data: session } = useSession();
    const { id } = useParams();
    const router = useRouter();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState("");

    const handleDelete = async () => {
        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบประกาศนี้? รูปภาพทั้งหมดจะถูกลบออกจาก Cloudinary")) {
            try {
                const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    alert("ลบประกาศเรียบร้อยแล้ว");
                    router.push('/');
                }
            } catch (error) { console.error("Delete Error:", error); }
        }
    };

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await fetch(`/api/properties/${id}`);
                const data = await res.json();
                if (res.ok && data) {
                    setItem(data);
                    if (data.images?.length > 0) setMainImage(data.images[0]);
                }
            } catch (error) { console.error("Fetch Error:", error); }
            finally { setLoading(false); }
        };
        fetchDetail();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-red-700 animate-pulse font-black uppercase tracking-tighter text-2xl italic">Loading Prestige Data...</div>;
    if (!item) return <div className="text-center py-20 font-bold text-gray-400 uppercase">Property Not Found</div>;

    return (
        <div className="bg-white min-h-screen pb-20 font-anuphan">
            {/* 1. Gallery Section (คงเดิมตามบรีฟที่ท่านโอเค) */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
                    <div className="md:col-span-3 rounded-2xl overflow-hidden relative group border border-gray-100">
                        <img src={mainImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main" />
                        <div className="absolute top-6 left-6 bg-red-700 text-white px-6 py-2 rounded-none font-black text-xs uppercase tracking-[0.2em] shadow-2xl italic">
                            {item.serviceType}
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                        {item.images?.map((img, index) => (
                            <img
                                key={index} src={img}
                                className={`h-32 w-full object-cover rounded-xl cursor-pointer hover:opacity-80 transition-all border-2 ${mainImage === img ? 'border-red-700 shadow-lg' : 'border-transparent'}`}
                                onClick={() => setMainImage(img)} alt={`sub-${index}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Content Section */}
            <div className="max-w-7xl mx-auto px-4 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
                        <div className="flex-1">
                            <span className="text-red-700 font-black uppercase tracking-[0.3em] text-xs border-b-2 border-red-700 pb-1">{item.category}</span>
                            <h1 className="text-5xl font-black text-gray-900 mt-6 leading-tight italic uppercase tracking-tighter">{item.title}</h1>
                            <p className="flex items-center text-gray-400 mt-4 text-lg font-medium">
                                <FaMapMarkerAlt className="mr-2 text-red-700" /> {item.address}
                            </p>
                        </div>

                        {/* Dynamic Price Display */}
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 min-w-[280px] shadow-sm">
                            {(item.serviceType === 'ซื้อ' || item.serviceType === 'เช่าและซื้อ') && (
                                <div className="mb-4">
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-1"><HiOutlineCurrencyDollar className="text-red-700" size={14} /> ราคาขาย</p>
                                    <p className="text-4xl font-black text-red-700 italic">฿{item.price?.toLocaleString()}</p>
                                </div>
                            )}
                            {(item.serviceType === 'เช่า' || item.serviceType === 'เช่าและซื้อ') && (
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-1"><MdOutlineTimer className="text-blue-600" size={14} /> ค่าเช่ารายเดือน</p>
                                    <p className="text-4xl font-black text-blue-600 italic">฿{item.rentPrice?.toLocaleString()} <span className="text-sm not-italic">/mo</span></p>
                                </div>
                            )}
                        </div>
                    </div>

                    <hr className="my-12 border-gray-100" />

                    {/* Features Grid */}
                    <div className="grid grid-cols-3 gap-8 mb-16">
                        <div className="text-center group">
                            <FaBed size={32} className="mx-auto text-red-700 mb-3 group-hover:scale-110 transition-transform" />
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">ห้องนอน</p>
                            <p className="text-2xl font-black text-gray-900">{item.bedrooms}</p>
                        </div>
                        <div className="text-center group">
                            <FaBath size={28} className="mx-auto text-red-700 mb-4 group-hover:scale-110 transition-transform" />
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">ห้องน้ำ</p>
                            <p className="text-2xl font-black text-gray-900">{item.bathrooms}</p>
                        </div>
                        <div className="text-center group">
                            <FaCar size={28} className="mx-auto text-red-700 mb-4 group-hover:scale-110 transition-transform" />
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">ที่จอดรถ</p>
                            <p className="text-2xl font-black text-gray-900">{item.parking}</p>
                        </div>
                    </div>

                    <h3 className="text-xl font-black mb-6 text-gray-900 uppercase tracking-widest border-l-4 border-red-700 pl-4 italic">Description</h3>
                    <p className="text-gray-500 leading-relaxed text-lg whitespace-pre-line font-medium">
                        {item.description || "สัมผัสความหรูหราที่แท้จริง..."}
                    </p>
                </div>

                {/* 3. Sidebar (คงเดิม) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-28 bg-white border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.08)] rounded-[40px] p-10">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">Contact Agent</h4>
                            {session && (
                                <div className='flex gap-2'>
                                    <button onClick={() => router.push(`/properties/edit/${id}`)} className="bg-gray-50 text-blue-600 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all"><FaEdit size={16} /></button>
                                    <button onClick={handleDelete} className="bg-gray-50 text-red-600 p-3 rounded-full hover:bg-red-600 hover:text-white transition-all"><FaTrashAlt size={16} /></button>
                                </div>
                            )}
                        </div>
                        <div className="space-y-4">
                            <button className="w-full bg-red-700 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-red-100">Call Now</button>
                            <button className="w-full bg-green-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-green-600 transition-all">Line Messenger</button>
                        </div>
                        <div className="mt-10 flex items-center p-5 bg-red-50/50 rounded-3xl border border-red-100/50">
                            <HiOutlineBadgeCheck size={24} className="text-red-700 mr-4 shrink-0" />
                            <p className="text-[10px] text-red-900 font-bold uppercase leading-tight tracking-wide">Verified Prestige Property</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}