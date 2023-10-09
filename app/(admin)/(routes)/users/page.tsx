import { Metadata } from 'next';

import { User } from '@/interfaces/user';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

export const metadata: Metadata = {
	title: 'Usuarios',
	description: 'Lista de usuarios registrados en el sistema',
};

async function getUsers(): Promise<User[]> {
	const resp = await fetch(`${process.env.API_URL}/user`, { cache: 'no-cache' });
	const data = await resp.json();

	return data;
}

export default async function Page() {
	const users = await getUsers();

	return <DataTable columns={columns} data={users || []} />;
}
