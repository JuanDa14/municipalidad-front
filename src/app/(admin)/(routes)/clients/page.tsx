import { Metadata } from 'next';

import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Client } from '@/interfaces/client';

export const metadata: Metadata = {
	title: 'Clientes',
	description: 'Lista de clientes',
};

async function getClients(): Promise<Client[]> {
	const resp = await fetch(`${process.env.API_URL}/client`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
}

const ClientPage = async () => {
	const clients = await getClients();

	return <DataTable columns={columns} data={clients || []} />;
};

export default ClientPage;
