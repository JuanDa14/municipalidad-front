import { Provider } from '@/interfaces/provider';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { getServerSession } from 'next-auth';
import { options } from '@/lib/auth-options';

async function getProviders(accessToken: string): Promise<Provider[]> {
	const resp = await fetch(`${process.env.API_URL}/provider`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await resp.json();

	return data.providers;
}

const ServicePage = async () => {
	const session = await getServerSession(options);
	const providers = await getProviders(session!.accessToken);

	return <DataTable columns={columns} data={providers} />;
};
export default ServicePage;
