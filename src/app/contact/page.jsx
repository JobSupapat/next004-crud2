"use client";
import React from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { FaLine, FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function ContactPage() {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-black text-gray-900 uppercase italic tracking-tighter">
                        Contact <span className="text-red-700">Us</span>
                    </h1>
                    <div className="h-1.5 w-24 bg-red-700 mx-auto mt-4"></div>
                    <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                        หากคุณมีคำถามหรือต้องการคำปรึกษาเกี่ยวกับอสังหาริมทรัพย์ ทีมงานมืออาชีพของเราพร้อมดูแลคุณในทุกขั้นตอน
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 1. Contact Info Cards */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-50 flex items-start gap-5">
                        <div className="bg-red-50 p-4 rounded-2xl text-red-700">
                            <HiOutlinePhone size={30} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">สายด่วนบริการ</h4>
                            <p className="text-gray-500 mt-1">081-XXX-XXXX</p>
                            <p className="text-gray-500">02-XXX-XXXX</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-50 flex items-start gap-5">
                        <div className="bg-red-50 p-4 rounded-2xl text-red-700">
                            <HiOutlineMail size={30} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">อีเมลสอบถาม</h4>
                            <p className="text-gray-500 mt-1">contact@myestate.com</p>
                            <p className="text-gray-500">support@myestate.com</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-50 flex items-start gap-5">
                        <div className="bg-red-50 p-4 rounded-2xl text-red-700">
                            <HiOutlineLocationMarker size={30} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">สำนักงานใหญ่</h4>
                            <p className="text-gray-500 mt-1 leading-relaxed">
                                123 ถนนสุขุมวิท แขวงคลองเตย <br />
                                เขตวัฒนา กรุงเทพมหานคร 10110
                            </p>
                        </div>
                    </div>

                    {/* Social Connect */}
                    <div className="p-8 bg-red-700 rounded-3xl text-white shadow-xl shadow-red-100">
                        <h4 className="font-bold text-xl mb-6 italic">Connect with us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all">
                                <FaLine size={24} />
                            </a>
                            <a href="#" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all">
                                <FaFacebookF size={24} />
                            </a>
                            <a href="#" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all">
                                <FaInstagram size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* 2. Contact Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-10 md:p-12 rounded-3xl shadow-2xl shadow-gray-200 border border-gray-50">
                        <h3 className="text-3xl font-black text-gray-900 mb-8 italic uppercase tracking-tighter">
                            Send us a <span className="text-red-700">Message</span>
                        </h3>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase ml-1">ชื่อ-นามสกุล</label>
                                <input type="text" placeholder="John Doe" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-700 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase ml-1">เบอร์โทรศัพท์</label>
                                <input type="text" placeholder="08X-XXX-XXXX" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-700 outline-none transition-all" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase ml-1">อีเมล</label>
                                <input type="email" placeholder="example@email.com" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-700 outline-none transition-all" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase ml-1">ข้อความของคุณ</label>
                                <textarea rows="5" placeholder="คุณสนใจโครงการไหน หรือต้องการสอบถามเรื่องใด..." className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-700 outline-none transition-all"></textarea>
                            </div>

                            <div className="md:col-span-2">
                                <button type="submit" className="w-full bg-red-700 hover:bg-red-800 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-red-100 active:scale-95 uppercase tracking-widest">
                                    ส่งข้อความตอนนี้
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}