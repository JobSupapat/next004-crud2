import mongodbConnect from "@/lib/mongodb/mongoose";
import Property from "@/lib/models/Property";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await mongodbConnect();
        const data = await req.json();

        // [จุดตาย] ต้องระบุ rentPrice ลงไปในการสร้าง Document ด้วยครับ
        const newProperty = await Property.create({
            title: data.title,
            category: data.category,
            serviceType: data.serviceType,
            price: Number(data.price) || 0,
            rentPrice: Number(data.rentPrice) || 0, // <--- เพิ่มบรรทัดนี้!
            address: data.address,
            bedrooms: Number(data.bedrooms) || 0,
            bathrooms: Number(data.bathrooms) || 0,
            parking: Number(data.parking) || 0,
            images: data.images
        });

        return NextResponse.json({ message: "Success", id: newProperty._id }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await mongodbConnect();
        // [SORTING] เรียงจากเก่าไปใหม่ (ข้อมูลล่าสุดอยู่ล่างสุด)
        const properties = await Property.find().sort({ createdAt: 1 });
        return NextResponse.json(properties, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}