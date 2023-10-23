import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

import { Provider } from '@/interfaces/provider';

async function getProviders(): Promise<Provider[]> {
	const resp = await fetch(`${process.env.API_URL}/provider`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
}

const ServicePage = async () => {
	const providers = await getProviders();

	return <DataTable columns={columns} data={providers} />;
};

export default ServicePage;
