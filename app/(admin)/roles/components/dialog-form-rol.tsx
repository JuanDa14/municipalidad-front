'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRoleModal } from '@/hooks/useModal';
import { FormRol } from './form-rol';

export const DialogFormRol = () => {
	const { closeModalForm, isOpenForm } = useRoleModal();

	return (
		<Dialog open={isOpenForm} onOpenChange={closeModalForm}>
			<DialogContent>
				<FormRol />
			</DialogContent>
		</Dialog>
	);
};
