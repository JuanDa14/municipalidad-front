'use client';

import { ServiceReceipt } from '@/interfaces/service-receipt';
import { ServiceReceiptDetail } from '@/interfaces/service-receipt-detail';
import { formatPrice } from '@/lib/format';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';

interface responseDetail {
	receipt: ServiceReceipt;
	details: ServiceReceiptDetail[];
}

export const QRDetail = ({ receipt, details }: responseDetail) => {
	return (
		<div className='max-w-[900px] mx-auto overflow-hidden pt-10'>
			<div className='w-full text-center px-5 text-xl pb-10'>
				MUNICIPALIDAD CENTRO POBLADO <br />
				<span className='text-black font-bold text-3xl'>
					&ldquo;Centro Poblado San Mart&iacute;n de Porres&ldquo;
				</span>
			</div>
			<div className='px-5'>
				<div className='flex flex-col gap-y-3'>
					<p>
						{' '}
						<span className='font-extrabold'>Ciudadano: </span> {receipt.client.name}
					</p>
					<p>
						{' '}
						<span className='font-extrabold'>DNI/RUC: </span> {receipt.client.dni_ruc}
					</p>
					<p>
						{' '}
						<span className='font-extrabold'>Dirección: </span> {receipt.client.address}
					</p>
					<p>
						{' '}
						<span className='font-extrabold'>Fecha de pago: </span> {receipt.paymentDate}
					</p>
					<p>
						{' '}
						<span className='font-extrabold'>Servicio: </span> {receipt.service.name}
					</p>
					<p>
						{' '}
						<span className='font-extrabold'>Tipo de Servicio: </span>{' '}
						{receipt.service.type.description}
					</p>
					<p>
						{' '}
						<span className='font-extrabold'>Precio Total: </span>
						{formatPrice(Number(receipt.amount))}
					</p>
					{Number(receipt.months) !== 0 && (
						<p>
							{' '}
							<span className='font-extrabold'>Meses pagados: </span> {receipt.months}
						</p>
					)}
				</div>
				{Number(receipt.months) > 0 && (
					<table className='w-full mt-10 border-collapse' border={2}>
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

				<p className='mt-10 text-xl font-extrabold text-center'>
					Gracias por ser parte de nuestra comunidad!
				</p>
			</div>
		</div>
	);
};
