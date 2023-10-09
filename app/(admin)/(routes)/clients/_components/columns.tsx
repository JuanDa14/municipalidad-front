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
		accessorKey: 'dni_ruc',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					DNI/RUC
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.dni_ruc}</span>,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Nombre
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.name}</span>,
	},
	{
		accessorKey: 'phone',
		header: 'Teléfono',
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.phone}</span>,
	},
	{
		accessorKey: 'address',
		header: 'Dirección',
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.address}</span>,
	},
	{
		accessorKey: 'document_type',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Documento
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.document_type}</span>,
	},
	{
		accessorKey: 'email',
		header: 'Correo',
		cell: ({ row }) => <span className='text-xs'>{row.original.email}</span>,
	},
	{
		accessorKey: 'state',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Estado
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
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
				<Link href={`/clients/${row.original._id}`}>
					<Button size={'icon'} type='button'>
						<Pencil className='w-4 h-4' />
					</Button>
				</Link>
			</div>
		),
	},
];
