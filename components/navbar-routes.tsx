'use client';

import Link from 'next/link';

interface NavbarRoutesProps {
	routes: { href: string; label: string }[];
}

export const NavbarRoutes = ({ routes }: NavbarRoutesProps) => {
	return (
		<div>
			<ul className='flex flex-col md:flex-row items-center justify-center gap-x-3'>
				{routes.map((route) => (
					<li key={route.label}>
						<Link href={route.href}>
							<span className='hidden md:block font-medium text-base text-primary'>
								{route.label}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
