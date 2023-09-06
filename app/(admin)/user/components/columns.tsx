'use client';

import { Button } from '@/components/ui/button';
import { User } from '@/interfaces/user';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, TrashIcon } from 'lucide-react';
import Image from 'next/image';

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'name',
		header: 'Nombre',
	},
	{
		accessorKey: 'role',
		header: 'Rol',
		cell: ({ row }) => (
			<span className={cn('px-2 inline-flex text-xs leading-5 font-semibold capitalize')}>
				{row.getValue('role') === 'ADMIN'
					? 'Administrador'
					: row.getValue('role') === 'SUPER-USER'
					? 'Super Usuario'
					: 'Usuario'}
			</span>
		),
	},
	{
		accessorKey: 'email',
		header: 'Correo',
	},
	{
		accessorKey: 'state',
		header: 'Estado',
		cell: ({ row }) => (
			<span
				className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
					row.getValue('state') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
				}`}
			>
				{row.getValue('state') ? 'Activo' : 'Inactivo'}
			</span>
		),
	},
	{
		accessorKey: 'imageURL',
		header: 'Imagen',
		cell: ({ row }) => (
			<Image
				key={row.id}
				src={row.getValue('imageURL')}
				alt={row.getValue('name')}
				className='w-8 h-8 rounded-full object-cover object-center'
				width={32}
				height={32}
			/>
		),
	},
	{
		accessorKey: 'operations',
		header: 'Operaciones',
		cell: () => (
			<div className='flex items-center justify-center gap-x-2'>
				<Button
					size={'icon'}
					type='button'
					className='flex justify-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150'
				>
					<Pencil size={15} />
				</Button>
				<Button
					size={'icon'}
					type='button'
					className='flex justify-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150'
				>
					<TrashIcon size={15} />
				</Button>
			</div>
		),
	},
];
