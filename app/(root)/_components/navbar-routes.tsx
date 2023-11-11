'use client';

import { Button } from '@/components/ui/button';
import { useHash } from '@/hooks/useHash';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NavbarRoutesProps {
	routes: { href: string; label: string }[];
}

export const NavBarRoutes = ({ routes }: NavbarRoutesProps) => {
	const hash = useHash();

	return (
		<div>
			<ul className='flex flex-col md:flex-row items-center justify-center'>
				{routes.map((route, i) => (
					<li key={i}>
						<Link href={route.href} target={Number(i) === 4 ? '_blank' : ''}>
							<Button
								className={cn('hidden md:block font-medium text-sm text-white transition')}
								size={'sm'}
								variant={'link'}
							>
								<span className={cn(hash === route.href.split('#')[1] && 'underline')}>
									{route.label}
								</span>
							</Button>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
