'use client';

import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RequestAttachment, RequestAttachmentState } from '@/interfaces/request-attachment';
import { axios } from '@/lib/axios';
import { cn } from '@/lib/utils';
import { Row } from '@tanstack/react-table';
import { ProtectedComponent } from '@/components/protected-component';

interface CellStateProps {
	row: Row<RequestAttachment>;
}

export const CellState = ({ row }: CellStateProps) => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const onUpdate = async (state: RequestAttachmentState) => {
		try {
			setIsLoading(true);
			await axios.patch(`/request-attachment/${row.original._id}`, { state });
			toast.success('Estado de la solicitud actualizado');
			router.refresh();
		} catch {
			toast.error('No se pudo actualizar el estado de la solicitud');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex items-center gap-2'>
			<Badge
				className={cn(
					'text-xs text-white',
					row.original.state === 'Pendiente' && 'bg-yellow-600',
					row.original.state === 'Aprobado' && 'bg-emerald-600',
					row.original.state === 'Rechazado' && 'bg-red-600'
				)}
			>
				{row.original.state}
			</Badge>
			<ProtectedComponent roles={'ADMINISTRADOR'}>
				{row.original.state === 'Pendiente' && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={'ghost'} size={'icon'} disabled={isLoading}>
								<ChevronDown className='h-4 w-4 outline-none' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='outline-none'>
							<DropdownMenuItem onClick={() => onUpdate(RequestAttachmentState.Approved)}>
								Aprobado
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => onUpdate(RequestAttachmentState.Rejected)}>
								Rechazado
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</ProtectedComponent>
		</div>
	);
};
