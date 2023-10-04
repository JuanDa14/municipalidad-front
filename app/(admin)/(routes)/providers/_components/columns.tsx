'use client';

import Link from 'next/link';
import { ArrowUpDown, Pencil } from 'lucide-react';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Provider } from '@/interfaces/provider';

export const columns: ColumnDef<Provider>[] = [
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
		accessorKey: 'direction',
		header: 'Dirección',
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.direction}</span>,
	},
	{
		accessorKey: 'condition',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Condicion
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.condition}</span>,
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
				<Link href={`/providers/${row.original._id}`}>
					<Button disabled={!row.original.state} size={'icon'} type='button'>
						<Pencil className='w-4 h-4' />
					</Button>
				</Link>
			</div>
		),
	},
];
