'use client';

import { useState } from 'react';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	ColumnFiltersState,
	getFilteredRowModel,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, TrashIcon, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useModal } from '@/hooks/useModal';
import { User } from '@/interfaces/user';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function DataTable({ data }: { data: User[] }) {
	const router = useRouter();
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const { openModal } = useModal();

	const columns: ColumnDef<User>[] = [
		{
			accessorKey: '_id',
			id: '_id',
			header: () => <span className='hidden'>Id</span>,
			cell: ({ row }) => <span className={cn('hidden')}>{row.getValue('_id')}</span>,
		},
		{
			accessorKey: 'name',
			header: 'Nombre',
			cell: ({ row }) => (
				<span className={cn('px-2 inline-flex text-xs leading-5 capitalize')}>
					{row.getValue('name')}
				</span>
			),
		},
		{
			accessorKey: 'role',
			header: 'Rol',
			cell: ({ row }) => (
				<span className={cn('px-2 inline-flex text-xs leading-5 font-semibold capitalize')}>
					{row.original.role.name === 'ADMIN'
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
			cell: ({ row }) => (
				<div className='flex items-center justify-center gap-x-2'>
					<Link href={`/user/${row.getValue('_id')}`}>
						<Button
							size={'icon'}
							type='button'
							className='flex justify-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150'
						>
							<Pencil size={15} />
						</Button>
					</Link>

					<Button
						onClick={() => {
							router.push(`/user/${row.getValue('_id')}`);
							openModal();
						}}
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

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	});

	return (
		<div>
			<div className='flex items-center justify-between py-4 px-4 gap-x-3'>
				<Input
					placeholder='Buscar por email'
					value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
					className='max-w-sm'
				/>
				<Link href={'user/new'}>
					<Button title='Crear usuario' className='bg-green-500 flex items-center gap-x-2'>
						<UserPlus size={16} />
						<p>Nuevo usuario</p>
					</Button>
				</Link>
			</div>
			<div className='border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No hay datos
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
