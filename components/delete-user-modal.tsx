'use client';

import { useModal } from '@/hooks/useModal';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from './ui/use-toast';
import { useState } from 'react';

export const DeleteUserModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, closeModal } = useModal();
	const { data: session } = useSession();
	const params = useParams();
	const router = useRouter();

	const deleteUser = async () => {
		try {
			setIsLoading(true);

			const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${params.userId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${session!.accessToken}`,
				},
			});

			const data = await resp.json();

			if (data.ok) {
				closeModal();
				toast({
					title: 'Usuario eliminado',
					description: 'El usuario ha sido eliminado correctamente.',
				});
				router.push('/user');
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: 'Ha ocurrido un error al eliminar el usuario.',
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={closeModal}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Eliminar usuario?</DialogTitle>
					<DialogDescription>
						Esta acción no se puede deshacer. Esta acción eliminará permanentemente el usuario
					</DialogDescription>
				</DialogHeader>
				<div className='flex justify-end mt-2 gap-x-2'>
					<Button variant='secondary' onClick={closeModal} disabled={isLoading}>
						Cancelar
					</Button>
					<Button variant='destructive' onClick={deleteUser} disabled={isLoading}>
						Eliminar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
