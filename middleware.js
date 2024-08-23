import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');
  const url = req.nextUrl.clone();

  // Condiciones para manejar la autenticación
  if (token && url.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (
    !token &&
    url.pathname !== '/login' &&
    !url.pathname.startsWith('/_next') &&
    !url.pathname.startsWith('/static')
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/dashboard', '/((?!_next|static).*)'], // Ajustar según tus rutas
};
