import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// --- แยกตัวแปรนี้ออกมาและใส่ export ---
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // จำลองการเช็ค User (เปลี่ยนเป็นเช็คจาก DB ได้ในภายหลัง)
                if (credentials.username === "admin" && credentials.password === "1234") {
                    return { id: "1", name: "Admin MyEstate", email: "admin@myestate.com" };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };