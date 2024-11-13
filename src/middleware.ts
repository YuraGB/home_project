import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { type NextRequestWithAuth } from "next-auth/middleware";

const locales = ["en-US", "uk-UA"];
const defaultLocale = "en-US";

export async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({ req: request });
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    if (!token && !pathname.endsWith("login")) {
      return NextResponse.redirect(new URL("login", request.nextUrl));
    }
    return;
  }

  // Redirect if there is no locale and login
  request.nextUrl.pathname = `/${defaultLocale}${!token ? "/login" : pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|static|.*\\..*|_next|public|images).*)",
    // Optional: only run on root (/) URL
    // '/admin',
  ],
};
