"use client";
import React, { useState } from 'react';
import { HiOutlineUpload, HiOutlineHome, HiOutlineCurrencyDollar } from 'react-icons/hi';
import { FaBed, FaBath, FaCar } from 'react-icons/fa';

export default function AddPropertyPage() {
    const [formData, setFormData] = useState({
        title: '', category: 'บ้าน', serviceType: 'ซื้อ',
        price: '', address: '', bedrooms: 0, bathrooms: 0, parking: 0
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    // ฟังก์ชันอัปโหลดรูปภาพไป Cloudinary
    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        setLoading(true);

        const uploadedUrls = [];
        for (const file of files) {
            // 1. ขอ Signature จาก API ของเรา
            const signRes = await fetch('/api/cloudinary-sign', { method: 'POST' });
            const { signature, timestamp, apiKey, cloudName } = await signRes.json();

            // 2. ส่งรูปไป Cloudinary โดยตรง
            const cloudFormData = new FormData();
            cloudFormData.append("file", file);
            cloudFormData.append("api_key", apiKey);
            cloudFormData.append("timestamp", timestamp);
            cloudFormData.append("signature", signature);
            cloudFormData.append("folder", "myestate_residence");

            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: cloudFormData
            });
            const uploadData = await uploadRes.json();
            uploadedUrls.push(uploadData.secure_url);
        }
        setImages(uploadedUrls);
        setLoading(false);
        alert("อัปโหลดรูปภาพสำเร็จ!");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalData = { ...formData, images };

        const res = await fetch('/api/properties', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalData)
        });

        if (res.ok) {
            alert("ประกาศขาย/เช่าทรัพย์สินสำเร็จ!");
            window.location.href = "/";
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-12 p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
            <h1 className="text-3xl font-black text-red-700 mb-8 uppercase italic tracking-tighter border-l-8 border-red-700 pl-4">
                เพิ่มทรัพย์สินใหม่ <span className="text-gray-400 not-italic font-light text-xl">/ Add Property</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* ส่วนชื่อและประเภท */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ชื่อโครงการ/หัวข้อประกาศ</label>
                        <input
                            type="text" required placeholder="เช่น บ้านเดี่ยวหรู ราชาภิเษก"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-700 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ประเภททรัพย์สิน</label>
                        <select
                            className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-red-700"
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="บ้าน">บ้าน</option>
                            <option value="คอนโด">คอนโด</option>
                            <option value="ทาวน์โฮม">ทาวน์โฮม</option>
                        </select>
                    </div>
                </div>

                {/* ส่วนราคาและประเภทบริการ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ราคา (บาท)</label>
                        <div className="relative">
                            <HiOutlineCurrencyDollar className="absolute left-3 top-4 text-gray-400" />
                            <input
                                type="number" required placeholder="0.00"
                                className="w-full p-3 pl-10 border border-gray-200 rounded-lg outline-none focus:border-red-700"
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ประเภทบริการ</label>
                        <select
                            className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-red-700"
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        >
                            <option value="ซื้อ">ขาย (ซื้อขาด)</option>
                            <option value="เช่า">เช่า</option>
                            <option value="เช่าและซื้อ">ทั้งเช่าและขาย</option>
                        </select>
                    </div>
                </div>

                {/* เพิ่มส่วนนี้เข้าไปครับ: ส่วนที่อยู่โดยละเอียด */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">ที่อยู่โดยละเอียด</label>
                    <textarea
                        required
                        placeholder="ระบุบ้านเลขที่, ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด..."
                        rows="3"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-700 outline-none transition-all"
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    ></textarea>
                </div>

                {/* ส่วนรายละเอียดจำนวนห้อง */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <FaBed className="mx-auto text-red-700 mb-2" />
                        <label className="block text-xs font-bold text-gray-500 uppercase">ห้องนอน</label>
                        <input type="number" className="w-full bg-transparent text-center font-bold text-lg outline-none"
                            onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })} />
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <FaBath className="mx-auto text-red-700 mb-2" />
                        <label className="block text-xs font-bold text-gray-500 uppercase">ห้องน้ำ</label>
                        <input type="number" className="w-full bg-transparent text-center font-bold text-lg outline-none"
                            onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })} />
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <FaCar className="mx-auto text-red-700 mb-2" />
                        <label className="block text-xs font-bold text-gray-500 uppercase">ที่จอดรถ</label>
                        <input type="number" className="w-full bg-transparent text-center font-bold text-lg outline-none"
                            onChange={(e) => setFormData({ ...formData, parking: e.target.value })} />
                    </div>
                </div>

                {/* ส่วนอัปโหลดรูปภาพ */}
                <div className="border-2 border-dashed border-red-200 rounded-2xl p-8 text-center bg-red-50/30">
                    <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                        <HiOutlineUpload size={48} className="text-red-700 mb-2" />
                        <span className="text-gray-700 font-bold">คลิกเพื่ออัปโหลดรูปภาพทรัพย์สิน</span>
                        <span className="text-gray-400 text-xs mt-1">แนะนำขนาด 4:3 (รองรับหลายไฟล์)</span>
                    </label>
                    {loading && <p className="mt-4 text-red-700 animate-pulse font-bold text-sm">กำลังจัดการรูปภาพ...</p>}
                    {images.length > 0 && <p className="mt-4 text-green-600 font-bold text-sm">อัปโหลดเรียบร้อย {images.length} รูป</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-700 hover:bg-red-800 text-white py-4 rounded-xl font-black text-xl transition-all shadow-xl shadow-red-200 active:scale-95"
                >
                    ยืนยันการลงประกาศ
                </button>
            </form>
        </div>
    );
}