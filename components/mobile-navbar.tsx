'use client';

import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from '@/components/sidebar';

export const MobileNavbar = () => {
	return (
		<Sheet>
			<SheetTrigger className='md:hidden pr-4'>
				<Menu />
			</SheetTrigger>
			<SheetContent side={'left'} className='p-0 pt-10 w-40'>
				<Sidebar />
			</SheetContent>
		</Sheet>
	);
};
