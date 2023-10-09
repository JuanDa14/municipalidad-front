import { FormRol } from '../_components/form-rol';
import { Role } from '@/interfaces/role';

interface RoleIdPageProps {
	params: {
		roleId: string;
	};
}

async function getRole(id: string): Promise<Role> {
	const resp = await fetch(`${process.env.API_URL}/rol/${id}`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
}

const RoleIdPage = async ({ params }: RoleIdPageProps) => {
	const rol = await getRole(params.roleId);

	return <FormRol initialData={rol} />;
};

export default RoleIdPage;
