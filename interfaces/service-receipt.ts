import { Client } from '@/interfaces/client';
import { Service } from '@/interfaces/service';

type DocumentType = 'DNI' | 'RUC';

export interface ServiceReceipt {
	_id: string;
	document_type: DocumentType;
	client: Client;
	service: Service;
	months: string;
	amount: string;
	fromDate: string;
	toDate: string;
	dni_ruc: string;
	name: string;
}
