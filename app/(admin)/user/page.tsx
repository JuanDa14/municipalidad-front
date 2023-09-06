import { User } from '@/interfaces/user';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';

async function getUsers(): Promise<User[]> {
	const resp = await fetch(`${process.env.API_URL}/user`, {
		cache: 'no-cache',
	});

	const data = await resp.json();

	return data.users;
}

export default async function Page() {
	const users = await getUsers();

	return (
		<div>
			<DataTable columns={columns} data={users} />
		</div>
	);
}
