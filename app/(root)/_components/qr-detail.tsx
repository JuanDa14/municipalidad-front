'use client';

import { Separator } from '@/components/ui/separator';
import { ServiceReceipt } from '@/interfaces/service-receipt';
import { ServiceReceiptDetail } from '@/interfaces/service-receipt-detail';
import { formatPrice } from '@/lib/format';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';
import { usePathname } from 'next/navigation';

interface ResponseDetail {
	receipt: ServiceReceipt;
	details: ServiceReceiptDetail[];
}

export const QRDetail = ({ receipt, details }: ResponseDetail) => {
	const pathname = usePathname();

	return (
		<div className='h-full w-full mx-auto overflow-y-auto flex items-center justify-center'>
			<div className='w-full max-w-2xl space-y-5'>
				{pathname?.includes('receipts') ? (
					<div className='w-full space-y-1'>
						<p className='font-bold text-xl capitalize'>Detalle del recibo</p>
						<Separator />
					</div>
				) : (
					<div className='w-full text-center space-y-1'>
						<p className='font-medium text-xl'>MUNICIPALIDAD CENTRO POBLADO</p>
						<p className='font-bold text-3xl'>
							&ldquo;Centro Poblado San Mart&iacute;n de Porres&ldquo;
						</p>
					</div>
				)}
				<div className='flex flex-col gap-y-3'>
					<p className='font-semibold'>
						Ciudadano: <span className='font-normal'>{receipt.client.name}</span>
					</p>
					<p className='font-semibold'>
						DNI/RUC: <span className='font-normal'>{receipt.client.dni_ruc}</span>
					</p>
					<p className='font-semibold'>
						Dirección: <span className='font-normal'>{receipt.client.address}</span>
					</p>
					<p className='font-semibold'>
						Fecha de pago: <span className='font-normal'>{receipt.paymentDate}</span>
					</p>
					<p className='font-semibold'>
						Servicio: <span className='font-normal'>{receipt.service.name}</span>
					</p>
					<p className='font-semibold'>
						Tipo de Servicio:{' '}
						<span className='font-normal'>{receipt.service.type.description}</span>
					</p>
					{Number(receipt.months) !== 0 && (
						<p className='font-semibold'>
							Meses pagados: <span className='font-normal'>{receipt.months}</span>
						</p>
					)}
					<p className='font-semibold'>
						Precio Total:{' '}
						<span className='font-normal'>{formatPrice(Number(receipt.amount))}</span>
					</p>
				</div>
				<div>
					{Number(receipt.months) > 0 && (
						<table className='w-full border-collapse' border={2}>
							<thead>
								<tr className='text-left'>
									<th className='border'>Mes</th>
									<th className='border text-right'>Año</th>
									<th className='border text-right'>Precio Individual</th>
								</tr>
							</thead>
							<tbody className='text-r'>
								{details.map((d, index) => {
									const date = new Date(d.paymentDate);
									const mes = format(date, 'MMMM', { locale: es });
									const year = format(date, 'yyyy');
									return (
										<tr key={index}>
											<td className='border capitalize'>{mes}</td>
											<td className='border text-right'>{year}</td>
											<td className='border text-right '>
												{formatPrice(Number(d.amount))}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					)}
				</div>
				{!pathname?.includes('receipts') && (
					<div>
						<p className='text-xl font-extrabold text-center'>
							Gracias por ser parte de nuestra comunidad!
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
