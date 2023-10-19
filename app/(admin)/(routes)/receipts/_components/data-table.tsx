'use client';

import { useState } from 'react';
import Link from 'next/link';

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
import { ServiceReceipt } from '@/interfaces/service-receipt';
import { PlusCircle } from 'lucide-react';

interface DataTableProps {
	data: ServiceReceipt[];
	columns: ColumnDef<ServiceReceipt>[];
}

export function DataTable({ data, columns }: DataTableProps) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);

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
    <div className="p-6">
      <div>
        <div>
          <div className="h-16 px-4 border-b">
            <h2 className="text-3xl font-bold tracking-tight">Recibos</h2>
            <p className="text-sm text-foreground">
              Lista de los recibos registrados.
            </p>
          </div>
          <div className="my-4">
            <div className="flex w-full items-center justify-between">
              <Input
                type="search"
                placeholder="Buscar por DNI/RUC"
                value={
                  (table.getColumn("dni_ruc")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("dni_ruc")?.setFilterValue(event.target.value)
                }
                className="w-[300px] md:w-[400px]"
              />
              <Link href={"/receipts/create"} title="Crear cliente">
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Nuevo Recibo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-md border">
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay datos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 px-5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
