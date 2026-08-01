import { NextResponse } from "next/server";
import { auth } from "./auth";

export const proxy = auth((req: any) => {
    const { pathname } = req.nextUrl;

    // Logged-in users should not access login/register
    if (
        req.auth &&
        (pathname === "/login" || pathname === "/register")
    ) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Auth.js routes
    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    // Public routes
    if (
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/register" ||
        pathname.startsWith("/api/videos")
    ) {
        return NextResponse.next();
    }

    // Protect all other routes
    if (!req.auth) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    ],
};