export type ClientType = 'Jurídico' | 'Natural';

export interface Client {
	_id: string;
	first_name: string;
	last_name: string;
	phone: string;
	direction: string;
	type: ClientType;
	dni: string;
	state: boolean;
}
