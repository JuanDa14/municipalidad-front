import { User } from '@/interfaces/user';
import { FormUser } from '../components/form-user';
import { options } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { Role } from '@/interfaces/role';

async function getUser(userId: string, accessToken: string): Promise<User> {
	const resp = await fetch(`${process.env.API_URL}/user/${userId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await resp.json();

	return data.user;
}

async function getRoles(accessToken: string): Promise<Role[]> {
	const resp = await fetch(`${process.env.API_URL}/role`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await resp.json();

	return data.roles;
}

async function Page({ params }: { params: { userId: string } }) {
	const session = await getServerSession(options);

	const user = await getUser(params.userId, session!.accessToken);
	const roles = await getRoles(session!.accessToken);

	return <FormUser initialData={user} roles={roles} />;
}

export default Page;
