'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

import {
	Home,
	Settings,
	Users,
	Folder,
	LibraryIcon,
	List,
	Users2,
	FolderCheck,
	Receipt
} from 'lucide-react';

import { cn } from '@/lib/utils';

const routes = [
  {
    icon: Home,
    href: "/dashboard",
    label: "Dashboard",
    private: false,
  },
  {
    icon: Users,
    href: "/users",
    label: "Usuarios",
    private: true,
  },
  {
    icon: List,
    href: "/roles",
    label: "Roles",
    private: true,
  },
  {
    icon: Folder,
    href: "/reports",
    label: "Reportes",
    private: true,
  },
  {
    icon: Users,
    href: "/clients",
    label: "Clientes",
    private: true,
  },
  {
    icon: FolderCheck,
    href: "/services",
    label: "Servicios",
    private: true,
  },
  {
    icon: Receipt,
    href: "/receipts",
    label: "Recibos",
    private: true,
  },
  {
    icon: Users2,
    href: "/providers",
    label: "Proveedores",
    private: true,
  },
  {
    icon: LibraryIcon,
    href: "/charts",
    label: "Gráficas",
    private: true,
  },
  {
    icon: Settings,
    href: "/settings",
    label: "Configuración",
    private: false,
  },
];

export const Sidebar = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { data: session } = useSession();

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
								route.private
									? session?.user.role.name === 'ADMINISTRADOR'
										? ''
										: 'hidden'
									: ''
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
