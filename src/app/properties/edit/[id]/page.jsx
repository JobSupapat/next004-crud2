"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HiOutlineUpload, HiOutlineCurrencyDollar } from 'react-icons/hi';
import { FaBed, FaBath, FaCar } from 'react-icons/fa';

export default function EditPropertyPage() {
    const { id } = useParams();
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '', category: 'บ้าน', serviceType: 'ซื้อ',
        price: '', address: '', bedrooms: 0, bathrooms: 0, parking: 0
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true); // สำหรับตอนโหลดข้อมูลเก่า
    const [updating, setUpdating] = useState(false); // สำหรับตอนกดปุ่ม Save

    // 1. ดึงข้อมูลเดิมมาแสดงในฟอร์ม
    useEffect(() => {
        const fetchOriginalData = async () => {
            try {
                const res = await fetch(`/api/properties/${id}`);
                const data = await res.json();
                if (res.ok) {
                    setFormData(data);
                    setImages(data.images || []);
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOriginalData();
    }, [id]);

    // 2. ฟังก์ชันอัปโหลดรูป (เหมือนหน้า Add)
    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        setUpdating(true);
        const uploadedUrls = [];

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
        setImages((prev) => [...prev, ...uploadedUrls]); // เพิ่มรูปใหม่ต่อท้ายรูปเดิม
        setUpdating(false);
    };

    // 3. ฟังก์ชันบันทึกการแก้ไข (PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        const finalData = { ...formData, images };

        const res = await fetch(`/api/properties/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalData)
        });

        if (res.ok) {
            alert("แก้ไขข้อมูลสำเร็จ!");
            router.push(`/property/${id}`); // แก้เสร็จเด้งกลับไปหน้าดูรายละเอียด
        } else {
            alert("เกิดข้อผิดพลาดในการอัปเดต");
        }
        setUpdating(false);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-red-700 font-bold">กำลังดึงข้อมูลเดิม...</div>;

    return (
        <div className="max-w-4xl mx-auto my-12 p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
            <h1 className="text-3xl font-black text-red-700 mb-8 uppercase italic tracking-tighter border-l-8 border-red-700 pl-4">
                แก้ไขข้อมูลทรัพย์สิน <span className="text-gray-400 not-italic font-light text-xl">/ Edit Property</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ชื่อโครงการ/หัวข้อประกาศ</label>
                        <input
                            type="text" required value={formData.title}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-700 outline-none"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ประเภททรัพย์สิน</label>
                        <select
                            className="w-full p-3 border border-gray-200 rounded-lg outline-none"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="บ้าน">บ้าน</option>
                            <option value="คอนโด">คอนโด</option>
                            <option value="ทาวน์โฮม">ทาวน์โฮม</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ราคา (บาท)</label>
                        <div className="relative">
                            <HiOutlineCurrencyDollar className="absolute left-3 top-4 text-gray-400" />
                            <input
                                type="number" required value={formData.price}
                                className="w-full p-3 pl-10 border border-gray-200 rounded-lg outline-none"
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ประเภทบริการ</label>
                        <select
                            className="w-full p-3 border border-gray-200 rounded-lg outline-none"
                            value={formData.serviceType}
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        >
                            <option value="ซื้อ">ขาย (ซื้อขาด)</option>
                            <option value="เช่า">เช่า</option>
                            <option value="เช่าและซื้อ">ทั้งเช่าและขาย</option>
                        </select>
                    </div>
                </div>

                {/* ที่อยู่ */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">ที่อยู่โดยละเอียด</label>
                    <textarea
                        required value={formData.address} rows="3"
                        className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-red-700"
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    ></textarea>
                </div>

                {/* จำนวนห้อง */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <FaBed className="mx-auto text-red-700 mb-2" />
                        <label className="block text-xs font-bold text-gray-500 uppercase">ห้องนอน</label>
                        <input type="number" value={formData.bedrooms} className="w-full bg-transparent text-center font-bold text-lg outline-none"
                            onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 0 })} />
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <FaBath className="mx-auto text-red-700 mb-2" />
                        <label className="block text-xs font-bold text-gray-500 uppercase">ห้องน้ำ</label>
                        <input type="number" value={formData.bathrooms} className="w-full bg-transparent text-center font-bold text-lg outline-none"
                            onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || 0 })} />
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <FaCar className="mx-auto text-red-700 mb-2" />
                        <label className="block text-xs font-bold text-gray-500 uppercase">ที่จอดรถ</label>
                        <input type="number" value={formData.parking} className="w-full bg-transparent text-center font-bold text-lg outline-none"
                            onChange={(e) => setFormData({ ...formData, parking: parseInt(e.target.value) || 0 })} />
                    </div>
                </div>

                {/* Preview รูปภาพเดิมและเพิ่มรูปใหม่ */}
                <div className="space-y-4">
                    <label className="block text-sm font-bold text-gray-700">รูปภาพทรัพย์สิน (คลิกเพื่ออัปโหลดเพิ่ม)</label>
                    <div className="grid grid-cols-4 gap-2">
                        {images.map((img, idx) => (
                            <img key={idx} src={img} className="h-20 w-full object-cover rounded-lg border border-gray-200" alt="Preview" />
                        ))}
                        <label className="h-20 border-2 border-dashed border-red-200 rounded-lg flex items-center justify-center cursor-pointer bg-red-50 hover:bg-red-100 transition-all">
                            <HiOutlineUpload className="text-red-700" />
                            <input type="file" multiple className="hidden" onChange={handleFileUpload} />
                        </label>
                    </div>
                </div>

                <button
                    type="submit" disabled={updating}
                    className="w-full bg-red-700 hover:bg-red-800 text-white py-4 rounded-xl font-black text-xl transition-all shadow-xl shadow-red-200 active:scale-95 disabled:bg-gray-400"
                >
                    {updating ? "กำลังบันทึกข้อมูล..." : "บันทึกการแก้ไขข้อมูล"}
                </button>
            </form>
        </div>
    );
}