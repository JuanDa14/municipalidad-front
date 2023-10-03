export { default } from 'next-auth/middleware';

export const config = {
	matcher: [
		'/api/auth/session',
		'/api/auth/signin',
		'/api/auth/signout',
		'/api/auth/callback',
		'/api/auth/csrf',

		'/clients/:path*',
		'/dashboard/:path*',
		'/reports/:path*',
		'/roles/:path*',
		'/settings/:path*',
		'/users/:path*',
	],
};
