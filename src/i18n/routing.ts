// src/i18n/routing.ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'sv'],
  defaultLocale: 'en',
  // optional, but I recommend it:
  localePrefix: 'always'
});
