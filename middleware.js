import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  
  if (pathname.indexOf('#') <= -1) {
    return NextResponse.redirect(new URL(`/about`, req.nextUrl));
  }

  return NextResponse.next();
}