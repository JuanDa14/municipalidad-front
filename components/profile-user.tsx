'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { ProfileForm } from './profile-form';
import { useUserProfileModal } from '@/hooks/useModal';
import { useSession } from 'next-auth/react';

export function ProfileUser() {
	const { data: session } = useSession();
	const { isOpen, closeModal } = useUserProfileModal();

	return (
		<Dialog open={isOpen} onOpenChange={closeModal}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Editar perfil</DialogTitle>
					<DialogDescription>Realice cambios en su perfil aquí.</DialogDescription>
				</DialogHeader>
				<ProfileForm user={session?.user!} />
			</DialogContent>
		</Dialog>
	);
}
