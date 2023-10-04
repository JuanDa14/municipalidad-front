'use client';

import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { Spinner } from '@/components/ui/spinner';
import { useFetch } from '@/hooks/useFetch';

interface AdminLayoutProps {
	children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
	const { fetchWithToken } = useFetch();
	const { status, update } = useSession();

	useEffect(() => {
		const interval = setInterval(async () => {
			const data = await fetchWithToken('/auth/refresh-token');
			if (data?.ok) {
				await update(data);
			} else {
				signOut({
					redirect: true,
					callbackUrl: '/login',
				});
			}
		}, 50 * 60 * 1000);

		return () => clearInterval(interval);
	}, [update, fetchWithToken]);

	if (status === 'loading') {
		return <Spinner />;
	}

	return (
		<div className='w-full min-h-screen mx-auto'>
			<Navbar />
			<div className='hidden md:flex mt-16 w-48 flex-col fixed inset-y-0'>
				<Sidebar />
			</div>
			<main className='md:pl-48 pt-16 h-full'>{children}</main>
		</div>
	);
};

export default AdminLayout;
