// src/middleware.ts
import {NextRequest} from "next/server";
import createMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing";

// v3-style: only pass routing
const intl = createMiddleware(routing);

export function middleware(request: NextRequest) {
  return intl(request);
}

export const config = {
  matcher: "/((?!api|_next|.*\\..*).*)"
};
