export { default } from 'next-auth/middleware';

export const config = {
	matcher: [
		'/charts/:path*',
		'/clients/:path*',
		'/dashboard/:path*',
		'/providers/:path*',
		'/receipts/:path*',
		'/reports/:path*',
		'/requests/:path*',
		'/roles/:path*',
		'/services/:path*',
		'/settings/:path*',
		'/users/:path*',
	],
};
