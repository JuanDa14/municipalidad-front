'use client';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

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
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

export const UserButton = () => {
	const router = useRouter();

	const { data: session } = useSession();

	const handleSignOut = () => {
		signOut({ callbackUrl: '/login' });
	};

	const onNavigate = (url: string) => {
		router.push(url);
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
						<span className='text-sm font-medium leading-none'>{session?.user?.name}</span>
						<span className='text-xs leading-none text-muted-foreground'>
							{session?.user?.email}
						</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<ModeToggle />

					<DropdownMenuItem onClick={() => onNavigate('/settings')}>
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
