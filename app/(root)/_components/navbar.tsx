'use client';

import { Button } from '@/components/ui/button';
import { LogInIcon } from 'lucide-react';
import { NavBarRoutes } from './navbar-routes';
import Image from 'next/image';
import Link from 'next/link';
import { MobileNavbar } from '@/components/mobile-navbar';
import { Sidebar } from './sidebar';

const routes = [
	{
		href: 'https://www.google.com',
		label: 'Inicio',
	},
	{
		href: 'https://www.google.com',
		label: 'Noticias',
	},
	{
		href: 'https://www.google.com',
		label: 'Municipalidad',
	},
	{
		href: 'https://www.google.com',
		label: 'Servicios',
	},
	{
		href: 'https://www.google.com',
		label: 'Ciudad',
	},
	{
		href: 'https://www.google.com',
		label: 'Correo',
	},
];

export const Navbar = () => {
	return (
		<div className='fixed top-0 w-full z-50 h-16 bg-primary-foreground border-b border-primary/10'>
			<div className='w-full h-full flex items-center justify-between px-5'>
				<MobileNavbar className='p-0 pt-10 w-1/2'>
					<Sidebar />
				</MobileNavbar>
				<div className='hidden md:flex'>
					<Image src='/next.svg' alt='Picture of the author' width={150} height={50} />
				</div>
				<div className='flex items-center gap-10'>
					<NavBarRoutes routes={routes} />
					<Link href={'/login'}>
						<Button className='flex items-center justify-center gap-1'>
							<LogInIcon className='h-4 w-4' />
							Ingresar
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
