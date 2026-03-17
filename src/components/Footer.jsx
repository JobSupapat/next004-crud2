import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
                <div>
                    <span className="text-2xl font-black italic text-red-600 uppercase">MyEstate</span>
                    <p className="mt-4 text-gray-400 leading-relaxed text-sm">
                        ผู้นำด้านการจัดหาที่อยู่อาศัยระดับพรีเมียม ครบวงจรทั้งบ้าน คอนโด และทาวน์โฮม
                        พร้อมบริการที่เป็นมืออาชีพและเชื่อถือได้
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-6">เมนูแนะนำ</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><Link href="/properties/condos" className="hover:text-red-500">คอนโดมิเนียมยอดนิยม</Link></li>
                        <li><Link href="/properties/houses" className="hover:text-red-500">บ้านเดี่ยวพร้อมอยู่</Link></li>
                        <li><Link href="/add-property" className="hover:text-red-500">ลงประกาศขายทรัพย์สิน</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-6">ติดต่อเรา</h4>
                    <p className="text-gray-400 text-sm mb-2">เทศบาลนครนครสวรรค์, ประเทศไทย</p>
                    <p className="text-gray-400 text-sm mb-2 font-bold">โทร: 056-XXX-XXX</p>
                    <p className="text-gray-400 text-sm italic">Email: contact@myestate.com</p>
                </div>
            </div>
            <div className="text-center mt-8 text-gray-500 text-xs tracking-widest uppercase">
                © 2026 MyEstate Professional Real Estate System. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;