// middleware.ts (ROOT)

import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/createSupabaseMiddleware";

export async function middleware(request: NextRequest) {
  // أول شيء: تحديث session + cookies
  const response = await updateSession(request);

  const {
    pathname
  } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith("/Admin");
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");

  // نجيب user من نفس request (بعد التحديث)
  // ملاحظة: getUser موجود داخل updateSession أصلاً، لكن ممكن تعيدها إذا بدك حماية أقوى

  // 🚫 حماية admin
  // (لو بدك أقوى، ممكن ترجع user من updateSession بشكل منفصل)
  
  // هنا نعمل إعادة check بسيطة:
  const supabase = (await import("@supabase/ssr")).createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { session }, error
  } = await supabase.auth.getSession();

  if(error) {
    return NextResponse.next();
  }

  if (isProtectedRoute) {
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!session.user.email_confirmed_at) {
    return NextResponse.redirect(new URL("/verify-Email", request.url));
  }
}

  return response;
}