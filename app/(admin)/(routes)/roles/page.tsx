import { getServerSession } from 'next-auth';
import { options } from '@/lib/auth-options';

import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

import { Role } from '@/interfaces/role';

async function getRoles(accessToken: string): Promise<Role[]> {
	const resp = await fetch(`${process.env.API_URL}/role`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await resp.json();

	return data.roles;
}

async function RolePage() {
	const session = await getServerSession(options);

	const roles = await getRoles(session!.accessToken);

	return <DataTable columns={columns} data={roles} />;
}

export default RolePage;
