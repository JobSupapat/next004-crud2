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
    const { data: session } = useSession();
    const router = useRouter();

    const handleDelete = async (e) => {
        e.preventDefault();
        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบประกาศนี้?")) {
            try {
                const res = await fetch(`/api/properties/${item._id}`, { method: 'DELETE' });
                if (res.ok && onDelete) onDelete(item._id);
            } catch (error) { console.error(error); }
        }
    };

    if (!item) return null;

    return (
        <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative">
            {session && (
                <div className="absolute top-3 right-3 z-20 flex gap-2">
                    <button onClick={(e) => { e.preventDefault(); router.push(`/properties/edit/${item._id}`); }} className="bg-white/80 backdrop-blur-md p-2 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100 shadow-sm"><FaRegEdit size={18} /></button>
                    <button onClick={handleDelete} className="bg-white/80 backdrop-blur-md p-2 rounded-full text-red-600 hover:bg-red-600 hover:text-white border border-red-100 shadow-sm"><HiOutlineTrash size={18} /></button>
                </div>
            )}
            <Link href={`/property/${item._id}`} className="flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                    <img src={item.images?.[0] || '/images/no-image.jpg'} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4 bg-red-700 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">{item.serviceType}</div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center text-gray-400 text-[11px] mb-2 font-medium">
                        <HiOutlineLocationMarker className="mr-1 text-red-600" /> <span className="truncate">{item.address}</span>
                    </div>
                    <h3 className="text-md font-bold text-gray-900 mb-3 group-hover:text-red-700 line-clamp-1">{item.title}</h3>

                    <div className="flex items-center gap-4 mb-4 text-gray-500 text-xs border-b border-gray-50 pb-4">
                        <div className="flex items-center gap-1.5"><IoBedOutline className="text-red-600" size={16} /><span>{item.bedrooms} นอน</span></div>
                        <div className="flex items-center gap-1.5"><LuBath className="text-red-600" size={15} /><span>{item.bathrooms} น้ำ</span></div>
                    </div>

                    <div className="mt-auto space-y-1">
                        {/* แสดงราคาขายถ้ามี */}
                        {(item.serviceType === 'ซื้อ' || item.serviceType === 'เช่าและซื้อ') && (
                            <div className="flex justify-between items-end">
                                <p className="text-[10px] text-gray-400 font-bold uppercase">ราคาขาย</p>
                                <p className="text-lg font-black text-red-700">฿{item.price?.toLocaleString()}</p>
                            </div>
                        )}
                        {/* แสดงราคาเช่าถ้ามี */}
                        {(item.serviceType === 'เช่า' || item.serviceType === 'เช่าและซื้อ') && (
                            <div className="flex justify-between items-end border-t border-gray-50 pt-1">
                                <p className="text-[10px] text-blue-500 font-bold uppercase">เช่า/เดือน</p>
                                <p className="text-lg font-black text-blue-600">฿{item.rentPrice?.toLocaleString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PropertyCard;