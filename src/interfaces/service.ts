import { ServiceType } from '@/interfaces/service-type';

export interface Service {
	_id: string;
	name: string;
	state: boolean;
	type: ServiceType;
}
