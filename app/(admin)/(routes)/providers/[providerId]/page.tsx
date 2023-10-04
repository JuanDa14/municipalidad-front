import { getServerSession } from 'next-auth';
import { options } from '@/lib/auth-options';
import { Provider } from '@/interfaces/provider';
import { FormProvider } from '../_components/form-provider';

async function getProvider(accessToken: string, providerId: string): Promise<Provider> {
	const resp = await fetch(`${process.env.API_URL}/provider/${providerId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await resp.json();

	return data.provider;
}

const ProviderIdPage = async ({ params }: { params: { providerId: string } }) => {
	const session = await getServerSession(options);
	const provider = await getProvider(session!.accessToken, params.providerId);

	return (
		<div>
			<FormProvider initialData={provider} />
		</div>
	);
};

export default ProviderIdPage;
