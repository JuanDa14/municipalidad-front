import { Client } from '@/interfaces/client';
import { FormClient } from '../_components/form-client';

interface ClientIdPageProps {
	params: {
		clientId: string;
	};
}

async function getClient(id: string): Promise<Client> {
	const resp = await fetch(`${process.env.API_URL}/client/${id}`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
}

const ClientIdPage = async ({ params }: ClientIdPageProps) => {
	const client = await getClient(params.clientId);

	return <FormClient initialData={client} />;
};

export default ClientIdPage;
