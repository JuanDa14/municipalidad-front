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
		href: '#inicio',
		label: 'Inicio',
	},
	{
		href: '#noticias',
		label: 'Noticias',
	},
	{
		href: '#servicios',
		label: 'Servicios',
	},
	{
		href: '#contacto',
		label: 'Contacto',
	},
	{
		href: 'https://www.facebook.com/profile.php?id=100009636243866',
		label: 'Municipalidad',
	},
];

export const Navbar = () => {
	return (
		<div className='fixed top-0 w-full z-50 h-16 bg-blue-600 bg-opacity-95 shadow-lg text-white border-b border-primary/10'>
			<div className='w-full h-full flex items-center justify-between px-4 md:px-10'>
				<MobileNavbar className='p-0 pt-10 '>
					<Sidebar />
				</MobileNavbar>
				<div className='hidden md:flex'>
					<Image
						src='/logo muni.png'
						alt='Imagen de la municipalidad'
						width={60}
						height={70}
					/>
				</div>
				<div className='flex items-center'>
					<NavBarRoutes routes={routes} />
					<Link href={'/login'}>
						<Button
							size={'sm'}
							variant={'link'}
							className='flex items-center justify-center gap-1 text-sm text-white transition'
						>
							Ingresar
							<LogInIcon className='h-4 w-4' />
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
