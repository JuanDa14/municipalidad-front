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
import { ChevronsUpDown, Pencil, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useClientModal, useUserModal } from '@/hooks/useModal';
import { cn } from '@/lib/utils';
import { useUI } from '@/hooks/useUI';
import { useRouter } from 'next/navigation';
import { Client } from '@/interfaces/client';

export function DataTable({ data }: { data: Client[] }) {
	const { dispatch } = useUI();
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const router = useRouter();

	const onNavigate = (path: string) => {
		router.push(path);
	};

	const { openModal } = useClientModal();

	const columns: ColumnDef<Client>[] = [
		{
			accessorKey: '_id',
			id: '_id',
			header: () => <span className='hidden'>Id</span>,
			cell: ({ row }) => <span className={cn('hidden')}>{row.getValue('_id')}</span>,
		},
		{
			accessorKey: 'dni',
			header: ({ column }) => {
				return (
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						DNI
						<ChevronsUpDown className='ml-2 h-4 w-4' />
					</Button>
				);
			},
			cell: ({ row }) => (
				<span className={cn('px-2 inline-flex text-xs leading-5 capitalize')}>
					{row.original.dni}
				</span>
			),
		},
		{
			accessorKey: 'first_name',
			header: 'Nombres',
			cell: ({ row }) => (
				<span className={cn('px-2 inline-flex text-xs leading-5 capitalize')}>
					{row.original.first_name}
				</span>
			),
		},
		{
			accessorKey: 'last_name',
			header: 'Apellidos',
			cell: ({ row }) => (
				<span className={cn('px-2 inline-flex text-xs leading-5 capitalize')}>
					{row.original.last_name}
				</span>
			),
		},
		{
			accessorKey: 'phone',
			header: 'Teléfono',
			cell: ({ row }) => (
				<span className={cn('px-2 inline-flex text-xs leading-5 capitalize')}>
					{row.original.phone}
				</span>
			),
		},
		{
			accessorKey: 'direction',
			header: 'Dirección',
			cell: ({ row }) => (
				<span className={cn('px-2 inline-flex text-xs leading-5 capitalize')}>
					{row.original.direction}
				</span>
			),
		},
		{
			accessorKey: 'type',
			header: 'Tipo de cliente',
			cell: ({ row }) => (
				<span className={cn('px-2 inline-flex text-xs leading-5 capitalize')}>
					{row.original.type}
				</span>
			),
		},
		{
			accessorKey: 'actions',
			header: 'Acciones',
			cell: ({ row }) => (
				<div className='flex items-center justify-center gap-x-2'>
					<Button
						title='Editar cliente'
						size={'icon'}
						type='button'
						onClick={() => {
							onNavigate(`/clients/${row.getValue('_id')}`);
						}}
					>
						<Pencil size={15} />
					</Button>
					<div>
						<Button
							onClick={() => {
								dispatch({ type: 'UI-DELETE', payload: { id: row.original._id } });
								openModal();
							}}
							title='Eliminar cliente'
							variant={'destructive'}
							size={'icon'}
							type='button'
						>
							<TrashIcon size={15} />
						</Button>
					</div>
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
						<h2 className='text-3xl font-bold tracking-tight'>Clientes</h2>
						<p className='text-sm text-foreground'>
							Lista de los clientes registrados en el sistema.
						</p>
					</div>
					<div className='my-4'>
						<div className='flex w-full items-center justify-between'>
							<Input
								type='search'
								placeholder='Buscar por DNI...'
								value={(table.getColumn('dni')?.getFilterValue() as string) ?? ''}
								onChange={(event) =>
									table.getColumn('dni')?.setFilterValue(event.target.value)
								}
								className='md:w-[100px] lg:w-[300px]'
							/>
							<Link href={'clients/new'} title='Crear cliente'>
								<Button>Nuevo cliente</Button>
							</Link>
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
