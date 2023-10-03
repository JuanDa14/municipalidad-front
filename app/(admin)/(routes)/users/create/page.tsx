import { getServerSession } from 'next-auth';
import { FormUser } from '../_components/form-user';
import { options } from '@/lib/auth-options';
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

async function Page() {
	const session = await getServerSession(options);

	const roles = await getRoles(session!.accessToken);

	return <FormUser roles={roles} />;
}

export default Page;
