import mongodbConnect from "@/lib/mongodb/mongoose";
import Property from "@/lib/models/Property";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await mongodbConnect();
        const { searchParams } = new URL(req.url);

        const category = searchParams.get('category');
        const serviceType = searchParams.get('serviceType'); // 'ซื้อ' หรือ 'เช่า'
        const priceRange = searchParams.get('priceRange');

        let query = {};

        // 1. กรองประเภททรัพย์สิน
        if (category && category !== 'ทั้งหมด') {
            query.category = category;
        }

        // 2. [FIX BUG] กรองประเภทบริการให้ครอบคลุม "เช่าและซื้อ"
        // ถ้า User เลือก 'ซื้อ' -> ค้นหาทั้ง { serviceType: 'ซื้อ' } และ { serviceType: 'เช่าและซื้อ' }
        // ถ้า User เลือก 'เช่า' -> ค้นหาทั้ง { serviceType: 'เช่า' } และ { serviceType: 'เช่าและซื้อ' }
        if (serviceType && serviceType !== 'ทั้งหมด') {
            query.serviceType = { $in: [serviceType, 'เช่าและซื้อ'] };
        }

        // 3. [FIX BUG] กรองช่วงราคาให้ถูกฟิลด์
        if (priceRange && priceRange !== 'ทั้งหมด') {
            const [min, max] = priceRange.split('-').map(Number);

            // เลือกฟิลด์ที่จะตรวจสอบราคาตามความต้องการหลักของ User
            const priceField = serviceType === 'เช่า' ? 'rentPrice' : 'price';

            query[priceField] = { $gte: min, $lte: max };
        }

        // ดึงข้อมูลและเรียงลำดับ (เก่า -> ใหม่) ตามบรีฟท่าน Director
        const results = await Property.find(query).sort({ createdAt: 1 });

        return NextResponse.json(results);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}