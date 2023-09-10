export { default } from 'next-auth/middleware';

export const config = {
	matcher: [
		'/api/auth/session',
		'/api/auth/signin',
		'/api/auth/signout',
		'/api/auth/callback',
		'/api/auth/csrf',

		'/dashboard/:path*',
		'/users/:path*',
		'/reports/:path*',
		'/clients/:path*',
	],
};
