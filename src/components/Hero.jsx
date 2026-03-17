"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Hero = () => {
    const slides = [
        { id: 1, url: "https://res.cloudinary.com/dwzjghsr7/image/upload/v1773674395/myestate_residence/hhksz3omll54gsxxogwv.jpg", title: "ไพรพณา", sub: "ความหรูหราที่ใกล้ชิดธรรมชาติ" },
        { id: 2, url: "https://res.cloudinary.com/dwzjghsr7/image/upload/v1773712567/myestate_residence/f6s5v6b1jopwxibjuzha.jpg", title: "พฤกษาวิลล์", sub: "ความหรูหราที่ตอบโจทย์การใช้ชีวิต" },
        { id: 3, url: "https://res.cloudinary.com/dwzjghsr7/image/upload/v1773714129/myestate_residence/ygmtywiho2t4gclgforj.jpg", title: "ภูพานวิลล์", sub: "ความมีระดับใจกลางขุนเขา" },
        { id: 4, url: "https://res.cloudinary.com/dwzjghsr7/image/upload/v1773714214/myestate_residence/bjqytjyjyhejwgo6w5go.jpg", title: "ธาราคีรีรมณ์", sub: "เริ่มต้นชีวิตใหม่ใจกลางเมือง" },
        { id: 5, url: "https://res.cloudinary.com/dwzjghsr7/image/upload/v1773733027/myestate_residence/pvfupj28zvj6xgxvx4lv.jpg", title: "The Modern Knight", sub: "ความมีระดับใจกลางเมือง" },
    ];

    return (
        <section className="relative w-full bg-gray-900">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                speed={1200}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        {/* แก้ไขปัญหาภาพเบี้ยว/ลึกเกิน: 
                            Mobile: aspect-[3/2] (กว้าง 100% สูงตามสัดส่วนภาพจริง)
                            Desktop: h-[85vh] (สูงเต็มตาระดับ Luxury)
                        */}
                        <div className="relative w-full aspect-[3/2] md:aspect-auto md:h-[85vh] overflow-hidden">
                            <Image
                                src={slide.url}
                                alt={slide.title}
                                fill
                                priority
                                sizes="100vw"
                                className="object-cover object-center"
                            />

                            {/* Overlay แก้ไขให้กระชับ:
                                - ใช้ bg-gradient-to-t จากดำ 80% ด้านล่าง ขึ้นไปจางหาย
                                - ใช้ justify-end ใน Mobile เพื่อให้ข้อความเกาะขอบล่างภาพ ไม่ดู "ลึก" เกินไป
                                - ใช้ md:justify-center ใน Desktop เพื่อความสวยงาม
                            */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end md:justify-center items-center pb-12 md:pb-0">
                                <div className="text-center text-white px-6 w-full max-w-4xl">
                                    <h1 className="text-3xl sm:text-5xl md:text-8xl font-black mb-2 md:mb-4 tracking-tighter italic uppercase drop-shadow-2xl">
                                        {slide.title}
                                    </h1>
                                    <p className="text-sm sm:text-lg md:text-2xl font-light mb-6 md:mb-10 tracking-widest opacity-90 max-w-2xl mx-auto border-y border-white/10 py-1">
                                        {slide.sub}
                                    </p>
                                    <button className="bg-red-700 hover:bg-white hover:text-red-700 text-white px-8 py-3 md:px-14 md:py-4 rounded-none font-bold transition-all border-2 border-red-700 uppercase tracking-widest text-[10px] md:text-base active:scale-95 shadow-2xl">
                                        ชมโครงการ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Pagination Style */}
            <style jsx global>{`
                .swiper-pagination {
                    bottom: 20px !important;
                }
                .swiper-pagination-bullet {
                    background: white !important;
                    opacity: 0.5;
                    margin: 0 5px !important;
                }
                .swiper-pagination-bullet-active {
                    background: #B91C1C !important;
                    width: 35px !important;
                    border-radius: 2px !important;
                    opacity: 1;
                }
            `}</style>
        </section>
    );
};

export default Hero;