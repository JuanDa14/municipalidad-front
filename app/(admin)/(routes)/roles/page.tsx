import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Role } from '@/interfaces/role';

async function getRoles(): Promise<Role[]> {
	const resp = await fetch(`${process.env.API_URL}/rol`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
}

async function RolePage() {
	const roles = await getRoles();

	return <DataTable columns={columns} data={roles} />;
}

export default RolePage;
