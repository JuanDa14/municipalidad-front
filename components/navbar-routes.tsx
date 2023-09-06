'use client';

import Link from 'next/link';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const font = Poppins({
	weight: ['300', '500', '600'],
	subsets: ['latin'],
});

export const NavbarRoutes = ({ routes }: { routes: { href: string; label: string }[] }) => {
	return (
		<div>
			<ul className='flex flex-col md:flex-row items-center justify-center gap-x-3'>
				{routes.map((route) => (
					<li key={route.label}>
						<Link href={route.href}>
							<span
								className={cn(
									`hidden md:block font-medium text-base text-primary`,
									font.className
								)}
							>
								{route.label}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
