'use client';

import Link from 'next/link';
import { ArrowUpDown, Pencil } from 'lucide-react';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Client } from '@/interfaces/client';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<Client>[] = [
	{
		accessorKey: 'dni',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Dni
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.dni}</span>,
	},
	{
		accessorKey: 'first_name',
		header: 'Nombres',
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.first_name}</span>,
	},
	{
		accessorKey: 'last_name',
		header: 'Apellidos',
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.last_name}</span>,
	},
	{
		accessorKey: 'phone',
		header: 'Teléfono',
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.phone}</span>,
	},
	{
		accessorKey: 'direction',
		header: 'Dirección',
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.direction}</span>,
	},
	{
		accessorKey: 'type',
		header: 'Tipo',
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.type}</span>,
	},
	{
		accessorKey: 'state',
		header: 'Estado',
		cell: ({ row }) => (
			<Badge className={cn('text-xs', row.original.state ? 'bg-green-700' : 'bg-red-700')}>
				{row.getValue('state') ? 'Activo' : 'Inactivo'}
			</Badge>
		),
	},
	{
		accessorKey: 'actions',
		header: 'Acciones',
		cell: ({ row }) => (
			<div className='flex items-center justify-center gap-x-2'>
				<Link href={`clients/${row.original._id}`}>
					<Button
						disabled={!row.original.state}
						title='Editar cliente'
						size={'icon'}
						type='button'
					>
						<Pencil className='w-4 h-4' />
					</Button>
				</Link>
			</div>
		),
	},
];
