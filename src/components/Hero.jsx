"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const Hero = () => {
    const slides = [
        { id: 1, url: "https://res.cloudinary.com/dwzjghsr7/image/upload/v1774429135/myestate_residence/zfjk3jg6xnwm9kwhmc6i.jpg", title: "The City Life", sub: "ชีวิตหรูหรา ที่คุณเลือกได้กลางกรุง" },
        { id: 2, url: "https://res.cloudinary.com/dwzjghsr7/image/upload/v1774429215/myestate_residence/j9y8tkrlbcawjjijz7i6.jpg", title: "The Luxury", sub: "ความหรูหราที่ตอบโจทย์การใช้ชีวิต" },
        { id: 3, url: "https://res.cloudinary.com/dwzjghsr7/image/upload/v1774429372/myestate_residence/urftwvkdxjo29wvbhigr.jpg", title: "The Country Life", sub: "ความมีระดับใจกลางขุนเขา" },
        { id: 4, url: "https://res.cloudinary.com/dwzjghsr7/image/upload/v1774429274/myestate_residence/scg6cayon8ob3odwzg7g.jpg", title: "The Sand Beach", sub: "ชีวิตที่เหมือน พักร้อน ลมทะเลยามพักผ่อน" },
        { id: 5, url: "https://res.cloudinary.com/dwzjghsr7/image/upload/v1774429425/myestate_residence/acdnoxs2fo16ltcjragt.jpg", title: "The Country Villa", sub: "ความมีระดับใจกลางเมือง" },
    ];

    return (
        <section className="relative w-full bg-black overflow-hidden group">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade, Navigation]}
                effect="fade"
                speed={1200}
                loop={true}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={{
                    prevEl: '.swiper-button-prev-custom',
                    nextEl: '.swiper-button-next-custom',
                }}
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        {/* โครงสร้าง Layout ภาพ คงเดิมเป๊ะตามที่ PERFECT แล้ว */}
                        <div className="relative w-full h-auto aspect-video md:aspect-none md:h-[85vh] flex items-center justify-center overflow-hidden bg-black">
                            <div className="absolute inset-0 z-0 opacity-40 blur-3xl scale-110 hidden md:block">
                                <Image src={slide.url} alt="bg-blur" fill className="object-cover" />
                            </div>
                            <div className="relative w-full h-full z-10">
                                <Image src={slide.url} alt={slide.title} fill priority sizes="100vw" className="object-cover md:object-contain" />
                            </div>

                            {/* --- [ผ่าตัด UI ใหม่] Overlay Content --- */}
                            {/* 1. เปลี่ยน md:justify-center เป็น justify-end เพื่อย้ายข้อความลงล่างสุดใน Desktop */}
                            {/* 2. ปรับ bg-gradient ให้กระชับขึ้นเพื่อเคลียร์พื้นที่ตรงกลางภาพ */}
                            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end items-center pb-16 md:pb-24">
                                <div className="text-center text-white px-6 w-full max-w-5xl">
                                    {/* 3. [DOWNSCALE] ลดขนาดตัวอักษรอย่างมาก ใน Desktop จาก 9xl เหลือแค่ 5xl */}
                                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-1 md:mb-3 tracking-tighter italic uppercase drop-shadow-2xl">
                                        {slide.title}
                                    </h1>
                                    {/* ปรับขนาดซับไตเติ้ลให้เล็กลงตามกัน */}
                                    <p className="text-[10px] sm:text-lg md:text-xl font-light mb-0 tracking-[0.2em] opacity-80 max-w-2xl mx-auto border-t border-white/10 pt-1 md:pt-2">
                                        {slide.sub}
                                    </p>

                                    {/* 4. [REMOVE] ลบปุ่มสีแดง 'ชมโครงการ' ออกไปเลยครับ */}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Pure Navigation Arrows (คงเดิมตามบรีฟที่คลีนแล้ว) */}
            <motion.button
                whileHover={{ scale: 1.2, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="swiper-button-prev-custom absolute top-1/2 left-2 md:left-10 z-30 -translate-y-1/2 text-white transition-all cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            >
                <HiOutlineChevronLeft className="text-[32px] md:text-[72px]" />
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.2, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="swiper-button-next-custom absolute top-1/2 right-2 md:right-10 z-30 -translate-y-1/2 text-white transition-all cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            >
                <HiOutlineChevronRight className="text-[32px] md:text-[72px]" />
            </motion.button>

            <style jsx global>{`
                .swiper-pagination { bottom: 20px !important; }
                .swiper-pagination-bullet { background: white !important; opacity: 0.4; width: 8px; height: 8px; transition: all 0.3s; }
                .swiper-pagination-bullet-active { background: #B91C1C !important; width: 40px !important; border-radius: 4px !important; opacity: 1; }
                
                .swiper-button-prev, .swiper-button-next { display: none !important; }
                
                @media (max-width: 768px) {
                    .swiper-pagination { bottom: 5px !important; }
                }
            `}</style>
        </section>
    );
};

export default Hero;