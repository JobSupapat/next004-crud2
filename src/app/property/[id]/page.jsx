"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaBed, FaBath, FaCar, FaMapMarkerAlt, FaShareAlt, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import { useSession } from "next-auth/react";

export default function PropertyDetail() {
    const { data: session } = useSession();
    const { id } = useParams();
    const router = useRouter()
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState("");

    // --- เพิ่มฟังก์ชันสำหรับจัดการการลบ ---
    const handleDelete = async () => {
        // แจ้งเตือนเพื่อยืนยันการลบ
        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบประกาศนี้? การลบไม่สามารถเรียกคืนได้ และรูปภาพทั้งหมดจะถูกลบออกจากระบบ Cloudinary")) {
            try {
                const res = await fetch(`/api/properties/${id}`, {
                    method: 'DELETE', // ใช้ Method DELETE
                });

                if (res.ok) {
                    alert("ลบประกาศเรียบร้อยแล้ว");
                    // ลบสำเร็จให้เด้งกลับหน้าแรกทันที
                    router.push('/');
                } else {
                    const data = await res.json();
                    alert(data.message || "เกิดข้อผิดพลาดในการลบ");
                }
            } catch (error) {
                console.error("Delete Error:", error);
                alert("ไม่สามารถติดต่อ Server ได้");
            }
        }
    };

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await fetch(`/api/properties/${id}`);
                const data = await res.json();

                // เช็คว่า res สำเร็จ และ data มีข้อมูลจริงๆ
                if (res.ok && data) {
                    setItem(data);
                    // เช็คว่ามี images และมีรูปใน array หรือไม่ก่อนตั้งค่า
                    if (data.images && data.images.length > 0) {
                        setMainImage(data.images[0]);
                    }
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-red-700 animate-pulse font-bold">กำลังโหลดข้อมูลสุดพรีเมียม...</div>;
    if (!item) return <div className="text-center py-20">ไม่พบข้อมูลทรัพย์สิน</div>;

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* 1. Gallery Section */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-125">
                    <div className="md:col-span-3 rounded-2xl overflow-hidden relative group">
                        <img src={mainImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main" />
                        <div className="absolute top-4 left-4 bg-red-700 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                            {item.serviceType}
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col gap-4 overflow-y-auto pr-2">
                        {/* ใส่ ?. เพื่อบอกว่าถ้า images ไม่มีค่า ไม่ต้องทำ map ต่อ */}
                        {item?.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                className={`h-32 w-full object-cover rounded-xl cursor-pointer hover:opacity-80 transition-all border-2 ${mainImage === img ? 'border-red-700' : 'border-transparent'}`}
                                onClick={() => setMainImage(img)}
                                alt={`sub-${index}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Content Section */}
            <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-red-700 font-bold uppercase tracking-widest text-sm">{item.category}</span>
                            <h1 className="text-4xl font-black text-gray-900 mt-2">{item.title}</h1>
                            <p className="flex items-center text-gray-500 mt-3 text-lg">
                                <FaMapMarkerAlt className="mr-2 text-red-700" /> {item.address}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400 font-bold">ราคาขาย</p>
                            <p className="text-4xl font-black text-red-700">{Number(item.price).toLocaleString()} <span className="text-xl">฿</span></p>
                        </div>
                    </div>

                    <hr className="my-8 border-gray-100" />

                    {/* สัญลักษณ์ห้องต่างๆ (Icons) */}
                    <div className="grid grid-cols-3 gap-6 mb-10">
                        <div className="bg-gray-50 p-6 rounded-2xl flex items-center justify-center space-x-4 border border-gray-100">
                            <FaBed size={28} className="text-red-700" />
                            <div><p className="text-xs text-gray-400 font-bold uppercase">ห้องนอน</p><p className="text-xl font-black">{item.bedrooms}</p></div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl flex items-center justify-center space-x-4 border border-gray-100">
                            <FaBath size={28} className="text-red-700" />
                            <div><p className="text-xs text-gray-400 font-bold uppercase">ห้องน้ำ</p><p className="text-xl font-black">{item.bathrooms}</p></div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl flex items-center justify-center space-x-4 border border-gray-100">
                            <FaCar size={28} className="text-red-700" />
                            <div><p className="text-xs text-gray-400 font-bold uppercase">ที่จอดรถ</p><p className="text-xl font-black">{item.parking}</p></div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-gray-900">รายละเอียดเพิ่มเติม</h3>
                    <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                        {item.description || "สัมผัสประสบการณ์การอยู่อาศัยที่เหนือระดับ ในทำเลที่ตอบโจทย์ทุกไลฟ์สไตล์ ดีไซน์ทันสมัยพร้อมสิ่งอำนวยความสะดวกครบครัน"}
                    </p>
                </div>

                {/* 3. Contact Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-28 bg-white border border-gray-100 shadow-2xl rounded-3xl p-8 border-t-8 hover:border-red-700">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-xl font-black text-gray-900 italic">สนใจสอบถามข้อมูล</h4>

                            {/* 3. หุ้มส่วนปุ่มจัดการด้วยเงื่อนไข session */}
                            {session && (
                                <div className='flex gap-2'>
                                    {/* ปุ่มแก้ไข (สีทอง/เทา เพื่อให้ดูพรีเมียมแต่ต่างจากปุ่มลบ) */}
                                    <button
                                        onClick={() => router.push(`/properties/edit/${id}`)}
                                        className="bg-white border-2 border-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
                                        title="แก้ไขประกาศ"
                                    >
                                        <FaEdit size={16} />
                                    </button>

                                    {/* --- ปุ่มลบ (สไตล์ Minimalist แดง-ขาว) --- */}
                                    <button
                                        onClick={handleDelete}
                                        className="bg-white border-2 border-red-100 text-red-600 p-3 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-sm"
                                        title="ลบประกาศนี้"
                                    >
                                        <FaTrashAlt size={16} />
                                    </button>
                                </div>
                            )}

                        </div>

                        <div className="space-y-4">
                            <button className="w-full bg-red-700 hover:bg-red-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-200 transition-all flex items-center justify-center active:scale-95">
                                โทรติดต่อเจ้าหน้าที่
                            </button>
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 transition-all flex items-center justify-center active:scale-95">
                                ติดต่อผ่าน Line
                            </button>
                            <button className="w-full border-2 border-gray-200 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                <FaShareAlt /> แชร์โครงการนี้
                            </button>
                        </div>
                        <div className="mt-8 flex items-center p-4 bg-red-50 rounded-xl border border-red-100">
                            <HiOutlineBadgeCheck size={30} className="text-red-700 mr-3" />
                            <p className="text-xs text-red-800 font-bold leading-tight">ทรัพย์สินนี้ผ่านการตรวจสอบและยืนยันตัวตนเรียบร้อยแล้ว</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

