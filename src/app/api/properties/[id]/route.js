import { v2 as cloudinary } from 'cloudinary';
import mongodbConnect from "@/lib/mongodb/mongoose";
import Property from "@/lib/models/Property";
import { NextResponse } from "next/server";

//ฟังก์ชั่นรับข้อมูล
export async function GET(req, { params }) {
    try {
        await mongodbConnect();
        const { id } = await params;
        const property = await Property.findById(id);

        if (!property) {
            return NextResponse.json({ error: "ไม่พบข้อมูลทรัพย์สิน" }, { status: 404 });
        }

        return NextResponse.json(property, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// 1. ตั้งค่า Cloudinary ด้วยข้อมูลจาก .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//ฟังก์ชั่นลบข้อมูล
export async function DELETE(req, { params }) {
    try {
        await mongodbConnect();
        const { id } = await params;

        const property = await Property.findById(id);
        if (!property) return NextResponse.json({ message: "ไม่พบข้อมูล" }, { status: 404 });

        // --- ส่วนสำคัญ: ลบรูปใน Cloudinary ---
        if (property.images && property.images.length > 0) {
            const deletePromises = property.images.map((imageUrl) => {
                // แยกส่วนประกอบของ URL
                const parts = imageUrl.split('/');

                // หาชื่อไฟล์พร้อมนามสกุล (เช่น abcde.jpg)
                const fileNameWithExtension = parts.pop();

                // หาชื่อ Folder (ตามที่คุณระบุในหน้า Add คือ 'myestate_residence')
                const folderName = parts.pop();

                // ตัดนามสกุลไฟล์ออก (.jpg, .png)
                const publicIdWithoutExtension = fileNameWithExtension.split('.')[0];

                // รวมเป็น Public ID ที่ถูกต้อง: "myestate_residence/abcde"
                const publicId = `${folderName}/${publicIdWithoutExtension}`;

                console.log("กำลังลบภาพ ID:", publicId); // เช็คที่ Terminal ว่า ID ถูกไหม
                return cloudinary.uploader.destroy(publicId);
            });

            await Promise.all(deletePromises);
        }

        // ลบข้อมูลใน MongoDB
        await Property.findByIdAndDelete(id);

        return NextResponse.json({ message: "ลบข้อมูลและรูปภาพสำเร็จ" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
    }
}

// เพิ่มฟังก์ชัน PUT ในไฟล์ src/app/api/properties/[id]/route.js

export async function PUT(req, { params }) {
    try {
        await mongodbConnect();
        const { id } = await params;
        const body = await req.json();

        // อัปเดตข้อมูลใน MongoDB โดยใช้ ID
        // { new: true } คือให้คืนค่าข้อมูลชุดใหม่ที่อัปเดตแล้วกลับมา
        const updatedProperty = await Property.findByIdAndUpdate(id, body, { new: true });

        if (!updatedProperty) {
            return NextResponse.json({ message: "ไม่พบข้อมูลที่ต้องการแก้ไข" }, { status: 404 });
        }

        return NextResponse.json({ message: "อัปเดตข้อมูลสำเร็จ", data: updatedProperty }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Update Error", error: error.message }, { status: 500 });
    }
}