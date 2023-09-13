'use client';

import { useUserModal } from '@/hooks/useModal';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useUI } from '@/hooks/useUI';
import { useFetch } from '@/hooks/useFetch';

export const UserModal = () => {
	const { isOpen, closeModal } = useUserModal();
	const router = useRouter();
	const { state } = useUI();
	const { fetchWithAccessToken, fetchLoading } = useFetch();

	const updateStateUser = async () => {
		const data = await fetchWithAccessToken(`/user/state/${state.id}`, {
			method: 'PUT',
		});

		if (data.ok) {
			router.refresh();
			closeModal();
		}
	};

	const deleteUser = async () => {
		const data = await fetchWithAccessToken(`/user/${state.id}`, {
			method: 'DELETE',
		});

		if (data.ok) {
			router.push('/users');
			router.refresh();
		}
	};

	return (
		<Dialog open={isOpen || fetchLoading} onOpenChange={closeModal}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{state.operation === 'delete' && 'Eliminar Usuario'}
						{state.operation === 'put' && 'Actualizar Usuario'}
					</DialogTitle>
					<DialogDescription>Desea continuar con la operación?</DialogDescription>
				</DialogHeader>
				<div className='flex justify-end mt-2 gap-x-2'>
					<Button variant='secondary' onClick={closeModal} disabled={fetchLoading}>
						Cancelar
					</Button>
					<Button
						variant={state.operation === 'delete' ? 'destructive' : 'default'}
						onClick={() => (state.operation === 'put' ? updateStateUser() : deleteUser())}
						disabled={fetchLoading}
					>
						{state.operation === 'delete' ? 'Eliminar' : 'Actualizar'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
