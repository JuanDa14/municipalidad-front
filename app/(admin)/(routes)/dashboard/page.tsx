import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { options } from '@/lib/auth-options';
import { User } from '@/interfaces/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CalendarDateRangePicker } from './_components/data-range-picker';
import { Search } from './_components/search';
import { RecentSales } from './_components/recent-sales';
import { BarGraphic } from './_components/bar-graphic';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Example dashboard app built using the components.',
};

async function getUsers(accessToken: string): Promise<User[]> {
	const resp = await fetch(`${process.env.API_URL}/user`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await resp.json();

	return data.users;
}

export default async function DashboardPage() {
	const session = await getServerSession(options);
	const users = await getUsers(session!.accessToken);

	return (
		<div className='flex-col md:flex'>
			<div className='border-b'>
				<div className='flex h-16 items-center px-4'>
					<h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
					<div className='hidden md:flex ml-auto items-center space-x-4'>
						<Search />
					</div>
				</div>
			</div>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<Tabs defaultValue='overview' className='space-y-4'>
					<div className='flex flex-col md:flex-row items-start justify-center md:items-center md:justify-between gap-2'>
						<TabsList>
							<TabsTrigger value='overview'>General</TabsTrigger>
							<TabsTrigger value='analytics' disabled>
								Analisis
							</TabsTrigger>
							<TabsTrigger value='reports' disabled>
								Reportes
							</TabsTrigger>
							<TabsTrigger value='notifications' disabled>
								Notificaciones
							</TabsTrigger>
						</TabsList>
						<div className='flex items-center space-x-2'>
							<CalendarDateRangePicker />
						</div>
					</div>
					<TabsContent value='overview' className='space-y-4'>
						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>Ganancia total</CardTitle>
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
										S/. 1,200.00 <span className='text-sm font-normal'>/mo</span>
									</div>
									<p className='text-xs text-muted-foreground'>
										Ultimas ganancias del mes
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
									<div className='text-2xl font-bold'>{users.length}</div>
									<p className='text-xs text-muted-foreground'>
										Ultimos usuarios registrados del mes
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>Ventas</CardTitle>
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
									<div className='text-2xl font-bold'>+5</div>
									<p className='text-xs text-muted-foreground'>
										Ultimas ventas realizadas del mes
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>Activos</CardTitle>
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
									<div className='text-2xl font-bold'>1</div>
									<p className='text-xs text-muted-foreground'>
										Usuarios activos en la ultima hora
									</p>
								</CardContent>
							</Card>
						</div>
						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
							<Card className='w-full col-span-1 lg:col-span-4'>
								<CardHeader>
									<CardTitle>Grafico de barras</CardTitle>
								</CardHeader>
								<CardContent className='pl-2'>
									<BarGraphic />
								</CardContent>
							</Card>
							<Card className='w-full col-span-1 lg:col-span-3'>
								<CardHeader>
									<CardTitle>Servicios recientes</CardTitle>
									<CardDescription>Ultimos 5 servicios registrados</CardDescription>
								</CardHeader>
								<CardContent>
									<RecentSales />
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
