"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // เรียกใช้ signIn ของ NextAuth
        const result = await signIn("credentials", {
            username,
            password,
            redirect: false, // เราจะจัดการการ Redirect เอง
        });

        if (result?.error) {
            setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง !!!");
        } else {
            // Login สำเร็จ! พาไปหน้าโฮม และ refresh เพื่อให้ Navbar เปลี่ยนสถานะ
            router.push("/");
            router.refresh();
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
                <h2 className="text-3xl font-black text-center italic uppercase mb-6">
                    My<span className="text-red-700">Estate</span>
                </h2>

                {error && <p className="text-red-600 text-center mb-4 font-bold text-sm">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-5 py-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-red-700 outline-none"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-5 py-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-red-700 outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="w-full bg-red-700 text-white font-bold py-4 rounded-xl hover:bg-red-800 transition-all shadow-lg shadow-red-200 uppercase tracking-widest">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}