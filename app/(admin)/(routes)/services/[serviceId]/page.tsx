import { Service } from '@/interfaces/service';
import { FormService } from '../_components/form-service';
import { ServiceType } from '@/interfaces/service-type';

interface ServiceIdPageProps {
	params: {
		serviceId: string;
	};
}

async function getService(id: string): Promise<Service> {
	const resp = await fetch(`${process.env.API_URL}/service/${id}`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
}

const getServiceTypes = async (): Promise<ServiceType[]> => {
	const resp = await fetch(`${process.env.API_URL}/service-type`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
};

const ServiceIdPage = async ({ params }: ServiceIdPageProps) => {
	const [service, serviceTypes] = await Promise.all([
		getService(params.serviceId),
		getServiceTypes(),
	]);

	return <FormService initialData={service} serviceTypes={serviceTypes} />;
};

export default ServiceIdPage;
