'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

import {
	HomeIcon,
	AlertCircle,
	HotelIcon,
	FolderCheckIcon,
	CircuitBoard,
	MailIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const routes = [
	{
		href: 'https://www.google.com',
		label: 'Inicio',
		icon: HomeIcon,
	},
	{
		href: 'https://www.google.com',
		label: 'Noticias',
		icon: AlertCircle,
	},
	{
		href: 'https://www.google.com',
		label: 'Municipalidad',
		icon: HotelIcon,
	},
	{
		href: 'https://www.google.com',
		label: 'Servicios',
		icon: FolderCheckIcon,
	},
	{
		href: 'https://www.google.com',
		label: 'Ciudad',
		icon: CircuitBoard,
	},
	{
		href: 'https://www.google.com',
		label: 'Correo',
		icon: MailIcon,
	},
];

export const Sidebar = () => {
	const pathname = usePathname();
	const router = useRouter();

	const onNavigate = (url: string) => {
		return router.push(url);
	};

	return (
		<div className='space-y-4 flex flex-col w-full h-full text-primary bg-secondary'>
			<div className='p-3 w-full justify-center'>
				<div className='space-y-2'>
					{routes.map((route) => (
						<div
							onClick={() => onNavigate(route.href)}
							className={cn(
								'text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
								pathname === route.href && 'bg-primary/10 text-primary'
							)}
							key={route.label}
						>
							<div className='w-full flex gap-x-2 items-center flex-1'>
								<route.icon className='h-5 w-5' />
								{route.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
