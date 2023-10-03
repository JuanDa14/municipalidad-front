'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpDown, Pencil } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User } from '@/interfaces/user';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<User>[] = [
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
		cell: ({ row }) => <span className='text-xs capitalize'>{row.getValue('name')}</span>,
	},
	{
		accessorKey: 'role',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Rol
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<span className='text-xs capitalize font-medium'>{row.original.role.name}</span>
		),
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Correo
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
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
		cell: ({ row }) => {
			return (
				<Badge className={cn('text-xs', row.original.state ? 'bg-green-700' : 'bg-red-700')}>
					{row.getValue('state') ? 'Activo' : 'Inactivo'}
				</Badge>
			);
		},
	},
	{
		accessorKey: 'imageURL',
		header: 'Imagen',
		cell: ({ row }) => {
			const { _id } = row.original;
			return (
				<Image
					key={_id}
					src={row.getValue('imageURL')}
					alt={row.getValue('name')}
					className='w-10 h-10 rounded-full object-cover object-center'
					width={32}
					height={32}
				/>
			);
		},
	},
	{
		accessorKey: 'actions',
		header: 'Acciones',
		cell: ({ row }) => {
			const { _id } = row.original;
			return (
				<div className='flex items-center justify-center gap-x-2'>
					<Link href={`/users/${_id}`}>
						<Button
							disabled={!row.original.state}
							title='Editar usuario'
							size={'icon'}
							type='button'
						>
							<Pencil className='w-4 h-4' />
						</Button>
					</Link>
				</div>
			);
		},
	},
];
