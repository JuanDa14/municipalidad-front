'use client';

import { useRouter } from 'next/navigation';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut, useSession } from 'next-auth/react';

export const SettingsUserButton = () => {
	const router = useRouter();

	const { data: session } = useSession();

	const handleSignOut = () => {
		signOut({ callbackUrl: '/login' });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='outline-none'>
				<Avatar>
					<AvatarImage src={session?.user.imageURL} />
					<AvatarFallback>{session?.user?.name}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<div className='flex items-center space-x-2'>
							<Avatar>
								<AvatarImage src={session?.user.imageURL} />
								<AvatarFallback>{session?.user?.name}</AvatarFallback>
							</Avatar>
							<div>
								<DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
								<p className='text-sm text-gray-500'>{session?.user?.email}</p>
							</div>
						</div>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className='cursor-pointer'>
						<p>Configuración</p>
					</DropdownMenuItem>
					<DropdownMenuItem className='cursor-pointer' onClick={handleSignOut}>
						<p>Cerrar sesión</p>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
