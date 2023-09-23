'use client';

import { useClientModal } from '@/hooks/useModal';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useUI } from '@/hooks/useUI';
import { useFetch } from '@/hooks/useFetch';

export const ClientModal = () => {
	const { isOpen, closeModal } = useClientModal();
	const router = useRouter();
	const { state } = useUI();
	const { fetchWithAccessToken, fetchLoading } = useFetch();

	const deleteClient = async () => {
		const data = await fetchWithAccessToken(`/client/${state.id}`, {
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
					<DialogTitle>Eliminar Client</DialogTitle>
					<DialogDescription>Desea continuar con la operación?</DialogDescription>
				</DialogHeader>
				<div className='flex justify-end mt-2 gap-x-2'>
					<Button variant='secondary' onClick={closeModal} disabled={fetchLoading}>
						Cancelar
					</Button>
					<Button variant={'destructive'} onClick={deleteClient} disabled={fetchLoading}>
						Eliminar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
