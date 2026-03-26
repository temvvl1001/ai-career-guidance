import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Хэрэглэгч нэвтэрсэн үед token мэдээлэл req.nextauth.token дотор ирнэ
    const token = req.nextauth.token;
    const isAuth = !!token;
    
    // Хэрэв нэвтрээгүй хэрэглэгч хамгаалалттай хуудас руу хандвал 
    // withAuth автоматаар /login руу шилжүүлнэ (доод талын pages хэсэгт зааснаар)
    
    return NextResponse.next();
  },
  {
    callbacks: {
      // authorized функц true буцаавал middleware ажиллана, false бол шууд login руу шиднэ
      authorized: ({ token }) => !!token,
    },
    pages: {
      // Нэвтрээгүй үед очих хуудас
      signIn: "/login",
    },
  }
);

// Middleware ажиллах замуудыг энд тодорхойлно
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/test/:path*",
    "/results/:path*",
    "/skills/:path*",
    "/profile/:path*",
    "/api/user/:path*", // Хэрэв API-аа бас хамгаалах бол нэмж болно
  ],
};