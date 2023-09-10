'use client';

import { Home, Settings, Users, Folder } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

export const Sidebar = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { data: session } = useSession();

	const routes = [
		{
			icon: Home,
			href: '/dashboard',
			label: 'Dashboard',
			private: false,
		},
		{
			icon: Users,
			href: '/users',
			label: 'Usuarios',
			private: true,
		},
		{
			icon: Folder,
			href: '/reports',
			label: 'Reportes',
			private: true,
		},
		{
			icon: Settings,
			href: '/settings',
			label: 'Configuración',
			private: false,
		},
	];

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
								pathname === route.href && 'bg-primary/10 text-primary',
								route.private ? (session?.user.role.name === 'ADMIN' ? '' : 'hidden') : ''
							)}
							key={route.href}
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
