'use client';

import { useRoleModal } from '@/hooks/useModal';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useUI } from '@/hooks/useUI';
import { useFetch } from '@/hooks/useFetch';

export const RoleModal = () => {
	const { isOpen, closeModal } = useRoleModal();
	const router = useRouter();
	const { state } = useUI();
	const { fetchWithAccessToken, fetchLoading } = useFetch();

	const updateStateRol = async () => {
		const data = await fetchWithAccessToken(`/role/${state.id}`, {
			method: 'PUT',
			body: JSON.stringify({ state: !state.data.state }),
		});

		if (data.ok) {
			router.refresh();
			closeModal();
		}
	};

	const deleteRol = async () => {
		const data = await fetchWithAccessToken(`/role/${state.id}`, {
			method: 'DELETE',
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
						{state.operation === 'delete' && 'Eliminar Rol'}
						{state.operation === 'put' && 'Actualizar Rol'}
					</DialogTitle>
					<DialogDescription>Desea continuar con la operación?</DialogDescription>
				</DialogHeader>
				<div className='flex justify-end mt-2 gap-x-2'>
					<Button variant='secondary' onClick={closeModal} disabled={fetchLoading}>
						Cancelar
					</Button>
					<Button
						variant={state.operation === 'delete' ? 'destructive' : 'default'}
						onClick={() => (state.operation === 'put' ? updateStateRol() : deleteRol())}
						disabled={fetchLoading}
					>
						{state.operation === 'delete' ? 'Eliminar' : 'Actualizar'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
