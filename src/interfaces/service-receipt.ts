import { Client } from '@/interfaces/client';
import { Service } from '@/interfaces/service';

export interface ServiceReceipt {
	_id: string;
	autoIncrement:number
	client: Client;
	service: Service;
	months: string;
	amount: string;
	paymentDate: string;
}
