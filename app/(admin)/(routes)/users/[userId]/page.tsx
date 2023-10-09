import { User } from '@/interfaces/user';
import { Role } from '@/interfaces/role';

import { FormUser } from '../_components/form-user';

interface UserIdPageProps {
	params: {
		userId: string;
	};
}

async function getUser(id: string): Promise<User> {
	const resp = await fetch(`${process.env.API_URL}/user/${id}`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
}

async function getRoles(): Promise<Role[]> {
	const resp = await fetch(`${process.env.API_URL}/rol`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
}

async function Page({ params }: UserIdPageProps) {
	const [user, roles] = await Promise.all([getUser(params.userId), getRoles()]);

	return <FormUser initialData={user} roles={roles} />;
}

export default Page;
