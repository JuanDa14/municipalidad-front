import { getServerSession } from 'next-auth';
import { FormRol } from '../_components/form-rol';
import { options } from '@/lib/auth-options';
import { Role } from '@/interfaces/role';

async function getRole(id: string, accessToken: string): Promise<Role> {
	const resp = await fetch(`${process.env.API_URL}/role/${id}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await resp.json();

	return data.role;
}

const RoleIdPage = async ({ params }: { params: { roleId: string } }) => {
	const session = await getServerSession(options);

	const rol = await getRole(params.roleId, session!.accessToken);

	return (
		<div>
			<FormRol initialData={rol} />
		</div>
	);
};

export default RoleIdPage;
