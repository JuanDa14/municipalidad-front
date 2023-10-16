import { FormReceipt } from '../_components/form-receipt';
import { Service } from '@/interfaces/service';

async function getServices(): Promise<Service[]> {
	const resp = await fetch(`${process.env.API_URL}/service`, { cache: 'no-cache' });
	const data = await resp.json();
	console.log(data);
	
	return data;
}

const ReceipPage = async () => {
	const services = await getServices();
	return <FormReceipt services={services} />;
};

export default ReceipPage;
