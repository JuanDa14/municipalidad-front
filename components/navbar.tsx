'use client';

import Link from 'next/link';
import Image from 'next/image';

import { MobileNavbar } from '@/components/mobile-navbar';
import { UserButton } from '@/components/user-button';
import { cn } from '@/lib/utils';

export const Navbar = () => {
	return (
		<div className='fixed top-0 w-full bg-primary-foreground z-50 flex items-center justify-between py-2 px-4 border-b border-primary/10 h-16'>
			<div className='flex items-center justify-start'>
				<MobileNavbar />
				<Link
					href={'/dashboard'}
					className={cn(
						`hidden md:block text-xl md:text-xl font-bold text-primary cursor-pointer`
					)}
				>
					<Image
						src='/next.svg'
						priority
						alt='Logo'
						width={150}
						height={150}
						className='cursor-pointer'
					/>
				</Link>
			</div>
			<div className='flex items-center gap-x-3 justify-end'>
				<UserButton />
			</div>
		</div>
	);
};
