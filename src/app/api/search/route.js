import mongodbConnect from "@/lib/mongodb/mongoose";
import Property from "@/lib/models/Property";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await mongodbConnect();

        // ดึงค่า Search Params จาก URL
        const { searchParams } = new URL(req.url);
        const title = searchParams.get('title');
        const category = searchParams.get('category');
        const serviceType = searchParams.get('serviceType');

        // สร้าง Query Object สำหรับ MongoDB
        let query = {};

        // ค้นหาจากชื่อ (ใช้ Regex เพื่อให้หาคำที่ใกล้เคียงได้ และไม่สนตัวพิมพ์เล็ก-ใหญ่)
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }

        // กรองตามประเภททรัพย์สิน (บ้าน, คอนโด, ทาวน์โฮม)
        if (category && category !== 'ทั้งหมด') {
            query.category = category;
        }

        // กรองตามประเภทบริการ (ซื้อ, เช่า)
        if (serviceType && serviceType !== 'ทั้งหมด') {
            query.serviceType = serviceType;
        }

        const results = await Property.find(query).sort({ createdAt: -1 });

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}