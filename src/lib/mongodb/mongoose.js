import mongoose from "mongoose";
import dns from 'node:dns/promises'

dns.setServers(['1.1.1.1', '8.8.8.8'])

export default async function mongodbConnect() {
    // 1. ตรวจสอบก่อนว่ามี URI ไหม
    if (!process.env.MONGO_URI) {
        throw new Error("กรุณาระบุ MONGO_URI ในไฟล์ .env.local");
    }

    // 2. ถ้าเชื่อมต่อค้างไว้อยู่แล้ว ก็ไม่ต้องต่อใหม่ (เพื่อ Performance)
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Project: Next-004 MongoDB Connect Complete !!!');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
}