import mongodbConnect from "@/lib/mongodb/mongoose";
import Property from "@/lib/models/Property";
import PropertyCard from "@/components/PropertyCard";

const ServicePage = async ({ params }) => {
    await mongodbConnect();
    const { type } = await params;

    // แปลงค่าจาก URL ให้ตรงกับ data ใน Database (เช่น rent -> Rent, buy -> Sale)
    const queryValue = type === 'buy' ? 'ซื้อ' : 'เช่า';

    // ดึงข้อมูลตามประเภท
    const properties = await Property.find({ serviceType: queryValue }).lean();

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 border-l-4 border-red-700 pl-4">
                        รายการอสังหาริมทรัพย์สำหรับ: <span className="text-red-700">{queryValue}</span>
                    </h1>
                    <span className="text-gray-500">พบ {properties.length} รายการ</span>
                </div>


                {properties.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-100">
                        <div className="text-6xl mb-4">🏠</div>
                        <p className="text-gray-500 text-lg font-medium">ไม่พบรายการ "ประกาศ{queryValue}" ในขณะนี้</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map((item) => (
                            <PropertyCard key={item._id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicePage;