import mongodbConnect from "@/lib/mongodb/mongoose";
import Property from "@/lib/models/Property";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // Import มาจากไฟล์ด้านบน

// --- สำหรับบันทึกข้อมูล (POST) ---
export async function POST(req) {
    // 1. ตรวจสอบ Session (ถ้าไม่ Login session จะเป็น null)
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized: กรุณาเข้าสู่ระบบเพื่อทำรายการนี้" },
            { status: 401 }
        );
    }

    try {
        await mongodbConnect();
        const data = await req.json();

        // บันทึกลง MongoDB
        const newProperty = await Property.create(data);

        return NextResponse.json(
            { message: "บันทึกข้อมูลสำเร็จ", id: newProperty._id },
            { status: 201 }
        );
    } catch (err) {
        console.error("API POST Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// --- สำหรับดึงข้อมูลแสดงหน้าโฮม (GET) ---
export async function GET() {
    try {
        await mongodbConnect();
        // ทุกคน (ทั้ง Login และไม่ Login) สามารถดูรายการทรัพย์สินได้
        const properties = await Property.find().sort({ createdAt: -1 });
        return NextResponse.json(properties, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}