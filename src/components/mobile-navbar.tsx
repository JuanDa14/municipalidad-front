'use client';

import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from '@/app/(admin)/_components/sidebar';
import { StyleHTMLAttributes } from 'react';

interface MobileNavbarProps {
	children: React.ReactNode;
	className: StyleHTMLAttributes<HTMLDivElement>['className'];
}

export const MobileNavbar = ({ children, className }: MobileNavbarProps) => {
	return (
		<Sheet>
			<SheetTrigger className='md:hidden pr-4'>
				<Menu />
			</SheetTrigger>
			<SheetContent side={'left'} className={className}>
				{children}
			</SheetContent>
		</Sheet>
	);
};
