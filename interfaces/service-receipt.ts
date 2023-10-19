import { Client } from '@/interfaces/client';
import { Service } from '@/interfaces/service';

type DocumentType = 'DNI' | 'RUC';

export interface ServiceReceipt {
	_id: string;
	client: Client;
	service: Service;
	months: string;
	amount: string;
	paymentDate: string;
}
