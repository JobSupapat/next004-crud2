"use client";
import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero'; // ส่วน Carousel ที่เราทำไว้
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. ฟังก์ชันสำหรับโหลดข้อมูล (รองรับทั้งโหลดปกติและค้นหา) ---
  const fetchProperties = async (searchParams = null) => {
    setLoading(true);
    try {
      let url = '/api/properties';

      // ถ้ามีการส่ง searchParams มา ให้เปลี่ยนไปใช้ API Search
      if (searchParams) {
        const { title, category, serviceType } = searchParams;
        const query = new URLSearchParams({
          title: title || '',
          category: category || 'ทั้งหมด',
          serviceType: serviceType || 'ทั้งหมด'
        }).toString();
        url = `/api/search?${query}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- เพิ่มฟังก์ชันจัดการ UI หลังลบ ---
  const handleDeleteFromList = (deletedId) => {
    // กรองเอาเฉพาะตัวที่ ID ไม่ตรงกับตัวที่ลบออกไป
    setProperties(properties.filter(item => item._id !== deletedId));
  };



  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('/api/properties');
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* 3. Hero Section (Carousel) */}
      <Hero />

      {/* 2. Search Section - แยกออกมาอิสระ ไม่เกยกัน */}
      <div className="bg-white border-b border-gray-100">
        <SearchBar onSearch={fetchProperties} />
      </div>

      {/* 4. รายการโครงการที่จะขาย/เช่า */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter">
              All <span className="text-red-700">Properties</span>
            </h2>
            <div className="h-1.5 w-20 bg-red-700 mt-2"></div>
          </div>
          <button className="text-red-700 font-bold hover:underline transition-all">
            ดูทั้งหมด
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 bg-gray-200 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.length > 0 ? (
              properties.map((item) => (
                <PropertyCard key={item._id} item={item} onDelete={handleDeleteFromList} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-20">
                ยังไม่มีข้อมูลทรัพย์สินในขณะนี้
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

