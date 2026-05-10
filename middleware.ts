import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "./lib/supabase-server";

export async function  middleware (request : NextRequest) {
    const supabase = await createSupabaseServer();

    const {data : {user}} = await supabase.auth.getUser();
    
    const path = request.nextUrl.pathname;

    const isProtectedRoute = path.startsWith("/Admin")
    const isAuthRoute = 
        path.startsWith("/login") ||
        path.startsWith("/signup")

    if(isProtectedRoute && !user) {
        return NextResponse.redirect(new URL("/login" , request.url))
    }

    if(isAuthRoute && user) {
        return NextResponse.redirect(new URL("/Admin/overview" , request.url));
    }

    return NextResponse.next();
}   

