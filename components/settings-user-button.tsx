'use client';

import { useRouter } from 'next/navigation';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { useUserProfileModal } from '@/hooks/useModal';

export const SettingsUserButton = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const { openModal } = useUserProfileModal();

	const handleSignOut = () => {
		signOut({ callbackUrl: '/login' });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<Avatar className='h-9 w-9'>
						<AvatarImage src={session?.user.imageURL} alt={session?.user?.name} />
						<AvatarFallback>{session?.user?.name}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>{session?.user?.name}</p>
						<p className='text-xs leading-none text-muted-foreground'>
							{session?.user?.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={openModal}>
						Perfil
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Facturación
						<DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Configuración
						<DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleSignOut}>
					Cerrar sesión
					<DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
