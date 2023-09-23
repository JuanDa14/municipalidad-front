'use client';

import { UserModal } from '@/components/user-modal';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { ProfileUser } from '@/components/profile-user';
import { RoleModal } from '@/components/role-modal';
import { useFetch } from '@/hooks/useFetch';
import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from '@/components/ui/spinner';
import { ClientModal } from '@/components/client-modal';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	const { fecthWithRefreshToken } = useFetch();
	const { status, update } = useSession();
	const { dispatch } = useAuth();

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (status === 'authenticated') {
			interval = setInterval(async () => {
				console.log('refreshing token');
				const data = await fecthWithRefreshToken();
				if (data?.ok) {
					update(data);
				} else {
					dispatch({ type: 'LOGOUT' });
					signOut({
						redirect: true,
						callbackUrl: '/login',
					});
				}
			}, 60 * 60 * 1000);
		}

		return () => clearInterval(interval);
	}, [update]);

	if (status === 'loading') {
		return <Spinner />;
	}

	return (
		<div className='w-full min-h-screen mx-auto'>
			<Navbar />
			<div className='hidden md:flex mt-16 w-48 flex-col fixed inset-y-0'>
				<Sidebar />
			</div>
			<main className='md:pl-48 pt-16 h-full'>
				<UserModal />
				<RoleModal />
				<ProfileUser />
				<ClientModal />
				{children}
			</main>
		</div>
	);
};

export default AdminLayout;
