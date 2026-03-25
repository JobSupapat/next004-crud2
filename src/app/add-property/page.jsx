"use client";
import React, { useState } from 'react';
import { HiOutlineUpload, HiOutlineCurrencyDollar, HiOutlineCash } from 'react-icons/hi';
import { FaBed, FaBath, FaCar } from 'react-icons/fa';

export default function AddPropertyPage() {
    const [formData, setFormData] = useState({
        title: '', category: 'บ้าน', serviceType: 'ซื้อ',
        price: 0, rentPrice: 0, address: '',
        bedrooms: 0, bathrooms: 0, parking: 0
    });
    // สร้าง State สำหรับเก็บค่าตัวอักษรที่มีคอมม่าแยกต่างหาก
    const [displayPrice, setDisplayPrice] = useState("");
    const [displayRentPrice, setDisplayRentPrice] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    // --- ฟังก์ชันจัดการคอมม่า ---
    const formatNumber = (num) => {
        if (!num) return "";
        const value = num.replace(/,/g, ""); // ลบคอมม่าเก่าออกก่อน
        if (isNaN(value)) return "";
        return Number(value).toLocaleString(); // ใส่คอมม่าใหม่
    };

    const handleNumberChange = (name, value, setter) => {
        const cleanValue = value.replace(/,/g, ""); // ลบคอมม่าเพื่อเก็บเป็นตัวเลขลง Database
        if (cleanValue === "" || !isNaN(cleanValue)) {
            setFormData({ ...formData, [name]: Number(cleanValue) });
            setter(formatNumber(cleanValue)); // แสดงผลแบบมีคอมม่า
        }
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        setLoading(true);
        const uploadedUrls = [];
        try {
            for (const file of files) {
                const signRes = await fetch('/api/cloudinary-sign', { method: 'POST' });
                const { signature, timestamp, apiKey, cloudName } = await signRes.json();
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
            alert("อัปโหลดรูปภาพสำเร็จ!");
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setLoading(false);
        }
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
        <div className="max-w-4xl mx-auto my-12 p-8 bg-white shadow-2xl rounded-2xl border border-gray-100 font-anuphan">
            <h1 className="text-3xl font-black text-red-700 mb-8 uppercase italic tracking-tighter border-l-8 border-red-700 pl-4">
                เพิ่มทรัพย์สินใหม่ <span className="text-gray-400 not-italic font-light text-xl">/ Add Property</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">ประเภทบริการ</label>
                        <select
                            className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-red-700 bg-white"
                            value={formData.serviceType}
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        >
                            <option value="ซื้อ">ขาย (ซื้อขาด)</option>
                            <option value="เช่า">เช่า</option>
                            <option value="เช่าและซื้อ">ทั้งเช่าและขาย</option>
                        </select>
                    </div>

                    {/* ช่องกรอกราคาขาย */}
                    {(formData.serviceType === 'ซื้อ' || formData.serviceType === 'เช่าและซื้อ') && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-sm font-bold text-red-700 mb-2">ราคาขาย (บาท)</label>
                            <div className="relative">
                                <HiOutlineCurrencyDollar className="absolute left-3 top-4 text-red-700" />
                                <input
                                    type="text" required placeholder="0"
                                    value={displayPrice}
                                    className="w-full p-3 pl-10 border border-red-100 rounded-lg outline-none focus:ring-2 focus:ring-red-700 bg-white"
                                    onChange={(e) => handleNumberChange('price', e.target.value, setDisplayPrice)}
                                />
                            </div>
                        </div>
                    )}

                    {/* ช่องกรอกราคาเช่า (เปลี่ยนไอคอนเป็น HiOutlineCash) */}
                    {(formData.serviceType === 'เช่า' || formData.serviceType === 'เช่าและซื้อ') && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-sm font-bold text-blue-700 mb-2">ราคาเช่า (บาท/เดือน)</label>
                            <div className="relative">
                                <HiOutlineCash className="absolute left-3 top-4 text-blue-700" />
                                <input
                                    type="text" required placeholder="0"
                                    value={displayRentPrice}
                                    className="w-full p-3 pl-10 border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-700 bg-white"
                                    onChange={(e) => handleNumberChange('rentPrice', e.target.value, setDisplayRentPrice)}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">ที่อยู่โดยละเอียด</label>
                    <textarea
                        required rows="3" placeholder="ระบุที่อยู่..."
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-700 outline-none transition-all"
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    ></textarea>
                </div>

                <div className="grid grid-cols-3 gap-4 text-gray-700">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <FaBed className="mx-auto text-red-700 mb-2" />
                        <label className="block text-xs font-bold text-gray-500 uppercase">ห้องนอน</label>
                        <input type="number" className="w-full bg-transparent text-center font-bold text-lg outline-none"
                            onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })} />
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <FaBath className="mx-auto text-red-700 mb-2" />
                        <label className="block text-xs font-bold text-gray-500 uppercase">ห้องน้ำ</label>
                        <input type="number" className="w-full bg-transparent text-center font-bold text-lg outline-none"
                            onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })} />
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <FaCar className="mx-auto text-red-700 mb-2" />
                        <label className="block text-xs font-bold text-gray-500 uppercase">ที่จอดรถ</label>
                        <input type="number" className="w-full bg-transparent text-center font-bold text-lg outline-none"
                            onChange={(e) => setFormData({ ...formData, parking: Number(e.target.value) })} />
                    </div>
                </div>

                <div className="border-2 border-dashed border-red-200 rounded-2xl p-8 text-center bg-red-50/30">
                    <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                        <HiOutlineUpload size={48} className="text-red-700 mb-2" />
                        <span className="text-gray-700 font-bold">คลิกเพื่ออัปโหลดรูปภาพ</span>
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