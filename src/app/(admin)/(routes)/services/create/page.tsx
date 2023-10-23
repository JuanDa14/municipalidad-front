import { FormService } from '../_components/form-service';
import { ServiceType } from '@/interfaces/service-type';

const getServiceTypes = async (): Promise<ServiceType[]> => {
	const resp = await fetch(`${process.env.API_URL}/service-type`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
};

const ServiceIdPage = async () => {
	const [serviceTypes] = await Promise.all([getServiceTypes()]);

	return <FormService serviceTypes={serviceTypes} />;
};

export default ServiceIdPage;
