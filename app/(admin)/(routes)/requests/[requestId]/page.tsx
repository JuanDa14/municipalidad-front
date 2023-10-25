import { RequestAttachment } from '@/interfaces/request-attachment';
import { FormRequest } from '../_components/form-request';

interface RequqestIdPageProps {
	params: {
		requestId: string;
	};
}

async function getProvider(id: string): Promise<RequestAttachment> {
	const resp = await fetch(`${process.env.API_URL}/request-attachment/${id}`, {
		cache: 'no-cache',
	});
	const data = await resp.json();
	return data;
}

const RequestIdPage = async ({ params }: RequqestIdPageProps) => {
	const request = await getProvider(params.requestId);

	return <FormRequest initialData={request} />;
};

export default RequestIdPage;
