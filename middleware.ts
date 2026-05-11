import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match the root and all locale-prefixed paths, excluding Next.js internals and static files
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
