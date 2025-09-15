import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { type NextRequestWithAuth } from "next-auth/middleware";

const locales = ["en-US", "uk-UA"];
const usersPages = ["registration", "login"];
const defaultLocale = "en-US";

export async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({ req: request });
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  let newPathName = "";

  const locale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  const isLoginIn = usersPages.find(
    (userPage) => pathname.endsWith(userPage) || pathname === `/${userPage}`,
  );

  if (!token) {
    newPathName = isLoginIn ? isLoginIn : usersPages[1];
  }

  if (locale) {
    if (!token && !isLoginIn) {
      return NextResponse.redirect(
        new URL(`/${locale}/${newPathName}`, request.nextUrl),
      );
    }
    return;
  }

  // Redirect if there is no locale and login
  request.nextUrl.pathname = `/${defaultLocale}${!token ? "/" + newPathName : pathname}`;

  // return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|static|.*\\..*|_next|public|images).*)",
    // Optional: only run on root (/) URL
    // '/admin',
  ],
};
