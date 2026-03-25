"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { motion } from 'framer-motion';

// Component หลักที่ดึงข้อมูล
function SearchResultsContent() {
    const searchParams = useSearchParams();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchResults = async () => {
        setLoading(true);
        try {
            // ดึงค่าจาก URL เพื่อส่งไปให้ API
            const category = searchParams.get('category') || 'ทั้งหมด';
            const serviceType = searchParams.get('serviceType') || 'ซื้อ';
            const priceRange = searchParams.get('priceRange') || 'ทั้งหมด';

            const query = new URLSearchParams({ category, serviceType, priceRange }).toString();
            const res = await fetch(`/api/search?${query}`);
            const data = await res.json();

            // เรียงลำดับ เก่า -> ใหม่ ตามที่ท่าน Director เคยสั่งไว้ครับ
            setProperties(data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
        } catch (error) {
            console.error("Search Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, [searchParams]); // Re-fetch เมื่อมีการเปลี่ยนค่าค้นหาจาก SearchBar

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-10 border-b border-gray-100 pb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 uppercase italic">
                        ผลการค้นหา <span className="text-red-700">({properties.length})</span>
                    </h2>
                    <p className="text-gray-400 text-sm font-bold mt-1 uppercase tracking-widest">Search Results for your prestige home</p>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(n => <div key={n} className="h-80 bg-gray-100 animate-pulse rounded-2xl" />)}
                </div>
            ) : properties.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-8"
                >
                    {properties.map(item => (
                        <PropertyCard key={item._id} item={item} />
                    ))}
                </motion.div>
            ) : (
                <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-xl font-black text-gray-400 uppercase tracking-tighter italic">ไม่พบทรัพย์สินที่ตรงกับเงื่อนไขการค้นหาของคุณ</p>
                    <p className="text-gray-400 text-sm mt-2 font-bold uppercase tracking-widest">Try adjusting your filters for more results</p>
                </div>
            )}
        </div>
    );
}

// Wrapper สำหรับหน้า Search
export default function SearchPage() {
    return (
        <main className="min-h-screen bg-white font-anuphan">
            {/* ดึง SearchBar มาติดตัวไปด้วยทุกที่ */}
            <div className="bg-gray-50 border-b border-gray-100">
                <SearchBar onSearch={(params) => {
                    const query = new URLSearchParams(params).toString();
                    window.location.href = `/search?${query}`;
                }} />
            </div>

            <Suspense fallback={<div className="text-center py-20 font-black text-red-700 animate-pulse uppercase italic">Preparing Results...</div>}>
                <SearchResultsContent />
            </Suspense>
        </main>
    );
}