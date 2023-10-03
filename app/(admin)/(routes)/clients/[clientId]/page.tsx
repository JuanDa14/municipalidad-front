import { getServerSession } from 'next-auth';

import { options } from '@/lib/auth-options';
import { Client } from '@/interfaces/client';

import { FormClient } from '../_components/form-client';

async function getClient(accessToken: string, clientId: string): Promise<Client> {
	const resp = await fetch(`${process.env.API_URL}/client/${clientId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await resp.json();

	return data.client;
}

const Page = async ({ params }: { params: { clientId: string } }) => {
	const session = await getServerSession(options);
	const client = await getClient(session!.accessToken, params.clientId);

	return <FormClient initialData={client} />;
};

export default Page;
