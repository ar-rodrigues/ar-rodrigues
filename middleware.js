import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const supportedLocales = ["es", "en", "pt"];
const defaultLocale = "es";

function getLocale(request) {
  // Check if pathname already has a locale
  const pathname = request.nextUrl.pathname;
  const pathLocale = pathname.split("/")[1];

  if (supportedLocales.includes(pathLocale)) {
    return pathLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase());

    for (const lang of languages) {
      if (lang.startsWith("en")) return "en";
      if (lang.startsWith("pt")) return "pt";
      if (lang.startsWith("es")) return "es";
    }
  }

  return defaultLocale;
}

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const pathLocale = pathname.split("/")[1];

  // Skip locale handling for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico)$/)
  ) {
    return await updateSession(request);
  }

  // If no locale in path, redirect to detected locale
  if (!supportedLocales.includes(pathLocale)) {
    const locale = getLocale(request);
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(newUrl);
  }

  // Continue with Supabase session update
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
