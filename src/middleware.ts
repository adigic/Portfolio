// src/middleware.ts  (or middleware.ts at project root — use only one)
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing, {
  localeDetection: false
});

export const config = {
  matcher: '/((?!api|_next|.*\\..*).*)'
};
