import { Metadata } from 'next';
import { ServiceReceipt } from '@/interfaces/service-receipt';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

export const metadata: Metadata = {
	title: 'Recibos',
	description: 'Generación de recibos',
};

async function getServices(): Promise<ServiceReceipt[]> {
	const resp = await fetch(`${process.env.API_URL}/service-receipt`, {
		cache: 'no-cache',
	});
	const data = await resp.json();
	return data;
}

const ReceipPage = async () => {
	const receipts = await getServices();

	return <DataTable columns={columns} data={receipts} />;
};

export default ReceipPage;
