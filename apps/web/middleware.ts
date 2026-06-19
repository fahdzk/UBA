// Middleware — temporarily disabled for landing page deployment
import { NextResponse } from "next/server";

export default function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
