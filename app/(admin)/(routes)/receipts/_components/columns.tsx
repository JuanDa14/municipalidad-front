"use client";

import Link from "next/link";
import { ArrowUpDown, Pencil, Printer } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ServiceReceipt } from "@/interfaces/service-receipt";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<ServiceReceipt>[] = [
  {
    accessorKey: "dni_ruc",
    header: "DNI/RUC",
    cell: ({ row }) => (
      <span className="text-xs capitalize">{row.original.client.dni_ruc}</span>
    ),
  },
  {
    accessorKey: "service",
    header: "Servicio",
    cell: ({ row }) => (
      <span className="text-xs capitalize">{row.original.service.name}</span>
    ),
  },
  {
    accessorKey: "date",
    header: "Meses pagados",
    cell: ({ row }) => (
      <span className="text-xs capitalize">
        {row.original.fromDate} - {row.original.toDate}
      </span>
    ),
  },
  {
    accessorKey: "servicetype",
    header: "Tipo de Servicio",
    cell: ({ row }) => (
      <span className="text-xs capitalize">
        {row.original.service.type.description}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Pago S/.",
    cell: ({ row }) => (
      <span className="text-xs capitalize">{row.original.amount}</span>
    ),
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-x-2">
        <Link href={`/receipt/print/${row.original._id}`}>
          <Button size={"icon"} type="button">
            <Printer className="w-4 h-4 " />
          </Button>
        </Link>
      </div>
    ),
  },
];