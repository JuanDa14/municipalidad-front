import { User } from '@/interfaces/user';
import { DataTable } from './components/data-table';
import { getServerSession } from 'next-auth';
import { options } from '@/lib/auth-options';

async function getUsers(accessToken: string): Promise<User[]> {
	const resp = await fetch(`${process.env.API_URL}/user`, {
		cache: 'no-cache',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await resp.json();

	return data.users;
}

export default async function Page() {
	const session = await getServerSession(options);
	const users = await getUsers(session!.accessToken);

	return (
		<div>
			<DataTable data={users} />
		</div>
	);
}
