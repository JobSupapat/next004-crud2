"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import { FaChevronDown, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { HiOutlineOfficeBuilding, HiOutlineHome, HiOutlineViewGrid, HiOutlinePlusCircle, HiOutlineLogout, HiOutlineChevronRight } from 'react-icons/hi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMobileSub, setActiveMobileSub] = useState(null);
    const pathname = usePathname();
    const { data: session } = useSession();

    // --- [เพิ่ม LOGIC] ฟังก์ชันสำหรับเลื่อนขึ้นบนสุด ---
    const handleHomeClick = (e) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setIsOpen(false); // ปิด Menu Mobile ถ้ากดจากมือถือ
        }
    };

    const toggleSubMenu = (menuName) => {
        setActiveMobileSub(activeMobileSub === menuName ? null : menuName);
    };

    const NavItem = ({ href, label, children, onClick }) => {
        const active = pathname === href;
        return (
            <Link
                href={href}
                onClick={onClick}
                className={`relative py-2 font-semibold transition-colors duration-300 group ${active ? 'text-red-700' : 'text-gray-700 hover:text-red-700'}`}
            >
                <span className="flex items-center gap-1">{label}{children}</span>
                <span className={`absolute bottom-0 left-0 h-[2px] bg-red-700 transition-all duration-500 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
        );
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm font-anuphan">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    <div className="flex-1 flex justify-start">
                        {/* [UPDATE] ผูก handleHomeClick เข้ากับ Logo */}
                        <Link href="/" className="group" onClick={handleHomeClick}>
                            <span className="text-2xl font-black tracking-tighter text-red-700 uppercase italic">
                                My<span className="text-gray-900 not-italic">Estate</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex flex-[2] justify-center items-center space-x-8">
                        {/* [UPDATE] ผูก handleHomeClick เข้ากับเมนูหน้าแรก */}
                        <NavItem href="/" label="หน้าแรก" onClick={handleHomeClick} />

                        <div className="relative group py-2 font-semibold text-gray-700 cursor-pointer">
                            <div className="flex items-center space-x-1 group-hover:text-red-700 transition-colors">
                                <span>โครงการ</span>
                                <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform" />
                            </div>
                            <div className="absolute top-full -left-4 w-52 bg-white border border-gray-100 shadow-2xl rounded-b-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <Link href="/properties/condos" className="flex items-center px-5 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all"><HiOutlineOfficeBuilding className="mr-3 text-red-600" size={18} /> คอนโด</Link>
                                <Link href="/properties/houses" className="flex items-center px-5 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all"><HiOutlineHome className="mr-3 text-red-600" size={18} /> บ้าน</Link>
                                <Link href="/properties/townhomes" className="flex items-center px-5 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all"><HiOutlineViewGrid className="mr-3 text-red-600" size={18} /> ทาวน์โฮม</Link>
                            </div>
                        </div>

                        <div className="relative group py-2 font-semibold text-gray-700 cursor-pointer">
                            <div className="flex items-center space-x-1 group-hover:text-red-700 transition-colors">
                                <span>บริการ</span>
                                <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform" />
                            </div>
                            <div className="absolute top-full -left-4 w-40 bg-white border border-gray-100 shadow-2xl rounded-b-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <Link href="/services/rent" className="block px-5 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700">เช่า</Link>
                                <Link href="/services/buy" className="block px-5 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700">ซื้อ</Link>
                            </div>
                        </div>

                        {session && (
                            <NavItem href="/add-property" label="เพิ่มทรัพย์สิน">
                                <HiOutlinePlusCircle size={18} className="text-red-600" />
                            </NavItem>
                        )}

                        <NavItem href="/contact" label="ติดต่อเรา" />
                    </div>

                    <div className="hidden md:flex flex-1 justify-end items-center space-x-4">
                        {!session ? (
                            <Link href="/login" className="bg-red-700 text-white px-8 py-2.5 rounded-full font-bold hover:bg-red-800 transition-all shadow-lg shadow-red-100">Login</Link>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-gray-800 border-r pr-4 border-gray-200">
                                    <FaUserCircle size={22} className="text-red-700" />
                                    <span className="text-sm font-bold">{session.user.name}</span>
                                </div>
                                <button onClick={() => signOut()} className="text-gray-500 hover:text-red-700 font-bold text-sm transition-colors"><HiOutlineLogout size={20} /></button>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-red-700">
                            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white ${isOpen ? 'max-h-[1000px] opacity-100 border-t' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 py-6 space-y-4">
                    {/* [UPDATE] ผูก handleHomeClick ในมือถือด้วย */}
                    <Link href="/" onClick={handleHomeClick} className="block text-lg font-bold text-gray-800 border-b pb-2 border-gray-50">หน้าแรก</Link>

                    {/* ... (ส่วนที่เหลือคงเดิมตาม Mockup ของท่าน) ... */}
                    <div className="space-y-2">
                        <button onClick={() => toggleSubMenu('project')} className="flex justify-between items-center w-full text-lg font-bold text-gray-800">
                            โครงการ <HiOutlineChevronRight className={`transition-transform duration-300 ${activeMobileSub === 'project' ? 'rotate-90' : ''}`} />
                        </button>
                        <div className={`pl-4 space-y-3 overflow-hidden transition-all duration-300 ${activeMobileSub === 'project' ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                            <Link href="/properties/condos" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium italic">/ คอนโด</Link>
                            <Link href="/properties/houses" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium italic">/ บ้าน</Link>
                            <Link href="/properties/townhomes" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium italic">/ ทาวน์โฮม</Link>
                        </div>
                    </div>
                    {/* ... (Menu อื่นๆ เหมือนเดิมเป๊ะ) ... */}
                    <div className="space-y-2">
                        <button onClick={() => toggleSubMenu('service')} className="flex justify-between items-center w-full text-lg font-bold text-gray-800">
                            บริการ <HiOutlineChevronRight className={`transition-transform duration-300 ${activeMobileSub === 'service' ? 'rotate-90' : ''}`} />
                        </button>
                        <div className={`pl-4 space-y-3 overflow-hidden transition-all duration-300 ${activeMobileSub === 'service' ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                            <Link href="/services/rent" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium italic">/ เช่า</Link>
                            <Link href="/services/buy" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium italic">/ ซื้อ</Link>
                        </div>
                    </div>
                    {session && <Link href="/add-property" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-red-700">เพิ่มทรัพย์สิน</Link>}
                    <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-gray-800">ติดต่อเรา</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;