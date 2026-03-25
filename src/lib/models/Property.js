import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: {
        type: String,
        enum: ['คอนโด', 'บ้าน', 'ทาวน์โฮม'],
        required: true
    },
    serviceType: {
        type: String,
        enum: ['เช่า', 'ซื้อ', 'เช่าและซื้อ'],
        required: true
    },
    price: { type: Number, default: 0 },      // ราคาขาย
    rentPrice: { type: Number, default: 0 },  // [ADD] ราคาเช่า
    address: { type: String, required: true },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    parking: { type: Number, default: 0 },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Property = mongoose.models.Property || mongoose.model("Property", PropertySchema);
export default Property;