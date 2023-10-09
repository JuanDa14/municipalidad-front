import { ServiceType } from '@/interfaces/service-type';

export interface Service {
	_id: string;
	name: string;
	description: string;
	price: number;
	state: boolean;
	type: ServiceType;
}
