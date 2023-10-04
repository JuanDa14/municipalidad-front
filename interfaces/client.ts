export type DocumentType = 'DNI' | 'RUC';

export interface Client {
	_id: string;
	name: string;
	email: string;
	phone: string;
	direction: string;
	document_type: DocumentType;
	dni_ruc: string;
	state: boolean;
}
