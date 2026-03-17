"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';

export default function CategoryPage() {
    const { category } = useParams(); // ดึงค่าจาก URL เช่น 'condos', 'houses'
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Map ค่าจาก URL เป็นภาษาไทยให้ตรงกับ Database
    const categoryMap = {
        'condos': 'คอนโด',
        'houses': 'บ้าน',
        'townhomes': 'ทาวน์โฮม'
    };

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const res = await fetch('/api/properties');
                const data = await res.json();
                // กรองข้อมูลเฉพาะประเภทที่เลือก
                const filtered = data.filter(item => item.category === categoryMap[category]);
                setItems(filtered);
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryData();
    }, [category]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-black text-gray-900 mb-8 border-l-8 border-red-700 pl-4 uppercase">
                รายการ: <span className="text-red-700">{categoryMap[category]}</span>
            </h1>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {items.length > 0 ? (
                        items.map(item => <PropertyCard key={item._id} item={item} />)
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-400">
                            ขออภัย ไม่พบข้อมูลในหมวดหมู่นี้
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}