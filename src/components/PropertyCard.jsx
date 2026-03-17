"use client";
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { HiOutlineLocationMarker, HiOutlineTrash } from 'react-icons/hi';
import { IoBedOutline } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { FaRegEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const PropertyCard = ({ item, onDelete }) => {
    const { data: session } = useSession(); // เรียกใช้ session
    const router = useRouter();

    // ฟังก์ชันสำหรับลบข้อมูล
    const handleDelete = async (e) => {
        // ป้องกัน Link ของ Card ทำงาน (ไม่ให้เด้งไปหน้า Detail)
        e.preventDefault();

        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบประกาศนี้?")) {
            try {
                const res = await fetch(`/api/properties/${item._id}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    alert("ลบข้อมูลเรียบร้อยแล้ว");

                    // --- เรียกใช้ onDelete เพื่อลบ UI ทันที ---
                    if (onDelete) {
                        onDelete(item._id);
                    } else {
                        // ถ้าไม่มี onDelete (เช่นในหน้า Detail) ให้ใช้ refresh หรือ push แทน
                        router.refresh();
                    }
                }
            } catch (error) {
                console.error("Delete Error:", error);
                alert("ไม่สามารถติดต่อ Server ได้");
            }
        }
    };

    // ฟังก์ชันสำหรับไปหน้าแก้ไข
    const handleEdit = (e) => {
        e.preventDefault(); // ป้องกันไม่ให้กดแล้วเด้งไปหน้า Detail
        router.push(`/properties/edit/${item._id}`);
    };

    // ป้องกัน Error กรณี item เป็น undefined
    if (!item) return null;

    return (
        <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative">

            {/* 3. หุ้มปุ่มจัดการด้วยเงื่อนไข session */}
            {session && (
                <div className="absolute top-3 right-3 z-20 flex gap-2">
                    <button
                        onClick={handleEdit}
                        className="bg-white/80 backdrop-blur-md p-2 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm border border-blue-100"
                        title="แก้ไขประกาศ"
                    >
                        <FaRegEdit size={18} />
                    </button>

                    <button
                        onClick={handleDelete}
                        className="bg-white/80 backdrop-blur-md p-2 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm border border-red-100"
                        title="ลบประกาศ"
                    >
                        <HiOutlineTrash size={18} />
                    </button>
                </div>
            )}


            <Link href={`/property/${item._id}`} className="flex flex-col h-full">
                {/* ส่วนรูปภาพ */}
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={item.images && item.images.length > 0 ? item.images[0] : '/images/no-image.jpg'}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Badge ประเภทบริการ (ซื้อ/เช่า) */}
                    <div className="absolute bottom-4 left-4 bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        {item.serviceType}
                    </div>
                </div>

                {/* ส่วนเนื้อหา */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-gray-400 text-xs mb-2">
                        <HiOutlineLocationMarker className="mr-1 text-red-600" />
                        <span className="truncate">{item.location}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors line-clamp-1">
                        {item.title}
                    </h3>

                    <div className="flex items-center gap-4 mb-4 text-gray-500 text-sm border-b border-gray-50 pb-4">
                        <div className="flex items-center gap-1">
                            <IoBedOutline className="text-red-600" size={18} />
                            <span>{item.bedrooms} ห้องนอน</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <LuBath className="text-red-600" size={17} />
                            <span>{item.bathrooms} ห้องน้ำ</span>
                        </div>
                    </div>

                    <div className="mt-auto flex justify-between items-center">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">ราคาเริ่มต้น</p>
                            <p className="text-xl font-black text-red-700">
                                ฿{item.price?.toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-red-50 p-2 rounded-lg group-hover:bg-red-700 transition-colors duration-300">
                            <svg className="w-5 h-5 text-red-700 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>

        </div >
    );
};

export default PropertyCard;