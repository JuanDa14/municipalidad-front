"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RequestAttachment } from "@/interfaces/request-attachment";
import { ServiceReceipt } from "@/interfaces/service-receipt";
import { formatNumberToMonth, formatPrice } from "@/lib/format";

interface TableReportProp{
  dataservice?: ServiceReceipt[]
  datarequest?:RequestAttachment[]
  option:number
}

export const TableReport = ({dataservice=[],datarequest=[],option}:TableReportProp) => {  
  return option === 1 ? (
    <Table>
      <TableCaption>Lista de reportes segun el mes y año</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Ciudadano</TableHead>
          <TableHead>Servicio</TableHead>
          <TableHead># meses pagados</TableHead>
          <TableHead>Fecha de Pago</TableHead>
          <TableHead className="text-right">Cantidad</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataservice.map((e) => {
          return (
            <TableRow key={crypto.randomUUID()}>
              <TableCell className="font-medium">{e.client.name}</TableCell>
              <TableCell>{e.service.name}</TableCell>
              <TableCell>{e.months}</TableCell>
              <TableCell>{e.paymentDate}</TableCell>
              <TableCell className="text-right">{e.amount}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  ) : (
    <Table>
      <TableCaption>Lista de solicitudes por mes y año</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Solicitante</TableHead>
          <TableHead>Fecha del evento</TableHead>
          <TableHead>Descripcion</TableHead>
          <TableHead className="text-right">Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datarequest.map((e) => {
          const date = new Date(e.eventDate).toLocaleDateString("es-ES");
          return (
            <TableRow key={crypto.randomUUID()}>
              <TableCell className="font-medium">{e.applicant}</TableCell>
              <TableCell>{date}</TableCell>
              <TableCell>{e.description}</TableCell>
              <TableCell className="text-right">{e.state}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

