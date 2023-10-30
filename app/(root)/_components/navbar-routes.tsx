'use client';

import Link from 'next/link';

interface NavbarRoutesProps {
	routes: { href: string; label: string }[];
}

export const NavBarRoutes = ({ routes }: NavbarRoutesProps) => {
	return (
		<div>
			<ul className='flex flex-col md:flex-row items-center justify-center gap-3'>
				{routes.map((route, i) => (
					<li key={i}>
						<Link href={route.href} target={Number(i) === 3 ? '_blank' : ''}>
							<span className='hidden md:block font-medium text-sm text-primary'>
								{route.label}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};