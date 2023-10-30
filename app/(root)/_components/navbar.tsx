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
		href: '/#hero',
		label: 'Inicio',
	},
	{
		href: '/#news',
		label: 'Noticias',
	},
	{
		href: '/#services',
		label: 'Servicios',
	},
	{
		href: 'https://www.facebook.com/profile.php?id=100009636243866',
		label: 'Municipalidad',
	},
];

export const Navbar = () => {
	return (
		<div className='fixed top-0 w-full z-50 h-16 bg-muted-foreground/10 border-b border-primary/10'>
			<div className='w-full h-full flex items-center justify-between px-5'>
				<MobileNavbar className='p-0 pt-10 '>
					<Sidebar />
				</MobileNavbar>
				<div className='hidden md:flex'>
					<Image
						src='/logo muni.png'
						alt='Imagen de la municipalidad'
						width={60}
						height={70}
						className='ml-10'
					/>
				</div>
				<div className='flex items-center gap-5'>
					<NavBarRoutes routes={routes} />
					<Link href={'/login'}>
						<Button size={'sm'} className='flex items-center justify-center gap-1'>
							<LogInIcon className='h-4 w-4' />
							Ingresar
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
