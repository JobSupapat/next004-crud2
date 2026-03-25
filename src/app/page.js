"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async (searchParams = null) => {
    setLoading(true);
    try {
      let url = '/api/properties';
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

      // --- [LOGIC UPGRADE] เรียงลำดับ: เก่าสุดขึ้นก่อน (Ascending) ---
      // ข้อมูลใหม่สุดจะถูกย้ายไปอยู่ล่างสุดของรายการ
      const sortedData = data.sort((a, b) =>
        new Date(a.createdAt) - new Date(b.createdAt)
      );

      setProperties(sortedData);
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50/50 font-anuphan">
      <Hero />

      <div className="bg-white border-b border-gray-100">
        <SearchBar onSearch={fetchProperties} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-between items-end mb-10"
        >
          <div>
            <h2 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter">
              All <span className="text-red-700">Properties</span>
            </h2>
            <div className="h-1.5 w-20 bg-red-700 mt-2"></div>
          </div>
          <button className="text-red-700 font-bold hover:underline transition-all uppercase text-sm tracking-widest">
            View All
          </button>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 bg-gray-200 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {properties.length > 0 ? (
              properties.map((item) => (
                <motion.div key={item._id} variants={itemVariants}>
                  <PropertyCard item={item} onDelete={(id) => setProperties(properties.filter(p => p._id !== id))} />
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 py-20 font-bold uppercase tracking-widest">
                No Properties Found
              </p>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}