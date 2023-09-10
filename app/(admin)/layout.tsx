'use client';

import { UserModal } from '@/components/user-modal';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { ProfileUser } from '@/components/profile-user';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='w-full min-h-screen mx-auto'>
			<UserModal />
			<ProfileUser />
			<Navbar />
			<div className='hidden md:flex mt-16 w-48 flex-col fixed inset-y-0'>
				<Sidebar />
			</div>
			<main className='md:pl-48 pt-16 h-full'>{children}</main>
		</div>
	);
};

export default AdminLayout;
