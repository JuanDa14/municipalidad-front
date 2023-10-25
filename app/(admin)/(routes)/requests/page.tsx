import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

import { RequestAttachment } from '@/interfaces/request-attachment';

async function getRequest(): Promise<RequestAttachment[]> {
	const resp = await fetch(`${process.env.API_URL}/request-attachment`, { cache: 'no-cache' });
	const data = await resp.json();

	return data;
}

const ServicePage = async () => {
	const requests = await getRequest();

	return <DataTable columns={columns} data={requests} />;
};

export default ServicePage;
