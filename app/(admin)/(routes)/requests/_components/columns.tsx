'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { axios } from '@/lib/axios';
import { ArrowUpDown, ChevronDown, FileIcon, Pencil } from 'lucide-react';
import { format, subDays } from 'date-fns';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { RequestAttachment, RequestAttachmentState } from '@/interfaces/request-attachment';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CellState } from './cell-state';

export const columns: ColumnDef<RequestAttachment>[] = [
	{
		accessorKey: 'applicant',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Solicitante
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.applicant}</span>,
	},
	{
		accessorKey: 'description',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Descripc&iacute;on
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<span className='text-xs capitalize line-clamp-2'>{row.original.description}</span>
		),
	},
	{
		accessorKey: 'eventDate',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Fecha de evento
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<span className='text-xs capitalize'>
				{format(new Date(row.original.eventDate), 'dd/MM/yyyy')}
			</span>
		),
	},
	{
		accessorKey: 'days',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					D&iacute;as restantes
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const days = format(
				new Date(subDays(new Date(row.original.eventDate), new Date().getDate())),
				'd'
			);
			return (
				<span className='text-xs'>
					{new Date(row.original.eventDate).getDate() === new Date().getDate()
						? 'Hoy'
						: `${days} ${days === '1' ? 'día' : 'días'}`}
				</span>
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
		cell: ({ row }) => <CellState row={row} />,
	},
	{
		accessorKey: 'urlPDF',
		header: 'Archivo',
		cell: ({ row }) => (
			<div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
				<a
					href={row.original.urlPDF}
					target='_blank'
					rel='noopener noreferrer'
					className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
				>
					<FileIcon className='h-8 w-8 fill-indigo-200 stroke-indigo-400' />
				</a>
			</div>
		),
	},
	{
		accessorKey: 'actions',
		header: 'Acciones',
		cell: ({ row }) => (
			<div className='flex items-center justify-center gap-x-2'>
				<Link href={`/requests/${row.original._id}`}>
					<Button size={'icon'} type='button'>
						<Pencil className='w-4 h-4' />
					</Button>
				</Link>
			</div>
		),
	},
];
