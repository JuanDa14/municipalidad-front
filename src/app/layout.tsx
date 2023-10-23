import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { NextAuthProvider } from './provider';
import Loading from './loading';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Municipalidad - San José',
	description: 'Municipalidad de San José, Perú',
	viewport: 'width=device-width, initial-scale=1.0',
	manifest: '/manifest.json',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<html lang='en' suppressHydrationWarning>
				<body className={inter.className}>
					<Suspense fallback={<Loading />}>
						<NextAuthProvider>{children}</NextAuthProvider>
					</Suspense>
				</body>
			</html>
		</>
	);
}
