import { Role } from '@/interfaces/role';
import { DataTable } from './components/data-table';
import { getServerSession } from 'next-auth';
import { options } from '@/lib/auth-options';
import { DialogFormRol } from './components/dialog-form-rol';

async function getRoles(accessToken: string): Promise<Role[]> {
	const resp = await fetch(`${process.env.API_URL}/role`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await resp.json();

	return data.roles;
}

async function Page() {
	const session = await getServerSession(options);

	const roles = await getRoles(session!.accessToken);

	return (
		<div>
			<DataTable data={roles} />
			<DialogFormRol />
		</div>
	);
}

export default Page;
