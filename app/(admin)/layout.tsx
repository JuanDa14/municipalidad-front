'use client';

import { DeleteUserModal } from '@/components/delete-user-modal';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='w-full min-h-screen mx-auto'>
			<DeleteUserModal />
			<Navbar />
			<div className='hidden md:flex mt-16 w-60 flex-col fixed inset-y-0'>
				<Sidebar />
			</div>
			<main className='md:pl-60 pt-16 h-full'>{children}</main>
		</div>
	);
};

export default AdminLayout;
