import { FormProvider } from '../_components/form-provider';
import { Provider } from '@/interfaces/provider';

interface ProviderIdPageProps {
	params: {
		providerId: string;
	};
}

async function getProvider(id: string): Promise<Provider> {
	const resp = await fetch(`${process.env.API_URL}/provider/${id}`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
}

const ProviderIdPage = async ({ params }: ProviderIdPageProps) => {
	const provider = await getProvider(params.providerId);

	return <FormProvider initialData={provider} />;
};

export default ProviderIdPage;
