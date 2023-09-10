'use client';

import { useState } from 'react';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	ColumnFiltersState,
	getFilteredRowModel,
	getPaginationRowModel,
	SortingState,
	getSortedRowModel,
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
import { ChevronDown, ChevronsUpDown, MoreVertical, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useUserModal } from '@/hooks/useModal';
import { User } from '@/interfaces/user';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useUI } from '@/hooks/useUI';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function DataTable({ data }: { data: User[] }) {
	const { dispatch } = useUI();
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);

	const { openModal } = useUserModal();

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
						: row.original.role.name === 'SUPER_USER'
						? 'Super Usuario'
						: 'Usuario'}
				</span>
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
						<ChevronsUpDown className='ml-2 h-4 w-4' />
					</Button>
				);
			},
		},
		{
			accessorKey: 'state',
			header: 'Estado',
			cell: ({ row }) => (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className='flex items-center text-xs font-semibold'>
								<span
									className={`rounded-full leading-5 px-2 ${
										row.getValue('state')
											? 'bg-green-100 text-green-800'
											: 'bg-red-100 text-red-800'
									}`}
								>
									{row.getValue('state') ? 'Activo' : 'Inactivo'}
								</span>
								<Button size={'icon'} variant={'ghost'}>
									<ChevronDown size={15} />
								</Button>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<Button
									onClick={() => {
										dispatch({ type: 'UI-ACTIVEUSER', payload: row.original._id });
										openModal();
									}}
									disabled={row.getValue('state')}
									variant={'ghost'}
								>
									Activo
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Button
									onClick={() => {
										dispatch({ type: 'UI-DELETEUSER', payload: row.original._id });
										openModal();
									}}
									disabled={!row.getValue('state')}
									variant={'ghost'}
								>
									Inactivo
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
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
					className='w-10 h-10 rounded-full object-cover object-center'
					width={32}
					height={32}
				/>
			),
		},
		{
			accessorKey: 'actions',
			header: 'Acciones',
			cell: ({ row }) => (
				<div className='flex items-center justify-center gap-x-2'>
					<Link href={`/users/${row.getValue('_id')}`}>
						<Button title='Editar usuario' size={'icon'} type='button'>
							<Pencil size={15} />
						</Button>
					</Link>
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
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	return (
		<div className='px-5'>
			<div className='mt-3'>
				<div>
					<div className='h-16 px-4 border-b'>
						<h2 className='text-3xl font-bold tracking-tight'>Usuarios</h2>
						<p className='text-sm text-foreground'>
							Lista de los usuarios registrados en el sistema.
						</p>
					</div>
					<div className='my-4'>
						<div className='flex w-full items-center justify-between'>
							<Input
								type='search'
								placeholder='Buscar por email...'
								value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
								onChange={(event) =>
									table.getColumn('email')?.setFilterValue(event.target.value)
								}
								className='md:w-[100px] lg:w-[300px]'
							/>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button size={'icon'} variant={'ghost'}>
										<MoreVertical size={20} />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuGroup>
										<DropdownMenuItem className='cursor-pointer outline-none'>
											<Link href={'users/new'} title='Crear usuario'>
												<Button variant={'ghost'}>Nuevo usuario</Button>
											</Link>
										</DropdownMenuItem>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</div>
			<div className='rounded-md border'>
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
			<div className='flex items-center justify-end space-x-2 py-4 px-5'>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Anterior
				</Button>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Siguiente
				</Button>
			</div>
		</div>
	);
}
