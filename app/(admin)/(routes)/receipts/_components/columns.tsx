'use client';

import Link from 'next/link';
import { Printer, Eye } from 'lucide-react';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ServiceReceipt } from '@/interfaces/service-receipt';
import { ViewReceiptModal } from '@/components/modals/view-receipt-modal';
import { formatPrice } from '@/lib/format';

export const columns: ColumnDef<ServiceReceipt>[] = [
	{
		accessorKey: 'dni_ruc',
		header: 'DNI/RUC',
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.client.dni_ruc}</span>,
	},
	{
		accessorKey: 'name',
		header: 'Nombre',
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.client.name}</span>,
	},
	{
		accessorKey: 'service',
		header: 'Servicio',
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.service.name}</span>,
	},
	{
		accessorKey: 'date',
		header: 'Fecha de pago',
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.paymentDate}</span>,
	},
	{
		accessorKey: 'price',
		header: 'Pago S/.',
		cell: ({ row }) => (
			<span className='text-xs capitalize'>{formatPrice(Number(row.original.amount))}</span>
		),
	},
	{
		accessorKey: 'actions',
		header: 'Acciones',
		cell: ({ row }) => (
			<div className='flex items-center justify-center gap-x-2'>
				<Link href={`/receipts/print/${row.original._id}`}>
					<Button size={'icon'} type='button'>
						<Printer className='w-4 h-4 ' />
					</Button>
				</Link>
				<ViewReceiptModal receiptId={row.original._id}>
					<Button size={'icon'} type='button'>
						<Eye className='w-4 h-4 ' />
					</Button>
				</ViewReceiptModal>
			</div>
		),
	},
];
