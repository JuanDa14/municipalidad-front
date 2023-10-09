import { Role } from '@/interfaces/role';

import { FormUser } from '../_components/form-user';

async function getRoles(): Promise<Role[]> {
	const resp = await fetch(`${process.env.API_URL}/rol`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
}

async function CreateUserPage() {
	const roles = await getRoles();

	return <FormUser roles={roles} />;
}

export default CreateUserPage;
