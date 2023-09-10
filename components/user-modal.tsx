'use client';

import { useUserModal } from '@/hooks/useModal';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useUI } from '@/hooks/useUI';
import { useFetch } from '@/hooks/useFetch';
import { Operation } from '@/context/ui/ui-context';

export const UserModal = () => {
	const { isOpen, closeModal } = useUserModal();
	const router = useRouter();
	const { state } = useUI();
	const { fetchWithAccessToken, fetchLoading } = useFetch();

	const actionUser = async (action: Operation) => {
		const data = await fetchWithAccessToken(`/user/state/${state.userId}`, {
			method: 'PUT',
			body: JSON.stringify(action === 'delete' ? { state: false } : { state: true }),
		});

		if (data.ok) {
			router.refresh();
			closeModal();
		}
	};

	return (
		<Dialog open={isOpen || fetchLoading} onOpenChange={closeModal}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{state.operation === 'delete' ? 'Eliminar Usuario' : 'Activar Usuario'}
					</DialogTitle>
					<DialogDescription>Desea continuar con la operación?</DialogDescription>
				</DialogHeader>
				<div className='flex justify-end mt-2 gap-x-2'>
					<Button variant='secondary' onClick={closeModal} disabled={fetchLoading}>
						Cancelar
					</Button>
					<Button
						variant={state.operation === 'delete' ? 'destructive' : 'default'}
						onClick={() => actionUser(state.operation)}
						disabled={fetchLoading}
					>
						{state.operation === 'delete' ? 'Eliminar' : 'Activar'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
