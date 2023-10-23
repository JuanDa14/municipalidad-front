import { Metadata } from 'next';

import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Service } from '@/interfaces/service';

export const metadata: Metadata = {
	title: 'Servicios',
	description: 'Lista de servicios registrados en el sistema',
};

async function getServices(): Promise<Service[]> {
	const resp = await fetch(`${process.env.API_URL}/service`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
}

export default async function Page() {
	const services = await getServices();

	return <DataTable columns={columns} data={services} />;
}
