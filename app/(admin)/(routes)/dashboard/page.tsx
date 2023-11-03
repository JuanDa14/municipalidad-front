import { Metadata } from 'next';

import { RecentRequests } from './_components/recent-request';
import { BarGraphic } from './_components/bar-graphic';
import { formatNumberToMonth, formatPrice } from '@/lib/format';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Dashboard de la aplicación',
};

async function getDashboard() {
	const resp = await fetch(`${process.env.API_URL}/dashboard`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
}

export default async function DashboardPage() {
	const data = await getDashboard();

	return (
		<div className='flex-col md:flex'>
			<div className='border-b'>
				<div className='flex h-16 items-center px-4'>
					<h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
				</div>
			</div>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Monto total de recibos</CardTitle>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								className='h-4 w-4 text-muted-foreground'
							>
								<path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
							</svg>
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>
								{formatPrice(data.totalReceiptByCurrentMonth.total)}{' '}
								<span className='text-sm font-normal'>/mes</span>
							</div>
							<p className='text-xs text-muted-foreground'>
								Ultimas ganancias del mes de{' '}
								<span className='lowercase'>
									{formatNumberToMonth(data.totalReceiptByCurrentMonth._id)}
								</span>
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Usuarios</CardTitle>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								className='h-4 w-4 text-muted-foreground'
							>
								<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
								<circle cx='9' cy='7' r='4' />
								<path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
							</svg>
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>+{data.users}</div>
							<p className='text-xs text-muted-foreground'>
								Ultimos usuarios registrados del mes
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Solicitudes</CardTitle>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								className='h-4 w-4 text-muted-foreground'
							>
								<rect width='20' height='14' x='2' y='5' rx='2' />
								<path d='M2 10h20' />
							</svg>
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>+{data.requests}</div>
							<p className='text-xs text-muted-foreground'>
								Ultimas solicitudes realizadas del mes
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Recibos</CardTitle>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								className='h-4 w-4 text-muted-foreground'
							>
								<path d='M22 12h-4l-3 9L9 3l-3 9H2' />
							</svg>
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>+{data.receipts}</div>
							<p className='text-xs text-muted-foreground'>
								Ultimos recibos registrados del mes
							</p>
						</CardContent>
					</Card>
				</div>
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
					<Card className='w-full col-span-1 lg:col-span-4'>
						<CardHeader>
							<CardTitle>Grafico de barras recibos</CardTitle>
						</CardHeader>
						<CardContent className='pl-2'>
							<BarGraphic data={data.charts.receiptsPaymentByMonth} />
						</CardContent>
					</Card>
					<Card className='w-full col-span-1 lg:col-span-3'>
						<CardHeader>
							<CardTitle>Solicitudes recientes</CardTitle>
							<CardDescription>Ultimas 5 solicitudes registradas</CardDescription>
						</CardHeader>
						<CardContent>
							<RecentRequests requests={data.lastRequests} />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
